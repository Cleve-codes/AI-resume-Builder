import React from 'react';
import { ResumeData, ResumeTemplate } from '@/types/resume';
import BaseTemplate from './BaseTemplate';

interface ProfessionalTemplateProps {
  data: ResumeData;
  template: ResumeTemplate;
  scale?: number;
  isEditable?: boolean;
  onEditField?: (section: string, index: number, field: string, value: string) => void;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = (props) => {
  const { data, template, isEditable, onEditField } = props;
  const { structure } = template;

  const renderHeader = () => {
    return (
      <header style={{ color: structure.primaryColor }} className="mb-4">
        <h1 className="text-3xl font-bold mb-1">
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
        <div className="flex flex-wrap gap-3 text-sm">
          <div>{data.personalInfo.email}</div>
          <div>•</div>
          <div>{data.personalInfo.phone}</div>
          <div>•</div>
          <div>{data.personalInfo.location}</div>
          {data.personalInfo.website && (
            <>
              <div>•</div>
              <div>{data.personalInfo.website}</div>
            </>
          )}
          {data.personalInfo.linkedin && (
            <>
              <div>•</div>
              <div>{data.personalInfo.linkedin}</div>
            </>
          )}
        </div>
      </header>
    );
  };

  const renderSummary = () => {
    if (!data.summary) return null;
    
    return (
      <section className="mb-4">
        <h2 style={{ color: structure.primaryColor }} className="text-lg font-semibold mb-2 pb-1 border-b border-gray-200">
          Professional Summary
        </h2>
        <p className="text-sm">
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
    );
  };

  const renderExperience = () => {
    return (
      <section className="mb-4">
        <h2 style={{ color: structure.primaryColor }} className="text-lg font-semibold mb-2 pb-1 border-b border-gray-200">
          Experience
        </h2>
        <div className="space-y-3">
          {data.experience.map((exp, index) => (
            <div key={index} className="text-sm">
              <div className="flex justify-between">
                <div className="font-medium">{exp.title}</div>
                <div className="text-gray-600">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </div>
              </div>
              <div className="flex justify-between">
                <div>{exp.company}, {exp.location}</div>
              </div>
              <p className="mt-1 text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderEducation = () => {
    return (
      <section className="mb-4">
        <h2 style={{ color: structure.primaryColor }} className="text-lg font-semibold mb-2 pb-1 border-b border-gray-200">
          Education
        </h2>
        <div className="space-y-3">
          {data.education.map((edu, index) => (
            <div key={index} className="text-sm">
              <div className="flex justify-between">
                <div className="font-medium">{edu.degree}</div>
                <div className="text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
              <div>{edu.institution}, {edu.location}</div>
              {edu.description && <p className="mt-1 text-gray-700">{edu.description}</p>}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSkills = () => {
    return (
      <section className="mb-4">
        <h2 style={{ color: structure.primaryColor }} className="text-lg font-semibold mb-2 pb-1 border-b border-gray-200">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 rounded text-xs"
              style={{ borderLeft: `3px solid ${structure.primaryColor}` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    );
  };

  const renderProjects = () => {
    if (!data.projects?.length) return null;
    
    return (
      <section className="mb-4">
        <h2 style={{ color: structure.primaryColor }} className="text-lg font-semibold mb-2 pb-1 border-b border-gray-200">
          Projects
        </h2>
        <div className="space-y-3">
          {data.projects.map((project, index) => (
            <div key={index} className="text-sm">
              <div className="font-medium">
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
    );
  };

  const renderCertifications = () => {
    if (!data.certifications?.length) return null;
    
    return (
      <section className="mb-4">
        <h2 style={{ color: structure.primaryColor }} className="text-lg font-semibold mb-2 pb-1 border-b border-gray-200">
          Certifications
        </h2>
        <div className="space-y-2">
          {data.certifications.map((cert, index) => (
            <div key={index} className="text-sm">
              <div className="font-medium">{cert.name}</div>
              <div className="flex justify-between">
                <div>{cert.issuer}</div>
                <div className="text-gray-600">{cert.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSections = () => {
    // Check if template has custom sections order
    const sections = structure.sections || [
      'header',
      'summary',
      'experience',
      'education',
      'skills',
      'projects',
      'certifications'
    ];

    return sections.map((section) => {
      switch (section) {
        case 'header':
          return renderHeader();
        case 'summary':
          return renderSummary();
        case 'experience':
          return renderExperience();
        case 'education':
          return renderEducation();
        case 'skills':
          return renderSkills();
        case 'projects':
          return renderProjects();
        case 'certifications':
          return renderCertifications();
        default:
          return null;
      }
    });
  };

  return (
    <BaseTemplate {...props}>
      <div className="flex flex-col h-full">
        {renderSections()}
      </div>
    </BaseTemplate>
  );
};

export default ProfessionalTemplate; 