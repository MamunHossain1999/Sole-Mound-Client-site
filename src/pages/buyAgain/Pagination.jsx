import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const [pageWindow, setPageWindow] = useState([1, Math.min(5, totalPages)]);

  // Auto update window when currentPage changes
  useEffect(() => {
    const maxVisible = 4;
    const windowStart = Math.floor((currentPage - 1) / maxVisible) * maxVisible + 1;
    const windowEnd = Math.min(windowStart + maxVisible - 1, totalPages);
    setPageWindow([windowStart, windowEnd]);
  }, [currentPage, totalPages]);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-6xl w-full mx-auto flex justify-end p-4">
      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C8A8E9] text-[#C8A8E9] flex items-center justify-center disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {Array.from({ length: pageWindow[1] - pageWindow[0] + 1 }).map((_, idx) => {
          const pageNum = pageWindow[0] + idx;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xs sm:text-sm font-semibold ${
                currentPage === pageNum
                  ? "bg-[#C8A8E9] text-white"
                  : "text-[#1F1F1F] hover:bg-purple-100"
              }`}
            >
              {String(pageNum).padStart(2, "0")}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C8A8E9] text-[#C8A8E9] flex items-center justify-center disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
