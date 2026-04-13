import React from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 'medium', message }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        <div className={`${sizeClasses[size]} rounded-full absolute border-4 border-solid border-gray-200`}></div>
        <div className={`${sizeClasses[size]} rounded-full animate-spin absolute border-4 border-solid border-[#C8A8E9] border-t-transparent`}></div>
      </div>
      {message && (
        <p className="mt-4 text-gray-600 text-center">{message}</p>
      )}
    </div>
  );
};

export default Loading;
