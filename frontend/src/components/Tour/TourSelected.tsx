import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Image from 'next/image';

interface TourSelectedProps {
    tours: {
        id: number;
        name: string;
        description: string;
        price: number;
        start_date: string;
        end_date: string;
        image: File | string | null;
    }[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const TourSelected: React.FC<TourSelectedProps> = ({ tours, onEdit, onDelete }) => {
    const getImageSrc = (image: string | File | null) => {
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

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 mt-10 text-center">Danh sách tour</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour) => (
                    <div key={tour.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <Image
                            loader={customLoader}
                            src={getImageSrc(tour.image)}
                            alt={tour.name}
                            width={256}
                            height={256}
                            unoptimized
                            className="w-64 h-64 object-cover"
                        />
                        <h2 className="text-xl font-bold mt-4">{tour.name}</h2>
                        <p className="text-gray-600">{tour.description}</p>
                        <p className="text-gray-800 font-semibold">{formatPrice(tour.price)} VND</p>
                        <div className="flex space-x-4 mt-4">
                            <button onClick={() => onEdit(tour.id)} className="flex items-center text-blue-500">
                                <FaEdit className="mr-1" /> Edit
                            </button>
                            <button onClick={() => onDelete(tour.id)} className="flex items-center text-red-500">
                                <FaTrash className="mr-1" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TourSelected;