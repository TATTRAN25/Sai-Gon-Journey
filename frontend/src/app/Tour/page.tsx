// app/Tour/page.tsx
"use client";
import React from 'react';
import TourList from '../../components/Tour/TourList';

import { useEffect, useState } from 'react';

const TourPage = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      const response = await fetch('http://localhost:8000/api/v1/tours');
      const tours = await response.json();
      setTours(tours);
    };

    fetchTours();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-center h-[calc(50vh-100px)]">
        <h1 className="text-3xl font-bold">Danh Sách Tour</h1>
      </div>
      <TourList tours={tours} />
    </div>
  );
};

export default TourPage;