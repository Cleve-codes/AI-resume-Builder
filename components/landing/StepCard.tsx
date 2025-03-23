'use client'
import React from "react";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

export const StepCard: React.FC<StepCardProps> = ({
  number,
  title,
  description,
}) => {
  return (
    <div className="text-center animate-on-scroll">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-md">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 max-w-xs mx-auto">{description}</p>
    </div>
  );
};

export default StepCard; 