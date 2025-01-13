import React, { useEffect, useState } from "react";
import Image from 'next/image';

interface Tour {
  name: string;
  description: string;
  price: number;
  start_date: string;
  end_date: string;
  image: string | File | null;
}

interface TourDetailProps {
  params: {
    id: string | string[];
  }
}

const TourDetail: React.FC<TourDetailProps> = ({ params }) => {
  const { id } = params as { id: string | string[] };
  const [tour, setTour] = useState<Tour | null>(null);

  useEffect(() => {
    if (id) {
      const fetchTour = async () => {
        const response = await fetch(`http://localhost:8000/api/v1/tours/${id}`);
        const tour = await response.json();
        setTour(tour);
      };

      fetchTour();
    }
  }, [id]);

  if (!tour) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const getImageSrc = (image?: string | File | null) => {
    if (!image) return '/images/NoImageAvailable.png';
    if (typeof image === 'string') {
      if (image.startsWith('http')) return image;
      return `http://localhost:8000/storage/${image}`;
    }
    return URL.createObjectURL(image);
  };

  const handleBooking = () => {
    alert("Tour booked successfully!");
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="pt-12 p-6">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">{tour.name}</h1>
          <Image
            src={getImageSrc(tour.image)}
            alt={tour.name}
            className="w-full h-auto object-cover mb-6"
            loader={({ src }) => src}
            width={200}
            height={200}
            objectFit="contain"
          />
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-700 font-semibold">Giá</p>
              <p className="text-gray-900 text-xl">${tour.price}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Mô tả</p>
              <p className="text-gray-900 text-xl">{tour.description}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Ngày bắt đầu</p>
              <p className="text-gray-900">{new Date(tour.start_date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Ngày kết thúc</p>
              <p className="text-gray-900">{new Date(tour.end_date).toLocaleDateString()}</p>
            </div>
          </div>
          <button
            onClick={handleBooking}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Book Tour
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
