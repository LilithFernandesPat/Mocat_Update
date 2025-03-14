import React, {useEffect, useState} from 'react';

const Carousel = ({ children, autoSlide = true, autoSlideInterval = 30000 }) => {

    //#region Atributes
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = React.Children.count(children);
    //#endregion

    //#region Slide change logic
    useEffect(() => {
        if (autoSlide) {
            const slideInterval = setInterval(() => {
                nextSlide();
            }, autoSlideInterval);
            return () => clearInterval(slideInterval);
        }
    }, [autoSlide, autoSlideInterval, totalSlides]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    };
    //#endregion

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

            <button className="absolute hidden md:block w-[90px] top-1/2 left-0 transform -translate-y-1/2 opacity-50 hover:opacity-100 transition-all duration-100 p-2" onClick={prevSlide}>
                <img className='rotate-180 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]' src="arrow.svg" alt="prev_arrow"/>
            </button>
            <button className="absolute hidden md:block w-[90px] top-1/2 right-0 transform -translate-y-1/2 opacity-50 hover:opacity-100 transition-all p-2" onClick={nextSlide}>
                <img className='drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]' src="arrow.svg" alt="next_arrow"/>
            </button>
            <div className="absolute hidden md:flex bottom-0 left-0 right-0 flex justify-center mb-4">
                {React.Children.map(children, (child, index) => (
                    <div
                        key={index}
                        className={`w-9 h-1 rounded-[60px] opacity-50  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mx-1 ${index === currentIndex ? 'bg-rust opacity-90' : 'bg-penn-red'} `}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;