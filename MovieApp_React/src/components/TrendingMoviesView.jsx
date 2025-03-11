import React, { useState } from 'react';

const Carousel = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = React.Children.count(children);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    };

    return (
        <div className="relative w-full ">
            <div className="overflow-hidden relative max-h-[340px] sm:max-h-[300px] lg:max-h-[500px]">
                <div className="flex transition-transform  duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {React.Children.map(children, (child, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2" onClick={prevSlide}>
                Prev
            </button>
            <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2" onClick={nextSlide}>
                Next
            </button>
        </div>
    );
};

export default Carousel;