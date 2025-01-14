import React, { useState, useEffect } from "react";

interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
  start_date: string;
  end_date: string;
  image: File | string | null;
}

interface TourFormEditProps {
  onSubmit: (tour: Tour) => void;
  initialData: Tour;
}

const TourFormEdit: React.FC<TourFormEditProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Tour>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [updateImage, setUpdateImage] = useState<boolean>(false);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "name") {
      if (value.trim().match(/[!@#$%^&*(),.?":{}|<>\-_=+]/)) {
        setError('Tên Tour không hợp lệ. Vui lòng nhập tên Tour không có kí tự đặc biệt.');
      } else {
        setError(null);
      }
      setFormData({ ...formData, [name]: value });
    } else if (name === "description") {
      if (value.trim().length > 255) {
        setError('Mô tả không được dài hơn 255 kí tự.');
      } else {
        setError(null);
      }
      setFormData({ ...formData, [name]: value });
    } else if (name === "price") {
      if (isNaN(Number(value.replace(/\./g, ""))) || Number(value.replace(/\./g, "")) > 1000000000) {
        setError('Giá phải nằm trong khoảng 1-1.000.000.000 VND.');
      } else {
        setError(null);
      }
      setFormData({ ...formData, [name]: Number(value.replace(/\./g, "")) });
    } else if (name === "start_date") {
      const startDate = new Date(value);
      if (startDate.valueOf() < new Date().setDate(new Date().getDate() - 7).valueOf()) {
        setError('Ngày bắt đầu phải sau ngày hôm nay 1 tuần.');
      } else {
        setError(null);
      }
      setFormData({ ...formData, [name]: value });
    } else if (name === "end_date") {
      const endDate = new Date(value);
      if (endDate.valueOf() < new Date(formData.start_date).valueOf()) {
        setError('Ngày kết thúc phải sau ngày bắt đầu  .');
      } else {
        setError(null);
      }
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0].size > 2048 * 1024) {
        setError('Hình ảnh không được lớn hơn 2MB.');
      } else {
        setError(null);
      }
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(formData.start_date) > new Date(formData.end_date)) {
      setError('Ngày bắt đầu không được lớn hơn ngày kết thúc.');
    } else if (formData.price <= 0) {
      setError('Giá phải lớn hơn 0.');
    } else {
      setError(null);
      onSubmit(formData);
      setTimeout(() => {
      }, 2000);
    }
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Chỉnh Sửa Tour</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tên Tour"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="price"
              value={formData.price.toString()}
              onChange={handleChange}
              placeholder="Giá"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Mô tả"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={updateImage}
              onChange={() => setUpdateImage(!updateImage)}
              className="mr-2"
            />
            <label>Chỉnh sửa hình ảnh</label>
          </div>
          {updateImage && (
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cập Nhật Tour
          </button>
        </form>
      </div>
    </div>
  );
};

export default TourFormEdit;

