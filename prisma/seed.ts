// eslint-disable-next-line
// @ts-ignore
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create templates
  const templates = await createTemplates();
  
  // Create users with resumes
  const users = await createUsers();
  
  // Create resumes for the first user
  await createResumeExamples(users[0].id, templates[0].id);
  
  // Update template thumbnails to use placeholder images
  await prisma.template.updateMany({
    where: {
      thumbnail: {
        contains: 'example.com'
      }
    },
    data: {
      thumbnail: 'https://via.placeholder.com/320x160/0078d4/FFFFFF?text=Template'
    }
  });

  // Update specific templates with better placeholders
  const updatedTemplates = await prisma.template.findMany();
  
  for (const template of updatedTemplates) {
    let placeholderUrl = '';
    
    switch (template.category.toLowerCase()) {
      case 'creative':
        placeholderUrl = 'https://via.placeholder.com/320x160/ff4081/FFFFFF?text=Creative';
        break;
      case 'professional':
        placeholderUrl = 'https://via.placeholder.com/320x160/2c3e50/FFFFFF?text=Professional';
        break;
      case 'modern':
        placeholderUrl = 'https://via.placeholder.com/320x160/0078d4/FFFFFF?text=Modern';
        break;
      default:
        placeholderUrl = 'https://via.placeholder.com/320x160/333333/FFFFFF?text=Template';
    }
    
    await prisma.template.update({
      where: { id: template.id },
      data: { 
        thumbnail: placeholderUrl
      }
    });
    
    console.log(`Updated template ${template.name} with placeholder thumbnail`);
  }
  
  console.log('Template thumbnails updated successfully');

  console.log('Seed completed successfully!');
}

async function createTemplates() {
  console.log('Creating resume templates...');
  
  // Delete existing templates
  await prisma.template.deleteMany({});
  
  // Create templates
  const templates = await Promise.all([
    prisma.template.create({
      data: {
        name: 'Modern Professional',
        description: 'Clean, professional template with a modern touch.',
        category: 'Professional',
        thumbnail: 'https://example.com/templates/modern-professional.jpg',
        isDefault: true,
        isPremium: false,
        config: {
          primaryColor: '#0078d4',
          secondaryColor: '#505050',
          fontFamily: 'Roboto, sans-serif',
          fontSize: 12,
          lineHeight: 1.5,
          sections: ['contactInfo', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'],
          layout: 'standard',
        },
        structure: {
          header: {
            type: 'header',
            elements: ['name', 'title', 'contact']
          },
          body: {
            type: 'columns',
            columns: [
              {
                width: 0.7,
                sections: ['summary', 'experience', 'education', 'projects']
              },
              {
                width: 0.3,
                sections: ['skills', 'certifications', 'languages']
              }
            ]
          }
        }
      },
    }),
    prisma.template.create({
      data: {
        name: 'Creative Designer',
        description: 'Unique template for creative professionals.',
        category: 'Creative',
        thumbnail: 'https://example.com/templates/creative-designer.jpg',
        isDefault: false,
        isPremium: true,
        config: {
          primaryColor: '#ff4081',
          secondaryColor: '#333333',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 12,
          lineHeight: 1.6,
          sections: ['contactInfo', 'summary', 'projects', 'experience', 'skills', 'education', 'languages'],
          layout: 'creative',
        },
        structure: {
          header: {
            type: 'sidebar',
            width: 0.3,
            elements: ['name', 'photo', 'contact', 'skills']
          },
          body: {
            type: 'main',
            width: 0.7,
            sections: ['summary', 'experience', 'education', 'projects', 'languages']
          }
        }
      },
    }),
    prisma.template.create({
      data: {
        name: 'Executive',
        description: 'Sophisticated template for executives and senior managers.',
        category: 'Professional',
        thumbnail: 'https://example.com/templates/executive.jpg',
        isDefault: false,
        isPremium: true,
        config: {
          primaryColor: '#2c3e50',
          secondaryColor: '#7f8c8d',
          fontFamily: 'Libre Baskerville, serif',
          fontSize: 12,
          lineHeight: 1.5,
          sections: ['contactInfo', 'summary', 'experience', 'education', 'skills', 'certifications', 'languages'],
          layout: 'classic',
        },
        structure: {
          header: {
            type: 'header',
            elements: ['name', 'title', 'contact']
          },
          body: {
            type: 'sections',
            sections: ['summary', 'experience', 'education', 'skills', 'certifications', 'languages']
          }
        }
      },
    }),
  ]);
  
  console.log(`Created ${templates.length} templates`);
  return templates;
}

async function createUsers() {
  console.log('Creating users...');
  
  // Delete existing users
  await prisma.user.deleteMany({});
  
  // Create sample users with a pre-hashed password for "password123"
  const hashedPassword = '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm'; // "password123"
  
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        password: hashedPassword,
        name: 'John Doe',
        jobTitle: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        phone: '+1 (555) 123-4567',
        linkedinUrl: 'https://linkedin.com/in/johndoe',
        websiteUrl: 'https://johndoe.dev',
        profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        password: hashedPassword,
        name: 'Jane Smith',
        jobTitle: 'Product Manager',
        location: 'New York, NY',
        phone: '+1 (555) 987-6543',
        linkedinUrl: 'https://linkedin.com/in/janesmith',
        profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
    }),
  ]);
  
  console.log(`Created ${users.length} users`);
  return users;
}

