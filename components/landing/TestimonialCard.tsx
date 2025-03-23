'use client'
import React from "react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-blue-50 animate-on-scroll">
      <div className="text-blue-600 mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.6 4C4.6 4 4 11.6 4 11.6V16H8.4V11.6H6.8C6.8 11.6 7.2 6.8 11.6 6.8V4ZM20 4C13 4 12.4 11.6 12.4 11.6V16H16.8V11.6H15.2C15.2 11.6 15.6 6.8 20 6.8V4Z" fill="currentColor"/>
        </svg>
      </div>
      <p className="text-gray-700 mb-6">{quote}</p>
      <div>
        <p className="font-bold text-gray-900">{author}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard; 