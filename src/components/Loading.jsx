import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="relative">
                <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
                <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-[#C8A8E9] border-t-transparent"></div>
            </div>
        </div>
    );
};

export default Loading;