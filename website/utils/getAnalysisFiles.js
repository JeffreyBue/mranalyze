/**
 * Gets analysis files from specified directories for a report
 * Also retrieves all available report directories
 * @param {string} report - The report name/directory
 * @returns {Object} Object containing the retrieved file lists and report directories
 */

import fs from 'fs/promises';
import path from 'path';

const getAnalysisFiles = async (report) => {
  const result = {
    reports: [],
    cacheFiles: [],
    contentFiles: [],
    technicalFiles: [],
    visualFiles: [],
    comparison: [], // For compare_reports files
    page: []        // For page_reports files
  };
  
  const baseDir = path.join(process.cwd(), 'shared-data', 'completed_reports');
  
  try {
    // Get all report directories under /analysis
    const analysisEntries = await fs.readdir(baseDir, { withFileTypes: true });
    const dirEntries = analysisEntries.filter(entry => entry.isDirectory());
    
    // Get creation dates for each directory
    const dirWithDates = await Promise.all(
      dirEntries.map(async (dir) => {
        const dirPath = path.join(baseDir, dir.name);
        const stats = await fs.stat(dirPath);
        return {
          name: dir.name,
          createdAt: stats.mtimeMs || stats.birthtimeMs // fallback to mtime if birthtime is not available
        };
      })
    );
    
    // Sort directories by creation date (newest first)
    result.reports = dirWithDates
      .sort((a, b) => b.createdAt - a.createdAt)
      .map(dir => dir.name);
  } catch (err) {
    console.error('Error reading analysis directory:', err);
  }
  
  if (!report) return result;
  
  const cacheDir = path.join(baseDir, report, 'reports', 'analysis_cache');
  
  try {
    // Get files from main cache directory
    const cacheEntries = await fs.readdir(cacheDir, { withFileTypes: true });
    result.cacheFiles = cacheEntries
      .filter(entry => entry.isFile())
      .map(entry => entry.name);
    
    // Get files from subdirectories
    const subdirs = ['content', 'technical', 'visual'];
    for (const subdir of subdirs) {
      const subdirPath = path.join(cacheDir, subdir);
      try {
        const entries = await fs.readdir(subdirPath, { withFileTypes: true });
        result[`${subdir}Files`] = entries
          .filter(entry => entry.isFile())
          .map(entry => entry.name);
      } catch (err) {
        console.error(`Error reading ${subdir} directory:`, err);
      }
    }
    
    // Get files from compare_reports and page_reports directories
    const seoAnalysisDir = path.join(baseDir, report, 'reports', 'seo_analysis');
    
    // Get files from compare_reports directory
    try {
      const compareDir = path.join(seoAnalysisDir, 'comparison_reports');
      const compareEntries = await fs.readdir(compareDir, { withFileTypes: true });
      result.comparison = compareEntries
        .filter(entry => entry.isFile())
        .map(entry => entry.name);
    } catch (err) {
      console.error('Error reading comparison_reports directory:', err);
    }
    
    // Get files from page_reports directory
    try {
      const pageDir = path.join(seoAnalysisDir, 'page_reports');
      const pageEntries = await fs.readdir(pageDir, { withFileTypes: true });
      result.page = pageEntries
        .filter(entry => entry.isFile())
        .map(entry => entry.name);
    } catch (err) {
      console.error('Error reading page_reports directory:', err);
    }
  } catch (err) {
    console.error('Error reading analysis cache directory:', err);
  }
  
  return result;
}

export default getAnalysisFiles;