import { PrismaClient } from '@prisma/client';

// Use string URLs instead of trying to import image files
const creativeThumbnail = '/templates/thumbnails/creative.jpg';
const modernThumbnail = '/templates/thumbnails/modern.jpg';
const professionalThumbnail = '/templates/thumbnails/professional.jpg';
const executiveThumbnail = '/templates/thumbnails/executive.jpg';

const prisma = new PrismaClient();

// Define a simpler type structure - just for documentation
interface TemplateCategory {
  [templateName: string]: string;
}

// No more problematic interface
type CategoryMap = Record<string, TemplateCategory | string>;

async function updateThumbnails() {
  console.log('Starting update of template thumbnails...');

  // Get all templates
  const templates = await prisma.template.findMany();
  
  // Define thumbnail URLs for each template category with more distinctive visuals
  const categoryThumbnails: CategoryMap = {
    'professional': {
      'Modern Professional': professionalThumbnail,
      'Executive': executiveThumbnail,
      'default': professionalThumbnail
      // Add more professional templates as needed
    },
    'creative': {
      'Creative Designer': creativeThumbnail,
      'default': creativeThumbnail
      // Add more creative templates as needed
    },
    'modern': {
      // Add specific modern templates as needed
      'default': modernThumbnail
    },
    // Add more categories as needed
    'default': modernThumbnail // Global default
  };
  
  // Update each template with a specific thumbnail based on its name and category
  for (const template of templates) {
    const category = template.category.toLowerCase();
    const templateName = template.name;
    
    // Find the most specific thumbnail available
    let thumbnailUrl: string;
    
    if (
      category in categoryThumbnails && 
      typeof categoryThumbnails[category] === 'object' &&
      templateName in (categoryThumbnails[category] as TemplateCategory)
    ) {
      // Use template-specific thumbnail if available
      thumbnailUrl = (categoryThumbnails[category] as TemplateCategory)[templateName];
    } else if (
      category in categoryThumbnails && 
      typeof categoryThumbnails[category] === 'object' &&
      'default' in (categoryThumbnails[category] as TemplateCategory)
    ) {
      // Use category default thumbnail
      thumbnailUrl = (categoryThumbnails[category] as TemplateCategory)['default'] || categoryThumbnails['default'] as string;
    } else {
      // Use global default thumbnail
      thumbnailUrl = categoryThumbnails['default'] as string;
    }
    
    // Update the template in the database
    await prisma.template.update({
      where: { id: template.id },
      data: { thumbnail: thumbnailUrl }
    });
    
    console.log(`Updated "${template.name}" (${template.category}) with thumbnail: ${thumbnailUrl}`);
  }
  
  console.log('Template thumbnails updated successfully!');
}

updateThumbnails()
  .catch(e => {
    console.error('Error updating thumbnails:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 