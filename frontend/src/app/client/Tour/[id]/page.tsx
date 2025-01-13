// app/Tour/[id]/page.tsx
"use client";
import React from 'react';
import TourDetail from '@/components/Tour/TourDetail';

const TourDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params) as { id: string };

    if (!id) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <TourDetail params={params} />
        </div>
    );
};

export default TourDetailPage;

