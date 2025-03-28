import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume Templates',
  description: 'Choose from a variety of professional resume templates to customize your resume.',
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 