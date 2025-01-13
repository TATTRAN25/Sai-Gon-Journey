import Image from 'next/image';

interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
  start_date: string;
  end_date: string;
  image?: string | File;
}

interface TourListProps {
  tours: Tour[];
  onTourClick: (id: number) => void;
}

const TourList: React.FC<TourListProps> = ({ tours, onTourClick }) => {
  const getImageSrc = (image?: string | File) => {
    if (!image) return '/images/NoImageAvailable.png';
    if (typeof image === 'string') {
      if (image.startsWith('http')) return image;
      return `http://localhost:8000/storage/${image}`;
    }
    return URL.createObjectURL(image);
  };

  const customLoader = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 mt-10 text-center">Danh sách tour</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
      <div key={tour.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center" onClick={() => onTourClick(tour.id)}>
      <Image
        loader={customLoader}
        src={getImageSrc(tour.image)}
        alt={tour.name}
        width={256}
        height={256}
        unoptimized
        className="w-64 h-64 object-cover"
        priority
      />
      <h2 className="text-xl font-bold mt-4">{tour.name}</h2>
      <p className="text-gray-600">Ngày bắt đầu: {new Date(tour.start_date).toLocaleDateString('vi-VN')}</p>
      <p className="text-gray-600">Ngày kết thúc: {new Date(tour.end_date).toLocaleDateString('vi-VN')}</p>
      <p className="text-gray-800 font-semibold">Giá vé:{tour.price}$</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4" onClick={() => onTourClick(tour.id)}>Đặt vé ngay</button>
      </div>
      ))}
      </div>
    </div>
  );
};

export default TourList;