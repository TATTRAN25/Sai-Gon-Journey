import React from 'react';
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
}

const TourList: React.FC<TourListProps> = ({ tours }) => {
  const getImageSrc = (image?: string | File) => {
    if (!image) return '/images/NoImageAvailable.png';
    if (typeof image === 'string') {
      if (image.startsWith('http')) return image;
      return `http://localhost:8000/storage/tours/${image.replace(/^\/+/, '')}`;
    }
    return URL.createObjectURL(image);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
      <div key={tour.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <Image
        src={getImageSrc(tour.image)}
        alt={tour.name}
        width={200}
        height={200}
        className="w-48 h-48 object-cover rounded-lg mb-4"
        priority={getImageSrc(tour.image) === '/images/NoImageAvailable.png'}
        />
        <h3 className="text-xl font-bold mb-2 text-center">{tour.name}</h3>
        <p className="text-gray-700 mb-4 text-center">Mô Tả: {tour.description}</p>
        <p className="text-gray-700 mb-4 text-center">Giá: {tour.price} $</p>
        <p className="text-gray-700 mb-4 text-center">
        Ngày bắt đầu: {new Date(tour.start_date).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-4 text-center">
        Ngày kết thúc: {new Date(tour.end_date).toLocaleDateString()}
        </p>
        <a href={`/tour/${tour.id}`} className="text-blue-500 hover:underline mt-4">Xem chi tiết</a>
      </div>
      ))}
    </div>
  );
};

export default TourList;