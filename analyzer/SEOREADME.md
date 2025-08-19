# SEO Analysis Module

## Overview

The SEO Analysis module provides comprehensive SEO optimization recommendations and duplicate content detection for your scraped websites. It analyzes individual pages for SEO best practices and compares pages across sites to identify duplicate content risks and uniqueness opportunities.

## Features

### ✅ Individual Page Analysis
- **Title Tag Optimization**: Length, keyword presence, uniqueness
- **Meta Description Analysis**: Length, call-to-action, keyword optimization
- **Heading Structure**: H1-H3 hierarchy and keyword distribution
- **Content Quality**: Word count, keyword density, readability, uniqueness
- **Technical SEO**: Meta tags, structured data, performance indicators
- **Keyword Optimization**: Primary keyword placement and semantic analysis

### ⚖️ Cross-Site Comparison
- **Duplicate Content Detection**: Risk scoring and factor identification
- **Keyword Cannibalization**: Conflicting keyword strategies
- **Uniqueness Gap Analysis**: Content differentiation opportunities
- **Structural Similarity**: Layout and element comparison

### 📋 Actionable Recommendations
- **Priority-Based Actions**: Critical, High, Medium, Low priority items
- **Specific Instructions**: Detailed steps for each optimization
- **Implementation Roadmap**: Phased approach with timelines
- **Target Completion Dates**: Automatic scheduling based on priority

## Usage

### Quick Start
```bash
# Run SEO analysis on existing scraped data
npm run seo

# Run full pipeline including SEO
npm run analyze-all

# SEO analysis only with final report
npm run analyze-seo
```

### Advanced Usage
```bash
# Custom memory allocation for large datasets
node --max-old-space-size=16384 ./analyzers/seo_analysis_runner.js

# Clean SEO reports only
npm run clean-seo
```

## Output Files

### Directory Structure
```
reports/seo_analysis/
├── SEO_ACTION_PLAN.txt          # Human-readable action plan
├── SEO_ACTION_ITEMS.csv         # Trackable action items spreadsheet
├── seo_master_summary.json      # Complete analysis summary
├── page_reports/                # Individual page SEO reports
│   ├── site1_page_001_seo.json
│   ├── site1_page_002_seo.json
│   └── ...
└── comparison_reports/          # Site-to-site comparisons
    ├── site1_vs_site2_seo_comparison.json
    └── ...
```

### Key Output Files

#### 📋 SEO_ACTION_PLAN.txt
Human-readable action plan with:
- Executive summary of critical issues
- Phased implementation roadmap
- Top duplicate content risks
- Site-specific priorities
- Category-based action lists

#### 📊 SEO_ACTION_ITEMS.csv
Spreadsheet format for project management:
- Priority level and category
- Specific action descriptions
- Impact assessment
- Target completion dates
- Page/site identification

#### 📈 seo_master_summary.json
Complete analysis data including:
- Overall statistics and metrics
- All actionable items with details
- Site-specific summaries
- Duplicate content risk analysis
- Implementation roadmap

## Understanding the Results

### SEO Scores
- **90-100%**: Excellent SEO optimization
- **70-89%**: Good, minor improvements needed
- **50-69%**: Moderate, significant optimization needed
- **30-49%**: Poor, major improvements required
- **0-29%**: Critical, immediate attention needed

### Duplicate Content Risk Levels
- **CRITICAL (80%+)**: Immediate action required - likely duplicate content
- **HIGH (60-79%)**: High risk - significant similarity detected
- **MEDIUM (40-59%)**: Moderate risk - some similarity issues
- **LOW (<40%)**: Low risk - acceptable differences

### Priority Levels
- **CRITICAL**: Fix within 1-3 days (SEO violations, duplicate content)
- **HIGH**: Fix within 1 week (title tags, meta descriptions)
- **MEDIUM**: Fix within 2 weeks (content improvements)
- **LOW**: Fix within 1 month (minor optimizations)

## Action Categories

### 🚨 Critical Actions
1. **Duplicate Content**: Remove or significantly differentiate similar content
2. **Missing Title Tags**: Add unique, descriptive titles (30-60 chars)
3. **Missing Meta Descriptions**: Add compelling descriptions (120-160 chars)

### ⚡ High Priority Actions
1. **Title Tag Optimization**: Improve existing titles for uniqueness and keywords
2. **Meta Description Enhancement**: Add calls-to-action and unique value propositions
3. **Content Uniqueness**: Add specific, distinguishing information
4. **Keyword Cannibalization**: Differentiate keyword strategies between pages

### 📈 Medium Priority Actions
1. **Content Quality**: Expand thin content, improve readability
2. **Heading Structure**: Optimize H1-H3 hierarchy and keyword placement
3. **Technical SEO**: Add structured data, fix meta tag issues
4. **Content Gaps**: Add missing content sections and information

## Common Issues and Solutions

### Issue: High Duplicate Content Risk
**Solution**: 
- Rewrite titles and meta descriptions to be unique
- Add page-specific content sections
- Include unique details (contact info, services, testimonials)
- Differentiate primary keywords between pages

### Issue: Poor SEO Scores
**Solution**:
- Expand content to minimum 300 words
- Add descriptive title tags with target keywords
- Include compelling meta descriptions with calls-to-action
- Improve heading structure (H1 → H2 → H3 hierarchy)

### Issue: Keyword Cannibalization
**Solution**:
- Assign unique primary keywords to each page
- Focus each page on different aspects of the business
- Use semantic variations instead of exact keyword repeats
- Create content silos for different topics

## Integration with Existing Framework

The SEO analyzer integrates seamlessly with your existing analysis pipeline:

1. **Data Source**: Uses existing scraped content and technical data
2. **Output Format**: Follows same JSON structure as other analyzers
3. **Report Integration**: Feeds into final report generation
4. **Memory Optimization**: Uses same optimization patterns as content analyzer

## Best Practices

### For Individual Pages
1. **Title Tags**: 30-60 characters, unique, keyword-focused
2. **Meta Descriptions**: 120-160 characters, include call-to-action
3. **Content Length**: Minimum 300 words, ideally 500+
4. **Keyword Density**: 1-3% for primary keywords, avoid stuffing
5. **Headings**: Clear H1-H3 hierarchy with relevant keywords

### For Cross-Site Comparisons
1. **Content Differentiation**: Each page should have unique value proposition
2. **Keyword Strategy**: Avoid targeting identical keywords across sites
3. **Structural Variation**: Use different layouts and content organization
4. **Local Information**: Include location-specific details where applicable

## Troubleshooting

### Memory Issues
```bash
# Increase Node.js memory limit
node --max-old-space-size=16384 ./analyzers/seo_analysis_runner.js
```

### No Results Generated
- Ensure scraped data exists in `./scraped_sites/`
- Check that content.json and technical.json files are present
- Verify folder naming follows `001_pagename` format

### Incomplete Analysis
- Check console output for specific error messages
- Ensure all required dependencies are installed
- Verify file permissions for output directory

## Future Enhancements

Planned improvements include:
- **Image SEO Analysis**: Alt tags, file names, compression
- **Page Speed Metrics**: Core Web Vitals assessment
- **Mobile Optimization**: Mobile-first indexing readiness
- **Schema Markup**: Structured data recommendations
- **Internal Linking**: Link structure and anchor text analysis