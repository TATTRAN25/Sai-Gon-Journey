"use client";
import React from 'react';
import TourForm from '../../../components/Tour/TourForm';
import TourFormEdit from '../../../components/Tour/TourFormEdit';
import TourSelected from '@/components/Tour/TourSelected';
import Modal from '@/components/Tour/Modal';

interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
  start_date: string;
  end_date: string;
  image: File | string | null;
}

const ManageTourPage = () => {
  const [tours, setTours] = React.useState<Tour[]>([]);
  const [selectedTour, setSelectedTour] = React.useState<Tour | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/tours');
        if (!response.ok) {
          throw new Error('Error fetching tours');
        }
        const tours = await response.json();
        setTours(tours);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setError('Có lỗi xảy ra khi tải danh sách tour.');
      }
    };

    fetchTours();
  }, []);

  const handleAddTour = async (newTour: Tour) => {
    const formData = new FormData();
    formData.append('name', newTour.name);
    formData.append('description', newTour.description);
    formData.append('price', newTour.price.toString());
    formData.append('start_date', newTour.start_date);
    formData.append('end_date', newTour.end_date);
    if (newTour.image) {
      formData.append('image', newTour.image);
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/v1/tours', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Error adding tour');
      }
      const data = await response.json();
      setTours([...tours, data]);
    } catch (error) {
      console.error('Error adding tour:', error);
      setError('Có lỗi xảy ra khi thêm tour.');
    }
  };

  const handleEditTour = async (updatedTour: Tour) => {
    const formData = new FormData();
    formData.append('name', updatedTour.name);
    formData.append('description', updatedTour.description);
    formData.append('price', updatedTour.price.toString());
    formData.append('start_date', updatedTour.start_date);
    formData.append('end_date', updatedTour.end_date);
    if (updatedTour.image && typeof updatedTour.image !== 'string') {
      formData.append('image', updatedTour.image);
    }

    try {
      const response = await fetch(`http://localhost:8000/api/v1/tours/${updatedTour.id}`, {
        method: 'POST', // Change method to POST
        headers: {
          'X-HTTP-Method-Override': 'PUT', // Override method to PUT
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Error updating tour');
      }
      const data = await response.json();
      console.log(data);
      setTours(tours.map(tour => tour.id === data.id ? data : tour));
      setSelectedTour(null); // Close the modal
    } catch (error) {
      console.error('Error updating tour:', error);
      setError('Có lỗi xảy ra khi cập nhật tour.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 ">
        {/* Căn lề 16px so với top của màn hình */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {error && <p className="text-red-500 mb-4">{error}</p>}
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
              image: tour.image ?? null,
              };
              handleAddTour(newTour);
            }}
          />
          {/* Danh sách tour */}
          <TourSelected 
            tours={tours} 
            onEdit={(tourId) => {
              const tourToEdit = tours.find(tour => tour.id === tourId);
              if (tourToEdit) {
                setSelectedTour(tourToEdit);
              }
            }} 
            onDelete={async (tourId) => {
              const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa tour này không?');
              if (!confirmDelete) {
                return;
              }
              try {
                const response = await fetch(`http://localhost:8000/api/v1/tours/${tourId}`, {
                  method: 'DELETE',
                });
                if (!response.ok) {
                  throw new Error('Error deleting tour');
                }
                setTours(tours.filter(tour => tour.id !== tourId));
              } catch (error) {
                console.error('Error deleting tour:', error);
                setError('Có lỗi xảy ra khi xóa tour.');
              }
            }} 
          />
        </div>
      </div>
      {selectedTour && (
        <Modal onClose={() => setSelectedTour(null)}>
          <TourFormEdit
            onSubmit={(tour) => {
              handleEditTour({ 
                ...selectedTour, 
                ...tour, 
                image: typeof tour.image === 'string' ? selectedTour.image : tour.image 
              });
            }}
            initialData={selectedTour}
          />
        </Modal>
      )}
    </div>
  );
};

export default ManageTourPage;