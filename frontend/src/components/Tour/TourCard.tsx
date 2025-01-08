import React from "react";
import Link from "next/link";
import Image from "next/image";

interface TourCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  start_date: string;
  end_date: string;
  image?: string | File;
}

const TourCard: React.FC<TourCardProps> = ({
  id,
  name,
  description,
  price,
  image,
}) => {
  const imageUrl = typeof image === "string" ? image : image ? URL.createObjectURL(image) : "/images/NoImageAvailable.png";

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48 flex justify-center items-center">
        <div className="w-200 h-200 relative">
          <Image
            src={imageUrl}
            alt={`Hình ảnh của tour ${name}`}
            width={200}
            height={200}
          />
        </div>
      </div>
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
