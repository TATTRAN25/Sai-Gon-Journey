'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

// Định nghĩa kiểu dữ liệu cho Tour
interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
  start_date: string;
  end_date: string;
  image?: string;
}

const ToursPage: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await axios.get<Tour[]>('https://laravel-tour-api.herokuapp.com/api/tours');
      setTours(response.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  const filteredTours = tours.filter(tour =>
    tour.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Danh sách Tour</h1>
      <input
        type="text"
        placeholder="Tìm kiếm tour..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredTours.map(tour => (
          <li key={tour.id}>
            <Link href={`/tours/${tour.id}`}>
              <a>{tour.name}</a>
            </Link>
            <p>{tour.description}</p>
            <p>Giá: {tour.price} VND</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToursPage;