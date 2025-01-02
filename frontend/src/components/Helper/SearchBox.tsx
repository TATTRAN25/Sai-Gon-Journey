/*************  ✨ Codeium Command 🌟  *************/
import React from 'react'
import { FaCalendarWeek, FaMap } from 'react-icons/fa'
import { FaUserGroup } from 'react-icons/fa6'

const SearchBox = () => {
  return (
    <div className="bg-white rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 
    items-center justify-center gap-8 mt-4 sm:mt-12 w-[95%] sm:w-[80%]">

        <div className="flex items-center space-x-6">
            <FaMap className="w-6 h-6 text-blue-600"/>
            <div>
                <p className="text-lg font-medium mb-[0.2rem] text-black">Địa điểm</p>
                <p className="text-lg font-medium mb-[0.2rem]">Địa điểm</p>
                <input 
                type="text" 
                placeholder="Bạn muốn đi đâu" 
                className="outline-none border-none placeholder:text-gray-800"/>
            </div>
        </div>

        <div className="flex items-center space-x-6">
            <FaCalendarWeek className="w-6 h-6 text-blue-600"/>
            <div>
                <p className="text-lg font-medium mb-[0.2rem] text-black">Ngày bắt đầu</p>
                <p className="text-lg font-medium mb-[0.2rem]">Ngày bắt đầu</p>
                <input type="date" className="outline-none border-none" />
            </div>
        </div>

        <div className="flex items-center space-x-6">
            <FaCalendarWeek className="w-6 h-6 text-blue-600"/>
            <div>
                <p className="text-lg font-medium mb-[0.2rem] text-black">Ngày kết thúc</p>
                <p className="text-lg font-medium mb-[0.2rem]">Ngày kết thúc</p>
                <input type="date" className="outline-none border-none" />
            </div>
        </div>

        <div className="flex items-center space-x-6">
            <FaUserGroup className="w-6 h-6 text-blue-600"/>
            <div>
                <p className="text-lg font-medium mb-[0.2rem] text-black">Khách</p>
                <p className="text-base font-normal text-black">1 người 1 phòng</p>
                <p className="text-lg font-medium mb-[0.2rem]">Khách</p>
                <p className="text-base font-normal">1 người 1 phòng</p>
            </div>
        </div>
    </div>
  )
}

export default SearchBox

/******  525a4fe6-47f5-4564-a0e6-a23f63a22f9b  *******/