import Image from 'next/image';
import React from 'react'
import { FaHeart } from 'react-icons/fa';

type Props = {
    hotel: {
        id: number;
        image: string;
        name: string;
        location: string;
        rating: number;
        reviews: string;
        price: string;
    }
};

const HotelCard = ({hotel}: Props) => {
  return (
    <div>
        <div className="relative h-[300px] w-full rounded-lg cursor-pointer group overflow-hidden">
            <div className="absolute top-4 right-4 z-20 w-8 h-8 bg-white rounded-full text-black flex 
            items-center justify-center flex-col">
                <FaHeart className="w-3 h-3"/>
            </div>      
            <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
            <Image 
            src={hotel.image}
            alt={hotel.name}
            width={500}
            height={500}
            className="overflow-hidden h-full w-full transition-all 
            duration-300 object-cover group-hover:scale-110"
            />
        </div>

        <div>
            <h1 className="mt-4 text-lg font-semibold text-blue-950 hover:text-black cursor-pointer transition-all 
            duration-200">
                {hotel.name}
            </h1>
            <p className="text-sm text-gray-600 font-medium mt-4 mb-6">
                {hotel.location}
            </p>

            <div className="flex items-center space-x-2">
                <div className="px-2 py-2 bg-blue-800 rounded-md font-bold text-white text-xs">
                    {hotel.rating}
                </div>
                <p className="text-sm text-gray-800">Đánh giá</p>
                <p className="tex-sm font-bold text-gray-800">{hotel.reviews}</p>
            </div>

            <p className="mt-3 text-gray-700 font-medium">
                Bắt đầu từ <span className="text-blue-600 font-bold">{hotel.price} VND</span>
            </p>
        </div>
    </div>
  )
}

export default HotelCard