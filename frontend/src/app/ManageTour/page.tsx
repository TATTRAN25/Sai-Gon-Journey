"use client";
import React from 'react';
import TourForm from '../../components/Tour/TourForm';
import TourList from '../../components/Tour/TourList';

interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
  start_date: string;
  end_date: string;
  image?: File | string;
}

const ManageTourPage = () => {
  const [tours, setTours] = React.useState<Tour[]>([]);

  React.useEffect(() => {
    const fetchTours = async () => {
      // Fetch danh sách tour từ API
      const response = await fetch('http://localhost:8000/api/v1/tours');
      const tours = await response.json();
      setTours(tours);
    };

    fetchTours();
  }, []);

  const handleAddTour = async (newTour: Tour) => {
      // Gửi yêu cầu thêm tour đến API
      const formData = new FormData();
      formData.append('name', newTour.name);
      formData.append('description', newTour.description);
      formData.append('price', newTour.price.toString());
      formData.append('start_date', newTour.start_date);
      formData.append('end_date', newTour.end_date);
      if (newTour.image) {
        formData.append('image', newTour.image);
      }
  
      const response = await fetch('http://localhost:8000/api/v1/tours', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Tour added:', data);
      setTours([...tours, data]);
    };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 ">
        {/* Căn lề 16px so với top của màn hình */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Thêm mới tour */}
          <TourForm
            onSubmit={(tour) => {
              const newTour: Tour = {
              ...tour,
              id: tours.length + 1,
              name: tour.name,
              description: tour.description,
              price: tour.price,
              start_date: tour.start_date,
              end_date: tour.end_date,
              image: tour.image ?? undefined,
              };
              handleAddTour(newTour);
            }}
          />
          {/* Danh sách tour */}
          <TourList tours={tours} />
        </div>
      </div>
    </div>
  );
};

export default ManageTourPage;