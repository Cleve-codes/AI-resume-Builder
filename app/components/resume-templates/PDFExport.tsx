"use client";

import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ResumeData, ResumeTemplate } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import ProfessionalTemplate from './ProfessionalTemplate';
import ModernTemplate from './ModernTemplate';

interface PDFExportProps {
  resumeData: ResumeData;
  template: ResumeTemplate;
  filename?: string;
}

export default function PDFExport({
  resumeData,
  template,
  filename = 'resume'
}: PDFExportProps) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [quality, setQuality] = useState(2); // Default quality (scale factor)
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [includeBackground, setIncludeBackground] = useState(true);
  
  // Format the filename - remove spaces and special characters
  const formatFilename = (name: string) => {
    return name.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  
  // Export the resume as a PDF
  const exportPDF = async () => {
    if (!resumeRef.current) return;
    
    setIsExporting(true);
    
    try {
      // Capture the resume as a canvas
      const canvas = await html2canvas(resumeRef.current, {
        scale: quality, // Higher scale = better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: includeBackground ? '#ffffff' : null,
        logging: false,
      });
      
      // A4 paper dimensions: 210mm × 297mm
      // Convert to points (1pt = 0.352778mm)
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Calculate dimensions to fit the A4 page
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Save the PDF
      pdf.save(`${formatFilename(filename)}.pdf`);
    } catch (error) {
      console.error('Error exporting resume to PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };
  
  // Export the resume as a PNG
  const exportPNG = async () => {
    if (!resumeRef.current) return;
    
    setIsExporting(true);
    
    try {
      // Capture the resume as a canvas
      const canvas = await html2canvas(resumeRef.current, {
        scale: quality, // Higher scale = better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: includeBackground ? '#ffffff' : null,
        logging: false,
      });
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.download = `${formatFilename(filename)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error exporting resume to PNG:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const renderTemplateComponent = () => {
    // Use the layout property to determine which template to render
    switch (template.structure.layout) {
      case 'split':
        return (
          <ModernTemplate
            data={resumeData}
            template={template}
            scale={1}
            isEditable={false}
          />
        );
      case 'standard':
      default:
        return (
          <ProfessionalTemplate
            data={resumeData}
            template={template}
            scale={1}
            isEditable={false}
          />
        );
    }
  };
  
  return (
    <div className="pdf-export">
      <div className="flex justify-end mb-6 gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowExportOptions(!showExportOptions)}
              >
                Export Options
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Configure export settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="default" 
                    size="sm"
                    disabled={isExporting}
                    className="flex items-center gap-2"
                  >
                    <ArrowDownIcon className="h-4 w-4" />
                    {isExporting ? 'Exporting...' : 'Export'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={exportPDF}>
                    Download as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={exportPNG}>
                    Download as PNG
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export your resume</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {showExportOptions && (
        <div className="mb-6 p-4 border rounded-md space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="quality">Export Quality</Label>
              <span className="text-sm text-gray-500">
                {quality === 1 ? 'Low' : quality === 2 ? 'Medium' : 'High'}
              </span>
            </div>
            <Slider 
              id="quality"
              min={1} 
              max={3} 
              step={1} 
              value={[quality]} 
              onValueChange={(value) => setQuality(value[0])}
            />
            <p className="text-xs text-gray-500">Higher quality may result in larger file sizes.</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="background" 
              checked={includeBackground} 
              onCheckedChange={setIncludeBackground} 
            />
            <Label htmlFor="background">Include Background</Label>
          </div>
        </div>
      )}
      
      <div ref={resumeRef} className="resume-container">
        {renderTemplateComponent()}
      </div>
    </div>
  );
} 