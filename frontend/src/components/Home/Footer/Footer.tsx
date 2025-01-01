import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="pt-16 pb-16">
      <div className="w-[80%] mx-auto items-start grid-cols-1 sm:grid-cols-2 grid md:grid-cols-3 
      lg:grid-cols-4 gap-10">
        <div className="space-y-5">
            <h1 className="text-lg font-bold">Công ty</h1>
            <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
                Về chúng tôi
            </p>
            <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
                Tuyển dụng
            </p>
            <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
                Diễn đàn
            </p>
            <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
                Thẻ tặng
            </p>
            <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
                Tạp chí
            </p>
        </div>

        <div className="space-y-5">
            <h1 className="text-lg font-bold">Hỗ trợ</h1>
            <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
                Liên lạc
            </p>
            <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
                Thông báo
            </p>
            <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
               Chính sách bảo mật
            </p>
            <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
                Điều khoản & Điều kiện
            </p>
            <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
                Địa chỉ
            </p>
        </div>

        <div className="space-y-5">
            <h1 className="text-lg font-bold">Dịch vụ khác</h1>
            <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
                Đặt vé tàu
            </p>
            <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
                Hoạt động
            </p>
            <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
                Tham quan
            </p>
            <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
                Tìm kiếm chuyến bay
            </p>
            <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
                Du lịch & Đại lý
            </p>
        </div>

        <div className="space-y-5">
            <h1 className="text-lg font-bold">Liên lạc chúng tôi</h1>
            <div className="mt-6">
                <h1 className="text-sm text-gray-600">Số điện thoại</h1>
                <h1 className="text-base font-bold text-blue-950 mt-1">
                    +0123456789
                </h1>
            </div>

            <div className="mt-6">
                <h1 className="text-sm text-gray-600">Email</h1>
                <h1 className="text-base font-bold text-blue-950 mt-1">
                    email@gmail.com
                </h1>
            </div>
        </div>
      </div>
      <div className="mt-8 w-[80%] mx-auto border-t pt-8 flex flex-col md:flex-row justify-between items-center 
      text-gray-600 text-sm">
        <p className="text-center md-text-left">
            Copyright c 2025 Saigon Tour
        </p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span>Social: </span>
            <Link href="#" className="text-gray-500 hover:text-gray-800">
                <FaFacebook/>
            </Link>   
            <Link href="#" className="text-gray-500 hover:text-gray-800">
                <FaTwitter/>
            </Link>            
        </div>
      </div>
    </div>
  )
}

export default Footer
