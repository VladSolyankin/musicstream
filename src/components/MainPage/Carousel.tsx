import {useState} from 'react';

const containerStyle = {
    width: '100%',
    overflow: 'hidden',
};

const slideContainerStyle = {
    display: 'flex',
    transition: 'transform 0.5s ease',
};

const slideStyle = {
    minWidth: "100%"
};

const images = [
    '/assets/carousel1.jpg',
    '/assets/carousel2.jpg',
    '/assets/carousel3.jpg'
];

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div className="relative max-w-6xl mx-auto overflow-hidden flex items-center py-20 gap-3">
            <svg onClick={prevSlide} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-16 h-12 bg-white rounded-3xl">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
            <div style={containerStyle} className="border-t-2 rounded-3xl">
                <div style={{ ...slideContainerStyle, transform: `translateX(-${currentSlide * 100}%)` }} >
                    {images.map((image, index) => (
                        <div key={index} style={slideStyle}>
                            <img src={image} alt={`slide-${index}`}/>
                        </div>
                    ))}
                </div>
                <div className="bg-gray-12 min-w-max h-24 flex flex-col justify-center px-10">
                    <h2 className="text-white text-xl">Лучшая музыка за месяц</h2>
                    <span className="text-gray-600">Пополните свою коллекцию новыми треками...</span>
                </div>
            </div>
            <svg onClick={nextSlide} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-16 h-12 bg-white rounded-3xl">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>

        </div>
    );
};

export default Carousel;