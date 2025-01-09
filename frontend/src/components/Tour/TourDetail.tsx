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
  tourId: string | string[];
}

const TourDetail: React.FC<TourDetailProps> = ({ tourId }) => {
  const [tour, setTour] = useState<Tour | null>(null);

  useEffect(() => {
    if (tourId) {
      const fetchTour = async () => {
        const response = await fetch(`http://localhost:8000/api/v1/tours/${tourId}`);
        const tour = await response.json();
        setTour(tour);
      };

      fetchTour();
    }
  }, [tourId]);

  if (!tour) {
    return <div>Loading...</div>;
  }

  const getImageSrc = (image?: string | File | null) => {
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

  const handleBooking = () => {
    // Logic for booking the tour
    alert("Tour booked successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{tour.name}</h1>
      <Image
        loader={customLoader}
        src={getImageSrc(tour.image)}
        alt={tour.name}
        width={600}
        height={400}
        unoptimized
        className="w-full h-auto object-cover mb-4"
      />
      <p className="text-gray-700 mb-4">{tour.description}</p>
      <p className="text-gray-800 font-semibold mb-4">Price: ${tour.price}</p>
      <p className="text-gray-600 mb-4">Start Date: {tour.start_date}</p>
      <p className="text-gray-600 mb-4">End Date: {tour.end_date}</p>
      <button
        onClick={handleBooking}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Book Tour
      </button>
    </div>
  );
};

export default TourDetail;
