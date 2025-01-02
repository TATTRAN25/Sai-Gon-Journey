import SectionHeading from '@/components/Helper/SectionHeading'
import { hotelsData } from '@/data/data'
import React from 'react'
import HotelCard from './HotelCard'

const Hotel = () => {
  return (
    <div className="pt-20 pb-20">
        <SectionHeading heading="Đề xuất khách sạn"/>
        <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 
        gap-8 items-center mt-16">
            {hotelsData.map((data) => {
                return (
                <div key={data.id} >
                    <HotelCard hotel={data}/>
                </div>
                );
            })}
        </div>
    </div>
  )
}

export default Hotel