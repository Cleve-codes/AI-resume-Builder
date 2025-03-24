/*
  Warnings:

  - You are about to drop the column `config` on the `templates` table. All the data in the column will be lost.
  - You are about to drop the column `isDefault` on the `templates` table. All the data in the column will be lost.
  - Made the column `description` on table `templates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thumbnail` on table `templates` required. This step will fail if there are existing NULL values in that column.

*/

-- First fix nullable columns
UPDATE "templates" SET "description" = 'Default template' WHERE "description" IS NULL;
UPDATE "templates" SET "thumbnail" = '/templates/thumbnails/default.png' WHERE "thumbnail" IS NULL;

-- Add new column isActive
ALTER TABLE "templates" ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true;

-- Add structure column with a default value derived from config
ALTER TABLE "templates" ADD COLUMN "structure" JSONB NOT NULL DEFAULT '{"fontFamily": "sans-serif", "primaryColor": "#333333", "secondaryColor": "#555555", "sections": ["summary", "experience", "education", "skills"], "layout": "standard"}';

-- Update structure based on existing config data
UPDATE "templates" SET "structure" = "config";

-- Complete the rest of the changes
ALTER TABLE "templates" 
DROP COLUMN "config",
DROP COLUMN "isDefault",
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "category" SET DEFAULT 'professional',
ALTER COLUMN "thumbnail" SET NOT NULL;

-- Remove the default value from structure now that we've populated it
ALTER TABLE "templates" ALTER COLUMN "structure" DROP DEFAULT;
