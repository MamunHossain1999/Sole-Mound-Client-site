import React, { useState } from "react";
import { Link } from "react-router-dom";

const AllCategory = () => {
  const [isParentOpen, setIsParentOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const parentCategories = [
    {
      name: "Electronics",
      sub: [
        { name: "Electronics", link: "/category-search-page" },
        {
          name: "Accessories & Supplies",
          link: "/category/electronics/accessories-and-supplies",
        },
        {
          name: "Camera & Photo",
          link: "/category/electronics/camera-and-photo",
        },
        {
          name: "Car & Vehicle Electronics",
          link: "/category/electronics/car-and-vehicle-electronics",
        },
        {
          name: "Cell Phones & Accessories",
          link: "/category/electronics/cell-phones-and-accessories",
        },
        {
          name: "Computers & Accessories",
          link: "/category/electronics/computers-and-accessories",
        },
        {
          name: "GPS & Navigation",
          link: "/category/electronics/gps-and-navigation",
        },
        { name: "Headphones", link: "/category/electronics/headphones" },
        { name: "Home Audio", link: "/category/electronics/home-audio" },
        {
          name: "Office Electronics",
          link: "/category/electronics/office-electronics",
        },
        {
          name: "Portable Audio & Video",
          link: "/category/electronics/portable-audio-and-video",
        },
        {
          name: "Security & Surveillance",
          link: "/category/electronics/security-and-surveillance",
        },
      ],
    },
    {
      name: "Computers",
      sub: [
        {
          name: "Computer Accessories",
          link: "/category/computers/computer-accessories",
        },
        {
          name: "Computer Components",
          link: "/category/computers/computer-components",
        },
        {
          name: "Computers & Tablets",
          link: "/category/computers/computers-and-tablets",
        },
        { name: "Data Storage", link: "/category/computers/data-storage" },
        {
          name: "External Components",
          link: "/category/computers/external-components",
        },
        {
          name: "Laptop Accessories",
          link: "/category/computers/laptop-accessories",
        },
        { name: "Monitors", link: "/category/computers/monitors" },
        {
          name: "Networking Products",
          link: "/category/computers/networking-products",
        },
        {
          name: "Power Strips & Surge Protectors",
          link: "/category/computers/power-strips-and-surge-protectors",
        },
        { name: "Printers", link: "/category/computers/printers" },
        { name: "Scanners", link: "/category/computers/scanners" },
      ],
    },
    {
      name: "Smart Home",
      sub: [
        {
          name: "Amazon Smart Home",
          link: "/category/smart-home/amazon-smart-home",
        },
        {
          name: "Works with Alexa Devices",
          link: "/category/smart-home/works-with-alexa-devices",
        },
        {
          name: "Smart Home Lighing",
          link: "/category/smart-home/smart-home-lighing",
        },
        {
          name: "Smart Locks and Entry",
          link: "/category/smart-home/smart-locks-and-entry",
        },
        {
          name: "Security Cameras and Systems",
          link: "/category/smart-home/security-cameras-and-systems",
        },
        {
          name: "Plugs and Outlets",
          link: "/category/smart-home/plugs-and-outlets",
        },
        {
          name: "Heating and Cooling",
          link: "/category/smart-home/heating-and-cooling",
        },
        {
          name: "Detectors and Sensors",
          link: "/category/smart-home/detectors-and-sensors",
        },
        {
          name: "Home Entertainment",
          link: "/category/smart-home/home-entertainment",
        },
      ],
    },
    {
      name: "Automotive",
      sub: [
        { name: "Car Care", link: "/category/automotive/car-care" },
        {
          name: "Car Electronics & Accessories",
          link: "/category/automotive/car-electronics-and-accessories",
        },
        {
          name: "Exterior Accessories",
          link: "/category/automotive/exterior-accessories",
        },
        {
          name: "Interior Accessories",
          link: "/category/automotive/interior-accessories",
        },
        {
          name: "Lights & Lighting Accessories",
          link: "/category/automotive/lights-and-lighting-accessories",
        },
        {
          name: "Motorcycle & Powersports",
          link: "/category/automotive/motorcycle-and-powersports",
        },
        { name: "Oils & Fluids", link: "/category/automotive/oils-and-fluids" },
        {
          name: "Paint & Paint Supplies",
          link: "/category/automotive/paint-and-paint-supplies",
        },
        {
          name: "Performance Parts & Accessories",
          link: "/category/automotive/performance-parts-and-accessories",
        },
        {
          name: "Replacement Parts",
          link: "/category/automotive/replacement-parts",
        },
        {
          name: "RV Parts & Accessories",
          link: "/category/automotive/rv-parts-and-accessories",
        },
      ],
    },
    {
      name: "Baby",
      sub: [
        {
          name: "Activity & Entertainment",
          link: "/category/baby/activity-and-entertainment",
        },
        {
          name: "Apparel & Accessories",
          link: "/category/baby/apparel-and-accessories",
        },
        {
          name: "Baby & Toddler Toys",
          link: "/category/baby/baby-and-toddler-toys",
        },
        { name: "Baby Care", link: "/category/baby/baby-care" },
        { name: "Baby Stationery", link: "/category/baby/baby-stationery" },
        {
          name: "Car Seats & Accessories",
          link: "/category/baby/car-seats-and-accessories",
        },
        { name: "Diapering", link: "/category/baby/diapering" },
        { name: "Feeding", link: "/category/baby/feeding" },
        { name: "Gifts", link: "/category/baby/gifts" },
        { name: "Nursery", link: "/category/baby/nursery" },
        { name: "Potty Training", link: "/category/baby/potty-training" },
      ],
    },
    {
      name: "Beauty and Personal Care",
      sub: [
        { name: "Makeup", link: "/category/beauty-and-personal-care/makeup" },
        {
          name: "Skin Care",
          link: "/category/beauty-and-personal-care/skin-care",
        },
        {
          name: "Hair Care",
          link: "/category/beauty-and-personal-care/hair-care",
        },
        {
          name: "Fragrance",
          link: "/category/beauty-and-personal-care/fragrance",
        },
        {
          name: "Foot, Hand & Nail Care",
          link: "/category/beauty-and-personal-care/foot-hand-and-nail-care",
        },
        {
          name: "Tools & Accessories",
          link: "/category/beauty-and-personal-care/tools-and-accessories",
        },
        {
          name: "Shave & Hair Removal",
          link: "/category/beauty-and-personal-care/shave-and-hair-removal",
        },
        {
          name: "Personal Care",
          link: "/category/beauty-and-personal-care/personal-care",
        },
        {
          name: "Oral Care",
          link: "/category/beauty-and-personal-care/oral-care",
        },
      ],
    },
    {
      name: "Women's Fashion",
      sub: [
        { name: "Clothing", link: "/category/womens-fashion/clothing" },
        { name: "Shoes", link: "/category/womens-fashion/shoes" },
        { name: "Jewelry", link: "/category/womens-fashion/jewelry" },
        { name: "Watches", link: "/category/womens-fashion/watches" },
        { name: "Handbags", link: "/category/womens-fashion/handbags" },
        { name: "Accessories", link: "/category/womens-fashion/accessories" },
      ],
    },
    {
      name: "Men's Fashion",
      sub: [
        { name: "Clothing", link: "/category/mens-fashion/clothing" },
        { name: "Shoes", link: "/category/mens-fashion/shoes" },
        { name: "Jewelry", link: "/category/mens-fashion/jewelry" },
        { name: "Watches", link: "/category/mens-fashion/watches" },
        { name: "Accessories", link: "/category/mens-fashion/accessories" },
      ],
    },
    {
      name: "Girls' Fashion",
      sub: [
        { name: "Clothing", link: "/category/girls-fashion/clothing" },
        { name: "Shoes", link: "/category/girls-fashion/shoes" },
        { name: "Jewelry", link: "/category/girls-fashion/jewelry" },
        { name: "Watches", link: "/category/girls-fashion/watches" },
        { name: "Accessories", link: "/category/girls-fashion/accessories" },
        {
          name: "School Uniforms",
          link: "/category/girls-fashion/school-uniforms",
        },
      ],
    },
    {
      name: "Boys' Fashion",
      sub: [
        { name: "Clothing", link: "/category/boys-fashion/clothing" },
        { name: "Shoes", link: "/category/boys-fashion/shoes" },
        { name: "Jewelry", link: "/category/boys-fashion/jewelry" },
        { name: "Watches", link: "/category/boys-fashion/watches" },
        { name: "Accessories", link: "/category/boys-fashion/accessories" },
        {
          name: "School Uniforms",
          link: "/category/boys-fashion/school-uniforms",
        },
      ],
    },
    {
      name: "Health and Household",
      sub: [
        {
          name: "Baby & Child Care",
          link: "/category/health-and-household/baby-and-child-care",
        },
        {
          name: "Health Care",
          link: "/category/health-and-household/health-care",
        },
        {
          name: "Household Supplies",
          link: "/category/health-and-household/household-supplies",
        },
        {
          name: "Medical Supplies & Equipment",
          link: "/category/health-and-household/medical-supplies-and-equipment",
        },
        { name: "Oral Care", link: "/category/health-and-household/oral-care" },
        {
          name: "Personal Care",
          link: "/category/health-and-household/personal-care",
        },
        {
          name: "Sexual Wellness",
          link: "/category/health-and-household/sexual-wellness",
        },
        {
          name: "Sports Nutrition",
          link: "/category/health-and-household/sports-nutrition",
        },
        {
          name: "Stationery & Gift Wrapping Supplies",
          link: "/category/health-and-household/stationery-and-gift-wrapping-supplies",
        },
        {
          name: "Vision Care",
          link: "/category/health-and-household/vision-care",
        },
        {
          name: "Vitamins & Dietary Supplements",
          link: "/category/health-and-household/vitamins-and-dietary-supplements",
        },
      ],
    },
    {
      name: "Home and Kitchen",
      sub: [
        {
          name: "Kids' Home Store",
          link: "/category/home-and-kitchen/kids-home-store",
        },
        {
          name: "Kitchen & Dining",
          link: "/category/home-and-kitchen/kitchen-and-dining",
        },
        { name: "Bedding", link: "/category/home-and-kitchen/bedding" },
        { name: "Bath", link: "/category/home-and-kitchen/bath" },
        { name: "Furniture", link: "/category/home-and-kitchen/furniture" },
        { name: "Home Décor", link: "/category/home-and-kitchen/home-decor" },
        { name: "Wall Art", link: "/category/home-and-kitchen/wall-art" },
        {
          name: "Lighting & Ceiling Fans",
          link: "/category/home-and-kitchen/lighting-and-ceiling-fans",
        },
        {
          name: "Seasonal Décor",
          link: "/category/home-and-kitchen/seasonal-decor",
        },
        {
          name: "Event & Party Supplies",
          link: "/category/home-and-kitchen/event-and-party-supplies",
        },
        {
          name: "Heating, Cooling & Air Quality",
          link: "/category/home-and-kitchen/heating-cooling-and-air-quality",
        },
      ],
    },
    {
      name: "Industrial and Scientific",
      sub: [
        {
          name: "Abrasive & Finishing Products",
          link: "/category/industrial-and-scientific/abrasive-and-finishing-products",
        },
        {
          name: "Additive Manufacturing Products",
          link: "/category/industrial-and-scientific/additive-manufacturing-products",
        },
        {
          name: "Commercial Door Products",
          link: "/category/industrial-and-scientific/commercial-door-products",
        },
        {
          name: "Cutting Tools",
          link: "/category/industrial-and-scientific/cutting-tools",
        },
        {
          name: "Fasteners",
          link: "/category/industrial-and-scientific/fasteners",
        },
        {
          name: "Filtration",
          link: "/category/industrial-and-scientific/filtration",
        },
        {
          name: "Food Service Equipment & Supplies",
          link: "/category/industrial-and-scientific/food-service-equipment-and-supplies",
        },
        {
          name: "Hydraulics, Pneumatics & Plumbing",
          link: "/category/industrial-and-scientific/hydraulics-pneumatics-and-plumbing",
        },
        {
          name: "Industrial Hardware",
          link: "/category/industrial-and-scientific/industrial-hardware",
        },
        {
          name: "Industrial Electrical",
          link: "/category/industrial-and-scientific/industrial-electrical",
        },
      ],
    },
    {
      name: "Luggage",
      sub: [
        { name: "Carry-ons", link: "/category/luggage/carry-ons" },
        { name: "Backpacks", link: "/category/luggage/backpacks" },
        { name: "Garment bags", link: "/category/luggage/garment-bags" },
        { name: "Travel Totes", link: "/category/luggage/travel-totes" },
        { name: "Luggage Sets", link: "/category/luggage/luggage-sets" },
        { name: "Laptop Bags", link: "/category/luggage/laptop-bags" },
        { name: "Suitcases", link: "/category/luggage/suitcases" },
        { name: "Kids Luggage", link: "/category/luggage/kids-luggage" },
        { name: "Messenger Bags", link: "/category/luggage/messenger-bags" },
        { name: "Umbrellas", link: "/category/luggage/umbrellas" },
        { name: "Duffles", link: "/category/luggage/duffles" },
      ],
    },
    {
      name: "Pet supplies",
      sub: [
        { name: "Dogs", link: "/category/pet-supplies/dogs" },
        { name: "Cats", link: "/category/pet-supplies/cats" },
        {
          name: "Fish & Aquatic Pets",
          link: "/category/pet-supplies/fish-and-aquatic-pets",
        },
        { name: "Birds", link: "/category/pet-supplies/birds" },
        { name: "Horses", link: "/category/pet-supplies/horses" },
        {
          name: "Reptiles & Amphibians",
          link: "/category/pet-supplies/reptiles-and-amphibians",
        },
        { name: "Small Animals", link: "/category/pet-supplies/small-animals" },
      ],
    },
    {
      name: "Toys and Games",
      sub: [
        {
          name: "Action Figures & Statues",
          link: "/category/toys-and-games/action-figures-and-statues",
        },
        {
          name: "Arts & Crafts",
          link: "/category/toys-and-games/arts-and-crafts",
        },
        {
          name: "Baby & Toddler Toys",
          link: "/category/toys-and-games/baby-and-toddler-toys",
        },
        {
          name: "Building Toys",
          link: "/category/toys-and-games/building-toys",
        },
        {
          name: "Dolls & Accessories",
          link: "/category/toys-and-games/dolls-and-accessories",
        },
        {
          name: "Dress Up & Pretend Play",
          link: "/category/toys-and-games/dress-up-and-pretend-play",
        },
        {
          name: "Kids' Electronics",
          link: "/category/toys-and-games/kids-electronics",
        },
        { name: "Games", link: "/category/toys-and-games/games" },
        {
          name: "Grown-Up Toys",
          link: "/category/toys-and-games/grown-up-toys",
        },
        { name: "Hobbies", link: "/category/toys-and-games/hobbies" },
        {
          name: "Kids' Furniture, Decor & Storage",
          link: "/category/toys-and-games/kids-furniture-decor-and-storage",
        },
      ],
    },
  ];

  return (
    <div className="relative inline-block text-left group">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full py-2 text-base  items-center gap-0.5 font-semibold text-[#1F1F1F] bg-white rounded-md cursor-pointer hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          All Category
          <svg
            className=" ml- h-5 w-5 text-[#1F1F1F]"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Main Menu on Hover */}
      <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-20">
        <div className="py-1">
          {parentCategories?.map((parent) => (
            <div key={parent.name} className="relative group/submenu">
              <Link
                to={`/#/${parent.name.toLowerCase().replace(/ /g, "-")}`}
                className="flex justify-between items-center w-full px-4 py-2 text-base text-[#000000]  hover:bg-gray-100"
              >
                {parent.name}
                {parent.sub && (
                  <svg
                    className="h-4 w-4 text-gray-400 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 6L14 10L6 14V6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </Link>

              {/* Submenu on Hover */}
              {parent.sub && (
                <div className="absolute left-full top-0 mt-0 w-56 bg-white rounded-md shadow-lg opacity-0 group-hover/submenu:opacity-100 invisible group-hover/submenu:visible transition-all duration-200 z-30">
                  <div className="py-1 max-h-52 overflow-y-auto">
                    {parent?.sub?.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.link}
                        className="block px-4 py-2 text-base text-[#000000] hover:bg-gray-100"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategory;
