import React, { useState } from "react";
import { Link } from "react-router-dom";

const AllCategory = () => {
  const [isParentOpen, setIsParentOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const parentCategories = [
    {
      name: "Electronics",
      sub: [
        "Accessories & Supplies",
        "Camera & Photo",
        "Car & Vehicle Electronics",
        "Cell Phones & Accessories",
        "Computers & Accessories",
        "GPS & Navigation",
        "Headphones",
        "Home Audio",
        "Office Electronics",
        "Portable Audio & Video",
        "Security & Surveillance",
      ],
    },
    {
      name: "Computers",
      sub: [
        "Computer Accessories",
        "Computer Components",
        "Computers & Tablets",
        "Data Storage",
        "External Components",
        "Laptop Accessories",
        "Monitors",
        "Networking Products",
        "Power Strips & Surge Protectors",
        "Printers",
        "Scanners",
      ],
    },
    {
      name: "Smart Home",
      sub: [
        "Amazon Smart Home",
        "Works with Alexa Devices",
        "Smart Home Lighing",
        "Smart Locks and Entry",
        "Security Cameras and Systems",
        "Plugs and Outlets",
        "Heating and Cooling",
        "Detectors and Sensors",
        "Home Entertainment",
      ],
    },
    {
      name: "Automotive",
      sub: [
        "Car Care",
        "Car Electronics & Accessories",
        "Exterior Accessories",
        "Interior Accessories",
        "Lights & Lighting Accessories",
        "Motorcycle & Powersports",
        "Oils & Fluids",
        "Paint & Paint Supplies",
        "Performance Parts & Accessories",
        "Replacement Parts",
        "RV Parts & Accessories",
      ],
    },
    {
      name: "Baby",
      sub: [
        "Activity & Entertainment",
        "Apparel & Accessories",
        "Baby & Toddler Toys",
        "Baby Care",
        "Baby Stationery",
        "Car Seats & Accessories",
        "Diapering",
        "Feeding",
        "Gifts",
        "Nursery",
        "Potty Training",
      ],
    },
    {
      name: "Beauty and Personal Care",
      sub: [
        "Makeup",
        "Skin Care",
        "Hair Care",
        "Fragrance",
        "Foot, Hand & Nail Care",
        "Tools & Accessories",
        "Shave & Hair Removal",
        "Personal Care",
        "Oral Care",
      ],
    },
    {
      name: "Women's Fashion",
      sub: [
        "Clothing",
        "Shoes",
        "Jewelry",
        "Watches",
        "Handbags",
        "Accessories",
      ],
    },
    {
      name: "Men's Fashion",
      sub: ["Clothing", "Shoes", "Jewelry", "Watches", "Accessories"],
    },
    {
      name: "Girls' Fashion",
      sub: [
        "Clothing",
        "Shoes",
        "Jewelry",
        "Watches",
        "Accessories",
        "School Uniforms",
      ],
    },
    {
      name: "Boys' Fashion",
      sub: [
        "Clothing",
        "Shoes",
        "Jewelry",
        "Watches",
        "Accessories",
        "School Uniforms",
      ],
    },
    {
      name: "Health and Household",
      sub: [
        "Baby & Child Care",
        "Health Care",
        "Household Supplies",
        "Medical Supplies & Equipment",
        "Oral Care",
        "Personal Care",
        "Sexual Wellness",
        "Sports Nutrition",
        "Stationery & Gift Wrapping Supplies",
        "Vision Care",
        "Vitamins & Dietary Supplements",
      ],
    },
    {
      name: "Home and Kitchen",
      sub: [
        "Kids' Home Store",
        "Kitchen & Dining",
        "Bedding",
        "Bath",
        "Furniture",
        "Home Décor",
        "Wall Art",
        "Lighting & Ceiling Fans",
        "Seasonal Décor",
        "Event & Party Supplies",
        "Heating, Cooling & Air Quality",
      ],
    },
    {
      name: "Industrial and Scientific",
      sub: [
        "Abrasive & Finishing Products",
        "Additive Manufacturing Products",
        "Commercial Door Products",
        "Cutting Tools",
        "Fasteners",
        "Filtration",
        "Food Service Equipment & Supplies",
        "Hydraulics, Pneumatics & Plumbing",
        "Industrial Hardware",
        "Industrial Electrical",
      ],
    },
    {
      name: "Luggage",
      sub: [
        "Carry-ons",
        "Backpacks",
        "Garment bags",
        "Travel Totes",
        "Luggage Sets",
        "Laptop Bags",
        "Suitcases",
        "Kids Luggage",
        "Messenger Bags",
        "Umbrellas",
        "Duffles",
      ],
    },
    {
      name: "Pet supplies",
      sub: [
        "Dogs",
        "Cats",
        "Fish & Aquatic Pets",
        "Birds",
        "Horses",
        "Reptiles & Amphibians",
        "Small Animals",
      ],
    },
    {
      name: "Toys and Games",
      sub: [
        "Action Figures & Statues",
        "Arts & Crafts",
        "Baby & Toddler Toys",
        "Building Toys",
        "Dolls & Accessories",
        "Dress Up & Pretend Play",
        "Kids' Electronics",
        "Games",
        "Grown-Up Toys",
        "Hobbies",
        "Kids' Furniture, Decor & Storage",
      ],
    },
  ];

  const toSlug = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  return (
    <div className="relative inline-block text-left group">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md cursor-pointer hover:bg-gray-100"
        >
           <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          All Category
          <svg
            className="-mr-1 ml-2 h-5 w-5 text-gray-400"
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
      <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible  group-hover:visible transition-all duration-200 z-20">
        <div className="py-1">
          {parentCategories.map((parent) => (
            <div key={parent.name} className="relative group/submenu">
              <Link
                to={`/category/${toSlug(parent.name)}`}
                className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                    {parent.sub.map((sub) => (
                      <Link
                        key={sub}
                        to={`/category/${toSlug(parent.name)}/${toSlug(sub)}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {sub}
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
