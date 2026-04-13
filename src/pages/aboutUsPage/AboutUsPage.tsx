import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import aboutUs from "../../assets/aboutUs/Group 73.png";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Feature {
  image: string;
  title: string;
  description: string;
}

interface Testimonial {
  image: string;
  name: string;
  text: string;
}

export const fetchFeatures = async (): Promise<Feature[]> => {
    const { data } = await axios.get<Feature[]>('/aboutUs.json');
    return data;
};
  
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
    const { data } = await axios.get<Testimonial[]>('/aboutUsTestimoniyam.json');
    return data;
};

const AboutUsPage: React.FC = () => {
    const { data: features = [], isLoading: loadingFeatures } = useQuery<Feature[]>({
        queryKey: ["features"],
        queryFn: fetchFeatures,
      });
    
    const { data: testimonials, isLoading: loadingTestimonials } = useQuery<Testimonial[]>({
        queryKey: ["testimonials"],
        queryFn: fetchTestimonials,
      });
    
    if (loadingFeatures || loadingTestimonials) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#FDF1F7] py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#101750]">About Us</h1>
          <div className="flex items-center text-sm mt-1">
            <a href="/" className="text-[#000000] text-base font-semibold">
              Home
            </a>
            <span className="mx-2 text-gray-400">{">"}</span>
            <a href="#" className="text-[#000000] text-base font-semibold">
              Pages
            </a>
            <span className="mx-2 text-gray-400">{">"}</span>
            <span className="text-[#A8537B] text-base font-semibold">
              About us
            </span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center gap-20">
          <div className="w-full md:w-1/2 lg:w-3/5">
            <div className="rounded-lg p-2">
              <img
                src={aboutUs}
                alt="Team members working together"
                className="w-full h-auto rounded"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-3/5">
            <h2 className="text-4xl font-bold text-[#A8537B] mb-4">
              Know About Our Ecommerce Business, History
            </h2>
            <p className="text-[#505050] text-base mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices tristique amet erat vitae eget dolor los vitae
              lobortis quis bibendum quam. Lacus penatibus tincidunt. Mattis
              neque ultrices mattis aliquam, malesuada diam est. Malesuada sem
              tristique amet erat vitae eget dolor lobortis.
            </p>
            <button className="bg-[#C8A8E9] hover:bg-purple-400 text-white text-base px-6 py-2 rounded">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold text-[#1F1F1F] text-center mb-12">
            Our Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features?.map((feature: Feature, index: number) => (
              <div
                key={index}
                className="w-full h-[350px] bg-white p-6 rounded-lg text-center py-[72px]"
                style={{ boxShadow: "0 20px 50px rgba(75, 0, 129, 0.08)" }}
              >
                <div className="mb-4 w-[65px] h-[65px] mx-auto">
                  <img src={feature.image} alt="feature icon" className=" w-full object-cover items-center "/>
                </div>
                <h3 className="font-bold text-2xl text-[#151875] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#919191] text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section with Swiper */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center text-[#1F1F1F] mb-12">
            Our Client Say!
        </h2>

        <Swiper
            modules={[Pagination]}
            spaceBetween={40}
            slidesPerView={1}
            pagination={{
            el: ".custom-pagination",
            clickable: true,
            }}
            className="w-full"
        >
            {testimonials?.map((testimonial: Testimonial, index: number) => (
            <SwiperSlide key={index}>
                <div className="flex flex-col items-center text-center space-y-4">
                {/* Client images row */}
                <div className="flex justify-center space-x-4 mb-6">
                    {testimonials?.map((client: Testimonial, i: number) => (
                    <img
                        key={i}
                        src={client.image}
                        alt={client.name}
                        className={`w-14 h-14 rounded-lg object-cover border-2 ${
                        i === index ? "border-[#C8A8E9]" : "border-transparent"
                        }`}
                    />
                    ))}
                </div>

                {/* Name & Text */}
                <h4 className="font-semibold text-[#1F1F1F]">{testimonial.name}</h4>
                <p className="text-[#919191] max-w-xl mx-auto">
                    {testimonial.text}
                </p>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>

        {/* Custom Pagination Dots */}
        <div className="custom-pagination pt-8 text-center "></div>
    </div>
</div>
  );
};

export default AboutUsPage;
