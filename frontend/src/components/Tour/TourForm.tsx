import React, { useState } from "react";

interface Tour {
  name: string;
  description: string;
  price: number;
  start_date: string;
  end_date: string;
  image: File | null;
}

interface TourFormProps {
  onSubmit: (tour: Tour) => void;
  initialData?: {
    id: number;
    name: string;
    description: string;
    price: number;
    start_date: string;
    end_date: string;
    image: File | null;
  }; 
}

const TourForm: React.FC<TourFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Tour>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    start_date: initialData?.start_date || "",
    end_date: initialData?.end_date || "",
    image: initialData?.image || null,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name" && value.trim().match(/[0-9!@#$%^&*(),.?":{}|<>\-_=+]/)) {
      setError('Tên Tour không hợp lệ. Vui lòng nhập tên Tour không có kí tự đặc biệt và số.');
    } else if (name === "description" && value.trim().length > 255) {
      setError('Mô tả không được dài hơn 255 kí tự.');
    } else if (name === "price") {
      if (value.trim().match(/[a-zA-Z]/)) {
        setError('Giá không được chứa chữ.');
      } else {
        const numericValue = value.replace(/\./g, "");
        if (isNaN(Number(numericValue)) || Number(numericValue) > 1000000000) {
          setError('Giá phải nằm trong khoảng 1-1.000.000.000 VND.');
        } else {
          setError(null);
        }
      }
    } else if (name === "start_date") {
      const startDate = new Date(value);
      if (startDate.valueOf() < new Date().setDate(new Date().getDate() - 7).valueOf()) {
        setError('Ngày bắt đầu phải sau ngày hôm nay 1 tuần.');
      } else {
        setError(null);
      }
    } else if (name === "end_date") {
      const endDate = new Date(value);
      if (endDate.valueOf() < new Date(formData.start_date).valueOf()) {
        setError('Ngày kết thúc phải sau ngày bắt đầu.');
      } else {
        setError(null);
      }
    } else {
      setError(null);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.image && formData.image.size > 2048 * 1024) {
      setError('Hình ảnh không được để lớn hơn 2MB.');
      return;
    }
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (formData.image && !allowedMimeTypes.includes(formData.image.type)) {
      setError('Hình ảnh không hợp lệ. Vui lòng nhập hình ảnh có định dạng .jpeg, .png, .jpg, .gif.');
      return;
    }
    setError(null);
    setSuccess('Thêm Tour thành công');
    onSubmit(formData);
    setTimeout(() => {
      setSuccess(null);
      setFormData({
        name: "",
        description: "",
        price: 0,
        start_date: "",
        end_date: "",
        image: null,
      });
    }, 2000);
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Thêm Tour Mới</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
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
              value={formData.price}
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
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Thêm Tour
          </button>
        </form>
      </div>
    </div>
  );
};

export default TourForm;