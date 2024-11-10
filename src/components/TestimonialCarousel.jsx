import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "V Pratheek",
        role: "7th Standard student",
        image: "https://i2.pngimg.me/thumb/f/720/c3f2c592f9.jpg",
        content: "This product has completely transformed how we handle our studies.",
        rating: 5
    },
    {
        name: "Srujan G S",
        role: "7th Standard student",
        image: `https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png`,
        content: "The integration was seamless and the support team was exceptional. Highly recommend for every student.",
        rating: 3
    },
    {
        name: "Swathi D Gowda",
        role: "7th Standard student",
        image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD3OmwXK7xXXVWJZiocRJOasPkHLK27kGGOQ&s`,
        content: "Best decision we made this year. The support has been incredible and understandable.",
        rating: 4
    },
    {
        name: "Sanjay B S",
        role: "6th Standard student",
        image: `https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png`,
        content: "It is a good platform to learn topic in a greater depth and it is guiding me in my prepartion for future classes.",
        rating: 5
    },
];

const TestimonialCard = ({ testimonial }) => (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg mx-4 my-2 min-w-[300px] max-w-sm">
        <div className="flex items-center mb-4">
            <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
            />
            <div>
                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
            </div>
        </div>
        <div className="flex mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
        </div>
        <p className="text-gray-700 italic">{testimonial.content}</p>
    </div>
);

const TestimonialCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                >
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            <div className="flex justify-center">
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-6 space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialCarousel;