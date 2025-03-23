'use client'
import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-blue-50 hover:shadow-lg transition-all duration-300 animate-on-scroll group hover:-translate-y-1">
      <div className="mb-5 inline-flex p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard; 