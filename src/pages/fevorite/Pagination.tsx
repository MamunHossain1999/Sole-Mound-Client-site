import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Create array of page numbers to show
  const getVisiblePages = () => {
    const pages = [];

    // Always show current page
    pages.push(currentPage);

    // Add up to 3 surrounding pages for small devices
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage > 1) pages.unshift(currentPage - 1);
    if (currentPage < totalPages) pages.push(currentPage + 1);

    if (currentPage - 2 > 0 && pages.length < 4) {
      pages.unshift(currentPage - 2);
    }
    if (currentPage + 2 <= totalPages && pages.length < 4) {
      pages.push(currentPage + 2);
    }

    return [...new Set(pages)].sort((a, b) => a - b);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-end mt-6 gap-2 flex-wrap">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C8A8E9] text-[#C8A8E9] flex items-center justify-center disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {/* Mobile: limited, Desktop: full */}
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        const isVisible =
          window.innerWidth >= 640 || visiblePages.includes(page);

        return (
          isVisible && (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xs sm:text-sm font-semibold ${
                currentPage === page
                  ? "bg-[#C8A8E9] text-white"
                  : "text-[#1F1F1F] hover:bg-purple-100"
              }`}
            >
              {String(page).padStart(2, "0")}
            </button>
          )
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C8A8E9] text-[#C8A8E9] flex items-center justify-center disabled:opacity-50"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
};

export default Pagination;
