import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

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

const TourDetail: React.FC = () => {
  const [tour, setTour] = useState<Tour | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchTour();
    }
  }, [id]);

  const fetchTour = async () => {
    try {
      const response = await axios.get<Tour>(`https://laravel-tour-api.herokuapp.com/api/tours/${id}`);
      setTour(response.data);
    } catch (error) {
      console.error('Error fetching tour:', error);
    }
  };

  if (!tour) return <p>Loading...</p>;

  return (
    <div>
      <h1>{tour.name}</h1>
      <p>{tour.description}</p>
      <p>Giá: {tour.price} VND</p>
      <p>Ngày bắt đầu: {tour.start_date}</p>
      <p>Ngày kết thúc: {tour.end_date}</p>
    </div>
  );
};

export default TourDetail;