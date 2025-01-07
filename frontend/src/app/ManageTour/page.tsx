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
  image?: string;
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
    const response = await fetch('http://localhost:8000/api/v1/tours', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTour),
    });
    const data = await response.json();
    console.log('Tour added:', data);
    setTours([...tours, data]); // Cập nhật danh sách tour sau khi thêm thành công
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 ">
        {/* Căn lề 16px so với top của màn hình */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Thêm mới tour */}
          <TourForm
            onSubmit={(tour) =>
              handleAddTour({
                ...tour,
                id: tours.length + 1, // Tạm thởi tạo ID mới (nên để backend tự tạo ID)
              })
            }
          />
          {/* Danh sách tour */}
          <TourList tours={tours} />
        </div>
      </div>
    </div>
  );
};

export default ManageTourPage;