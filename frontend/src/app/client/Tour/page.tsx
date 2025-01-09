// app/Tour/page.tsx
"use client";
import React from "react";
import TourList from "@/components/Tour/TourList";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

const TourPage = () => {
  const [tours, setTours] = useState([]);
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setIsRouterReady(true);
    }
  }, [router.isReady]);

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

  const handleTourClick = (tourId: number) => {
    router.push(`/tour/${tourId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="container mx-auto p-4 mt-4"></div>
      <TourList tours={tours} onTourClick={handleTourClick} />
    </div>
  );
};

export default TourPage;
