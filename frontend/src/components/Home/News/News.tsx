import SectionHeading from '@/components/Helper/SectionHeading'
import React from 'react'
import NewsCard from './NewsCard'

const New = () => {
  return (
    <div className="pt-16 pb-16">
        <SectionHeading heading="Tin tức du lịch"/>    
        <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-10 
        items-center mt-20"> 
            <div>
                <NewsCard image="/images/n1.jpg"
                title="Top 10 nơi nhiều lượt đến" 
                date="15 November 2024"/>
            </div>
            <div>
                <NewsCard image="/images/n2.jpg"
                title="Top 10 nơi nhiều lượt đến" 
                date="15 November 2024"/>
            </div>
            <div>
                <NewsCard image="/images/n3.jpg"
                title="Top 10 nơi nhiều lượt đến" 
                date="15 November 2024"/>
            </div>
            <div>
                <NewsCard image="/images/n4.jpg"
                title="Top 10 nơi nhiều lượt đến" 
                date="15 November 2024"/>
            </div>
        </div>  
    </div>
  )
}

export default New
