import React, { useEffect, useState } from "react";
import Image from 'next/image';

interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
  start_date: string;
  end_date: string;
  image: string | File | null;
}

interface TourDetailProps {
  params: Promise<{ id: string | string[] }>;
}

const TourDetail: React.FC<TourDetailProps> = ({ params: paramsPromise }) => {
  const { id } = React.use(paramsPromise) as { id: string | string[] };
  const [tour, setTour] = useState<Tour | null>(null);
  const [latestTours, setLatestTours] = useState<Tour[]>([]);

  useEffect(() => {
    if (id) {
      const fetchTour = async () => {
        const response = await fetch(`http://localhost:8000/api/v1/tours/${id}`);
        const tour = await response.json();
        setTour(tour);
      };

      fetchTour();
    }

    const fetchLatestTours = async () => {
      const response = await fetch(`http://localhost:8000/api/v1/tours?limit=3`);
      const tours = await response.json();
      setLatestTours(tours);
    };

    fetchLatestTours();
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
            className="h-80 w-80 object-cover mb-6 mx-auto"
            loader={({ src }) => src}
            width={320}
            height={320}
            unoptimized
            priority
          />
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <p className="text-gray-700 font-semibold">Giá</p>
              <p className="text-gray-900 text-xl">${tour.price}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-700 font-semibold">Mô tả</p>
              <p className="text-gray-900 text-xl">{tour.description}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-700 font-semibold">Ngày bắt đầu</p>
              <p className="text-gray-900">{new Date(tour.start_date).toLocaleDateString()}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-700 font-semibold">Ngày kết thúc</p>
              <p className="text-gray-900">{new Date(tour.end_date).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handleBooking}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
              Book Tour
            </button>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300">
              Quay lại
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Các Tour Mới Nhất</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {latestTours
            .filter((latestTour) => latestTour.id !== tour.id)
            .slice(0, 3)
            .map((latestTour) => (
              <a key={latestTour.id} href={`/client/Tour/${latestTour.id}`} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={getImageSrc(latestTour.image)}
                    alt={latestTour.name}
                    className="rounded-t-lg"
                    unoptimized
                    loader={({ src }) => src}
                    priority
                    fill
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{latestTour.name}</h3>
                  <p className="text-gray-600 mb-2">Mô tả:{latestTour.description}</p>
                  <p className="text-gray-800 font-semibold">Giá: {latestTour.price}$</p>
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TourDetail;

