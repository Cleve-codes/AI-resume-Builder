import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to create a basic HTML template as a placeholder
function createHtmlPlaceholder(category: string, color: string) {
  // Determine the icons based on category
  let icon = '';
  let gradient = '';
  
  switch(category.toLowerCase()) {
    case 'professional':
      icon = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-3a2 2 0 0 0-2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3"></path><path d="M12 12V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-4"></path></svg>`;
      gradient = `linear-gradient(135deg, ${color} 0%, #34495e 100%)`;
      break;
    case 'creative':
      icon = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a7 7 0 0 1 12-5"></path><path d="M8 17h4"></path><path d="M9 12h6"></path><path d="M15 7h3a5 5 0 0 1 0 10h-3"></path><path d="m9 12-3-3 3-3"></path></svg>`;
      gradient = `linear-gradient(135deg, ${color} 0%, #e91e63 100%)`;
      break;
    case 'executive':
      icon = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>`;
      gradient = `linear-gradient(135deg, ${color} 0%, #2c3e50 100%)`;
      break;
    case 'modern':
      icon = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>`;
      gradient = `linear-gradient(135deg, ${color} 0%, #1565C0 100%)`;
      break;
    default:
      icon = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>`;
      gradient = `linear-gradient(135deg, ${color} 0%, #607D8B 100%)`;
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    html, body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
    body {
      background: ${gradient};
      color: white;
      font-family: Arial, sans-serif;
    }
    .content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .icon {
      opacity: 0.9;
      transform: scale(1);
      transition: transform 0.3s ease;
    }
    .decorator {
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
    }
    .decorator-1 {
      width: 100px;
      height: 100px;
      top: -20px;
      left: -20px;
    }
    .decorator-2 {
      width: 60px;
      height: 60px;
      bottom: 20px;
      right: 20px;
    }
  </style>
</head>
<body>
  <div class="decorator decorator-1"></div>
  <div class="decorator decorator-2"></div>
  <div class="content">
    <div class="icon">${icon}</div>
  </div>
</body>
</html>
`;
}

async function createThumbnails() {
  console.log('Creating thumbnail files...');
  
  // Ensure directory exists
  const thumbnailDir = path.join(process.cwd(), 'public', 'templates', 'thumbnails');
  if (!fs.existsSync(thumbnailDir)) {
    fs.mkdirSync(thumbnailDir, { recursive: true });
    console.log(`Created directory: ${thumbnailDir}`);
  }
  
  // Create thumbnails for each category
  const categories = [
    { name: 'Professional', color: '#2c3e50' },
    { name: 'Creative', color: '#ff4081' },
    { name: 'Executive', color: '#34495e' },
    { name: 'Modern', color: '#0078d4' }
  ];
  
  for (const category of categories) {
    const filePath = path.join(thumbnailDir, `${category.name.toLowerCase()}.html`);
    fs.writeFileSync(filePath, createHtmlPlaceholder(category.name, category.color));
    console.log(`Created thumbnail for ${category.name} at ${filePath}`);
  }
  
  // Update template records to point to the local HTML files
  const templates = await prisma.template.findMany();
  
  for (const template of templates) {
    let localPath = '';
    
    // Custom thumbnail mapping for specific templates
    if (template.name === 'Executive') {
      localPath = '/templates/thumbnails/executive.html';
    } else if (template.name === 'Creative Designer') {
      localPath = '/templates/thumbnails/creative.html';
    } else if (template.name === 'Modern Professional') {
      localPath = '/templates/thumbnails/professional.html';
    } else {
      // Default by category
      const category = template.category.toLowerCase();
      localPath = `/templates/thumbnails/${category}.html`;
    }
    
    await prisma.template.update({
      where: { id: template.id },
      data: { thumbnail: localPath }
    });
    
    console.log(`Updated template ${template.name} to use ${localPath}`);
  }
  
  console.log('All thumbnails created and database updated!');
}

createThumbnails()
  .catch(error => {
    console.error('Error creating thumbnails:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 