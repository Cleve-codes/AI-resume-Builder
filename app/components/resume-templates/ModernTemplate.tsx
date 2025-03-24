import React from 'react';
import { ResumeData, ResumeTemplate } from '@/types/resume';
import BaseTemplate from './BaseTemplate';

interface ModernTemplateProps {
  data: ResumeData;
  template: ResumeTemplate;
  scale?: number;
  isEditable?: boolean;
  onEditField?: (section: string, index: number, field: string, value: string) => void;
}

const ModernTemplate: React.FC<ModernTemplateProps> = (props) => {
  const { data, template, isEditable, onEditField } = props;
  const { structure } = template;

  const renderHeader = () => {
    return (
      <header className="mb-6 text-center">
        <h1 
          className="text-3xl font-bold mb-2"
          style={{ color: structure.primaryColor }}
        >
          {isEditable ? (
            <span
              contentEditable={true}
              suppressContentEditableWarning={true}
              onBlur={(e) => onEditField?.('personalInfo', 0, 'name', e.currentTarget.textContent || '')}
              className="outline-none border-b border-dashed border-gray-300 hover:border-gray-400 focus:border-primary-500"
            >
              {data.personalInfo.name}
            </span>
          ) : (
            data.personalInfo.name
          )}
        </h1>
      </header>
    );
  };

  const renderSidebar = () => {
    return (
      <div
        className="w-1/3 p-4 text-white h-full"
        style={{ backgroundColor: structure.primaryColor }}
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 border-b border-white/30 pb-1">Contact</h3>
          <div className="space-y-2 text-sm">
            <div>{data.personalInfo.email}</div>
            <div>{data.personalInfo.phone}</div>
            <div>{data.personalInfo.location}</div>
            {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
            {data.personalInfo.linkedin && <div>{data.personalInfo.linkedin}</div>}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 border-b border-white/30 pb-1">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-white/10 rounded text-xs mb-1"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {data.education.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 border-b border-white/30 pb-1">Education</h3>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div key={index} className="text-sm">
                  <div className="font-medium">{edu.degree}</div>
                  <div>{edu.institution}</div>
                  <div className="text-white/80 text-xs">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.certifications && data.certifications.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 border-b border-white/30 pb-1">Certifications</h3>
            <div className="space-y-2">
              {data.certifications.map((cert, index) => (
                <div key={index} className="text-sm">
                  <div className="font-medium">{cert.name}</div>
                  <div>{cert.issuer}</div>
                  <div className="text-white/80 text-xs">{cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMainContent = () => {
    return (
      <div className="w-2/3 p-4">
        {data.summary && (
          <section className="mb-6">
            <h2 
              style={{ color: structure.primaryColor }} 
              className="text-lg font-semibold mb-2 pb-1 border-b"
            >
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700">
              {isEditable ? (
                <span
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => onEditField?.('summary', 0, 'content', e.currentTarget.textContent || '')}
                  className="outline-none border-b border-dashed border-gray-300 hover:border-gray-400 focus:border-primary-500"
                >
                  {data.summary}
                </span>
              ) : (
                data.summary
              )}
            </p>
          </section>
        )}

        <section className="mb-6">
          <h2 
            style={{ color: structure.primaryColor }} 
            className="text-lg font-semibold mb-3 pb-1 border-b"
          >
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="text-sm relative pl-4">
                <div 
                  className="absolute left-0 top-0 bottom-0 w-0.5" 
                  style={{ backgroundColor: structure.primaryColor }}
                ></div>
                <div className="font-medium text-base">{exp.title}</div>
                <div className="flex justify-between">
                  <div>{exp.company}, {exp.location}</div>
                  <div className="text-gray-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <p className="mt-2 text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {data.projects && data.projects.length > 0 && (
          <section className="mb-6">
            <h2 
              style={{ color: structure.primaryColor }} 
              className="text-lg font-semibold mb-3 pb-1 border-b"
            >
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={index} className="text-sm">
                  <div className="font-medium flex items-center">
                    {project.title}
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-2 text-xs"
                        style={{ color: structure.primaryColor }}
                      >
                        [Link]
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  };

  return (
    <BaseTemplate {...props}>
      <div className="flex flex-col h-full">
        {renderHeader()}
        <div className="flex flex-row flex-grow">
          {renderSidebar()}
          {renderMainContent()}
        </div>
      </div>
    </BaseTemplate>
  );
};

export default ModernTemplate; 