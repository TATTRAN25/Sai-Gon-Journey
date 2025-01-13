// app/Tour/page.tsx
"use client";
import React from "react";
import TourList from "@/components/Tour/TourList";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TourPage = () => {
  const [tours, setTours] = useState([]);
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);

  useEffect(() => {
    if (router) {
      setIsRouterReady(true);
    }
  }, [router]);

  useEffect(() => {
    const fetchTours = async () => {
      const response = await fetch("http://localhost:8000/api/v1/tours");
      const tours = await response.json();
      setTours(tours);
    };

    if (isRouterReady) {
      fetchTours();
    }
  }, [isRouterReady]);

  // Điều hướng đến trang chi tiết Tour
  const handleTourClick = (tourId: number) => {
    router.push(`/client/Tour/${tourId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <TourList tours={tours} onTourClick={handleTourClick} />
    </div>
  );
};

export default TourPage;