async function createResumeExamples(userId: string, templateId: string) {
  console.log('Creating resume examples...');
  
  // Software Engineer Resume
  const softwareEngineerResume = await prisma.resume.create({
    data: {
      title: 'Software Engineer Resume',
      slug: 'software-engineer-resume-123456',
      userId,
      templateId,
      isPublic: true,
      version: 1,
      atsScore: 85,
      contactInfo: {
        create: {
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          linkedinUrl: 'https://linkedin.com/in/johndoe',
          websiteUrl: 'https://johndoe.dev',
          githubUrl: 'https://github.com/johndoe',
        },
      },
      summary: {
        create: {
          content: 'Experienced software engineer with 8+ years of experience specializing in backend development with Node.js, Python, and AWS. Passionate about building scalable, efficient applications and mentoring junior developers. Strong focus on code quality and testing.',
        },
      },
      experiences: {
        create: [
          {
            title: 'Senior Software Engineer',
            company: 'Tech Innovations Inc.',
            location: 'San Francisco, CA',
            startDate: new Date('2020-06-01'),
            isCurrentPosition: true,
            description: 'Lead backend developer for a microservices architecture supporting millions of users.',
            achievements: [
              'Redesigned authentication system reducing login times by 40%',
              'Led migration from monolith to microservices architecture',
              'Mentored 5 junior developers who were later promoted',
              'Reduced cloud infrastructure costs by 30% through optimization',
            ],
            order: 0,
          },
          {
            title: 'Software Engineer',
            company: 'DataSoft Systems',
            location: 'Austin, TX',
            startDate: new Date('2016-03-01'),
            endDate: new Date('2020-05-15'),
            isCurrentPosition: false,
            description: 'Full-stack developer for an enterprise data management platform.',
            achievements: [
              'Implemented real-time data processing pipeline using Kafka',
              'Developed dashboard reducing reporting time from days to minutes',
              'Integrated machine learning models for data anomaly detection',
            ],
            order: 1,
          },
        ],
      },
      educations: {
        create: [
          {
            institution: 'University of California, Berkeley',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            location: 'Berkeley, CA',
            startDate: new Date('2012-08-01'),
            endDate: new Date('2016-05-15'),
            isCurrentlyStudying: false,
            gpa: '3.85',
            achievements: [
              'Dean\'s List all semesters',
              'Senior project: Distributed database system',
              'Teaching Assistant for Data Structures course',
            ],
            order: 0,
          },
        ],
      },
      skills: {
        create: [
          {
            category: 'Programming Languages',
            skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL', 'Go'],
            order: 0,
          },
          {
            category: 'Frameworks & Libraries',
            skills: ['Node.js', 'Express', 'React', 'Django', 'Flask', 'Spring Boot'],
            order: 1,
          },
          {
            category: 'Tools & Technologies',
            skills: ['AWS', 'Docker', 'Kubernetes', 'Redis', 'MongoDB', 'PostgreSQL', 'Git', 'CI/CD'],
            order: 2,
          },
        ],
      },
      projects: {
        create: [
          {
            title: 'Distributed Task Scheduler',
            description: 'Open-source distributed task scheduling system built with Node.js and Redis. Supports recurring tasks, task prioritization, and failure recovery.',
            url: 'https://github.com/johndoe/task-scheduler',
            startDate: new Date('2021-01-01'),
            endDate: new Date('2021-06-30'),
            isOngoing: false,
            technologies: ['Node.js', 'Redis', 'Docker', 'Express', 'React'],
            order: 0,
          },
          {
            title: 'Personal Website & Blog',
            description: 'My personal website and technical blog built with Next.js and MDX.',
            url: 'https://johndoe.dev',
            startDate: new Date('2020-08-01'),
            isOngoing: true,
            technologies: ['Next.js', 'React', 'Tailwind CSS', 'MDX', 'Vercel'],
            order: 1,
          },
        ],
      },
      certifications: {
        create: [
          {
            name: 'AWS Certified Solutions Architect - Professional',
            issuer: 'Amazon Web Services',
            issueDate: new Date('2021-09-15'),
            expiryDate: new Date('2024-09-15'),
            credentialId: 'AWS-ASA-P-12345',
            credentialUrl: 'https://aws.amazon.com/verification',
            order: 0,
          },
          {
            name: 'Professional Scrum Master I',
            issuer: 'Scrum.org',
            issueDate: new Date('2019-05-20'),
            credentialId: 'PSM-I-87654',
            credentialUrl: 'https://www.scrum.org/certificates',
            order: 1,
          },
        ],
      },
      languages: {
        create: [
          {
            name: 'English',
            proficiency: 'Native',
            order: 0,
          },
          {
            name: 'Spanish',
            proficiency: 'Intermediate',
            order: 1,
          },
        ],
      },
      customSections: {
        create: [
          {
            title: 'Publications',
            content: '* "Scaling Microservices at Tech Innovations" - Medium, 2022\n* "Optimizing Node.js Applications for Performance" - DZone, 2021',
            order: 0,
          },
        ],
      },
    },
  });
  
  // Data Analyst Resume
  const dataAnalystResume = await prisma.resume.create({
    data: {
      title: 'Data Analyst Resume',
      slug: 'data-analyst-resume-654321',
      userId,
      templateId,
      isPublic: false,
      version: 2,
      atsScore: 78,
      contactInfo: {
        create: {
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          linkedinUrl: 'https://linkedin.com/in/johndoe',
        },
      },
      summary: {
        create: {
          content: 'Data analyst with expertise in SQL, Python, and visualization tools. Experienced in translating business questions into analytical frameworks and communicating insights to stakeholders. Passionate about finding patterns in complex datasets.',
        },
      },
      experiences: {
        create: [
          {
            title: 'Data Analyst',
            company: 'Retail Analytics Co.',
            location: 'San Francisco, CA',
            startDate: new Date('2019-02-01'),
            isCurrentPosition: true,
            description: 'Analyze customer behavior and sales trends for retail clients.',
            achievements: [
              'Developed dashboard that increased client retention by 25%',
              'Created predictive models for inventory management',
              'Automated reporting process saving 15 hours per week',
            ],
            order: 0,
          },
          {
            title: 'Junior Data Analyst',
            company: 'Market Research Inc.',
            location: 'Oakland, CA',
            startDate: new Date('2017-07-01'),
            endDate: new Date('2019-01-15'),
            isCurrentPosition: false,
            description: 'Supported market research projects with data collection and analysis.',
            achievements: [
              'Conducted A/B testing for e-commerce clients',
              'Built ETL processes for marketing data',
              'Created visualizations for executive presentations',
            ],
            order: 1,
          },
        ],
      },
      educations: {
        create: [
          {
            institution: 'Stanford University',
            degree: 'Master of Science',
            fieldOfStudy: 'Statistics',
            location: 'Stanford, CA',
            startDate: new Date('2015-08-01'),
            endDate: new Date('2017-05-30'),
            isCurrentlyStudying: false,
            gpa: '3.9',
            achievements: [],
            order: 0,
          },
          {
            institution: 'University of California, Los Angeles',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Mathematics',
            location: 'Los Angeles, CA',
            startDate: new Date('2011-09-01'),
            endDate: new Date('2015-06-15'),
            isCurrentlyStudying: false,
            gpa: '3.7',
            achievements: [],
            order: 1,
          },
        ],
      },
      skills: {
        create: [
          {
            category: 'Data Analysis',
            skills: ['SQL', 'Python', 'R', 'Excel', 'Statistical Analysis', 'Data Visualization'],
            order: 0,
          },
          {
            category: 'Tools',
            skills: ['Tableau', 'Power BI', 'Pandas', 'NumPy', 'Scikit-learn', 'Jupyter'],
            order: 1,
          },
        ],
      },
    },
  });
  
  // Create a sample job description
  const jobDescription = await prisma.jobDescription.create({
    data: {
      title: 'Senior Software Engineer',
      company: 'Tech Giants Inc.',
      description: `We are looking for a Senior Software Engineer to join our team. 

Requirements:
- 5+ years of experience with Node.js and TypeScript
- Experience with AWS and serverless architecture
- Strong understanding of database design and optimization
- Experience with CI/CD pipelines
- Background in agile development practices

Responsibilities:
- Design and implement backend services
- Collaborate with frontend and product teams
- Mentor junior developers
- Participate in code reviews
- Continuously improve system performance`,
      url: 'https://example.com/jobs/senior-software-engineer',
      userId,
    },
  });
  
  // Create an analysis result
  await prisma.analysisResult.create({
    data: {
      resumeId: softwareEngineerResume.id,
      jobDescriptionId: jobDescription.id,
      userId,
      score: 85,
      keywordMatch: 75,
      missingKeywords: ['Serverless Architecture', 'Database Optimization'],
      suggestions: [
        'Add more details about your AWS experience, particularly with serverless',
        'Highlight your experience with database optimization',
        'Include more examples of mentoring junior developers'
      ],
      strengths: [
        'Strong technical skills in required technologies',
        'Demonstrated leadership experience',
        'Clear achievement metrics'
      ],
      improvements: [
        'Add more specific details about AWS services used',
        'Mention database optimization projects'
      ],
      rawAnalysis: {
        matchedSkills: ['Node.js', 'TypeScript', 'AWS', 'CI/CD'],
        keywordMatches: {
          high: ['Node.js', 'TypeScript', 'AWS'],
          medium: ['CI/CD', 'backend services'],
          low: ['agile development']
        },
        overallFeedback: 'Your resume is well-matched to this position with strong technical alignment. Consider adding more specific achievements related to database optimization and mentoring.'
      },
      createdAt: new Date(),
    },
  });
  
  console.log(`Created ${await prisma.resume.count()} resumes`);
  console.log(`Created ${await prisma.jobDescription.count()} job descriptions`);
  console.log(`Created ${await prisma.analysisResult.count()} analysis results`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 