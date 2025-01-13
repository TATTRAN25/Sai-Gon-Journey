// app/Tour/[id]/page.tsx
"use client";
import React from 'react';
import TourDetail from '@/components/Tour/TourDetail';

const TourDetailPage = ({ params }: { params: { id: string } }) => {
    const tourId = params.id;

    if (!tourId) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <TourDetail params={{ id: tourId }} />
        </div>
    );
};

export default TourDetailPage;

