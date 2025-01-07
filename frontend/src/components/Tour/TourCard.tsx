// components/Tour/TourCard.tsx
import React from 'react';
import Link from 'next/link';

interface TourCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

const TourCard: React.FC<TourCardProps> = ({ id, name, description, price, image }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={image || 'https://via.placeholder.com/300'}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-lg font-semibold">${price}</p>
        <Link href={`/Tour/${id}`} className="text-blue-500 hover:underline">
          Xem Chi Tiết
        </Link>
      </div>
    </div>
  );
};

export default TourCard;