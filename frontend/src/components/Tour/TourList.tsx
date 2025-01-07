// components/Tour/TourList.tsx
import React from 'react';
import TourCard from './TourCard';

interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface TourListProps {
  tours: Tour[];
}

const TourList: React.FC<TourListProps> = ({ tours }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour.id} {...tour} />
        ))}
      </div>
    </div>
  );
};

export default TourList;