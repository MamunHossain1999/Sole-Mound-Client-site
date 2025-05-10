import React, { useState } from 'react';

const ProductReviewsSection =()=> {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const reviews = [
    {
      id: 1,
      name: "Maxin Will",
      position: "Product Manager",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamcoLorem"
    },
    {
      id: 2,
      name: "Maxin Will",
      position: "Product Manager",
      avatar: "/api/placeholder/60/60",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      position: "Software Engineer",
      avatar: "/api/placeholder/60/60",
      rating: 4,
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
    }
  ];

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i}
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill={i < rating ? "#FFD700" : "#E5E7EB"}
        className="inline-block"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="container mx-auto my-6">
      <h2 className="text-[20px] font-bold mb-5 text-[#1F1F1F]">Reviews</h2>
      
      
        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[0, 1].map((offset) => {
            const index = (activeIndex + offset) % reviews.length;
            const review = reviews[index];
            return (
              <div key={review.id} className="bg-white rounded-lg p-6 border border-[#E2E3E8] transition-all duration-300 ">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-[24px] text-[#1F1F1F]">{review.name}</h3>
                    <p className="text-[#919191] text-base">{review.position}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-[#1F1F1F] text-base font-normal leading-relaxed">{review.text}</p>
              </div>
            );
          })}
        </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-6 bg-purple-600" : "w-2 bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductReviewsSection;