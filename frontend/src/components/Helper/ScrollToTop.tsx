"use client";
import React, { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        const toogleVisibility = () => {
            if(window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toogleVisibility);
        return () => window.removeEventListener("scroll", toogleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

  return (
    <div className="fixed bottom-4 animate-pulse right-4">
      {isVisible && <button className="bg-rose-700 text-white rounded-full w-12 h-12 flex items-center 
      justify-center focus:outline-none">
        <FaArrowUp/>
        </button>}
    </div>
  )
}

export default ScrollToTop
