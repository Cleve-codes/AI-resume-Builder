import React from 'react';
import { ResumeData, ResumeTemplate } from '@/types/resume';

interface BaseTemplateProps {
  data: ResumeData;
  template: ResumeTemplate;
  scale?: number;
  isEditable?: boolean;
  onEditField?: (section: string, index: number, field: string, value: string) => void;
  children?: React.ReactNode;
}

const BaseTemplate: React.FC<BaseTemplateProps> = ({
  data,
  template,
  scale = 1,
  isEditable = false,
  onEditField,
  children
}) => {
  const { structure } = template;
  
  const containerStyle = {
    fontFamily: structure.fontFamily || 'Inter, sans-serif',
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: '8.5in',
    height: '11in',
    padding: '0.5in',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  };

  return (
    <div style={containerStyle} className="relative">
      <div className="absolute top-2 right-2 text-xs text-gray-400">
        {!isEditable && 'Preview Only'}
      </div>
      {children ? (
        children
      ) : (
        <div className="flex flex-col h-full">
          {/* Default placeholder content when no children are provided */}
          <div className="text-center text-gray-500">
            Template: {template.name}
          </div>
        </div>
      )}
    </div>
  );
};

export default BaseTemplate; 