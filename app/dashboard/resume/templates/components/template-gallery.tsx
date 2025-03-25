"use client";

import React from 'react';
import { ResumeTemplate } from '@/types/resume';
import { TemplatePreview } from './template-preview';
import { TemplateGallery as SharedTemplateGallery } from '@/components/template-gallery';

interface TemplateGalleryProps {
  templates: ResumeTemplate[];
  isPremiumUser: boolean;
  onTemplateSelect?: (template: ResumeTemplate) => void;
  isSelectionMode?: boolean;
}

export function TemplateGallery({
  templates,
  isPremiumUser,
  onTemplateSelect,
  isSelectionMode = false
}: TemplateGalleryProps) {
  return (
    <SharedTemplateGallery
      templates={templates}
      isPremiumUser={isPremiumUser}
      onTemplateSelect={onTemplateSelect}
      isSelectionMode={isSelectionMode}
      cardStyle="detailed"
      previewComponent={TemplatePreview}
    />
  );
}