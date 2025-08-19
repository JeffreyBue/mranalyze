# 🔍 Site Comparison Engine

## 🎯 Purpose

The Site Comparison Engine is a specialized tool designed for analyzing and comparing name directory pages across multiple domains. Built specifically for businesses managing large-scale people search directories, this engine helps identify and measure content uniqueness across potentially thousands of similar pages. The primary goal is to ensure each domain maintains a **Unique Content Footprint** while avoiding search engine penalties for duplicate content. 

By analyzing **Differentiated UX/UI and Feature Sets**, the engine reveals how effectively each site distinguishes itself through design, user experience, and functionality. It evaluates **Search Intent Segmentation** to ensure each domain targets distinct user needs and search queries. The analysis helps achieve **Minimal Cross-Domain Cannibalization** by identifying where domains compete against each other in search results. Finally, the engine provides **Content Audit-Ready** reports with actionable insights, making it easy to identify which pages need rewriting, which templates require differentiation, and where unique value propositions can be strengthened. Whether you're managing 3 domains or 30, this tool provides the data needed to maintain distinct, valuable, and search-engine-friendly directory sites.

## 📋 System Requirements

- **Node.js**: v16.0.0 or higher
- **Memory**: 8GB RAM minimum (16GB recommended for large-scale analysis)
- **Storage**: 2GB free space for scraped data and analysis cache
- **OS**: Windows, macOS, or Linux
- **Browser**: Chrome/Chromium (automatically installed by Puppeteer)
- **Network**: Stable internet connection for web scraping

## 🚀 Quick Start

```bash
# Clone the repository
git clone [your-repo-url]
cd site-comparison-engine

# Install dependencies
npm install

# Run Docker Containers
docker compose up --build

# Navigate to browser
http://localhost:8787

--

# Run the complete analysis pipeline
# - Defaulted routes folder ./urls Defaulted destination folder ./analyze_{date(20250707)}
npm run SAR 

# Scrape from a different folder and place in different folder
npm run SAR -- ./sites_urls --dest=scraped_20250708
```

## 📋 Overview

The Site Comparison Engine analyzes websites across four key dimensions to provide comprehensive similarity detection:

### 🌐 **1. Scraping** - Capture website data
Visits each URL and captures content, visual elements, and technical metadata across desktop, tablet, and mobile viewports.

### 🎨 **2. Visual Analysis** - Compare design & layout
Analyzes colors, typography, layouts, responsive design patterns, and visual hierarchy to detect template usage.

### 📝 **3. Content Analysis** - Examine text similarity
Uses advanced NLP algorithms to compare text content, topics, readability, and semantic meaning.

### ⚙️ **4. Technical Analysis** - Inspect code structure
Examines HTML structure, frameworks, meta tags, and technical implementation patterns.

### 🔍 **5. SEO Analysis** - Optimize for search engines
Recommendations including duplicate content detection, keyword cannibalization analysis, and actionable improvement plans with priority-based roadmaps.

### 📊 **6. Final Report** - Comprehensive insights
Combines all analyses into actionable reports showing similarity scores, patterns, and recommendations.

---

## 🛠️ Detailed Usage Guide

### 📥 Step 1: Web Scraping

Capture website data with anti-detection features and responsive viewport support.

```bash
# Scrape all .txt files in ./urls directory
npm run scrape-all

# Scrape a specific URL file
npm run scrape-file ./urls/myurls.txt

# Scrape with custom directory
npm run scrape-all ./my-project-urls
```

**Features:**
- 🛡️ Cloudflare bypass with Puppeteer Stealth
- 📱 Multi-viewport capture (desktop, tablet, mobile)
- 📸 Full-page screenshots for each viewport
- 🔄 Automatic retry with exponential backoff
- ⏱️ Configurable delays between requests

### 🎨 Step 2: Visual Analysis

Compare visual design elements across sites.

```bash
# Standard visual analysis (recommended)
npm run visual

# Light version without screenshots (faster)
npm run visual-light

# Legacy version
npm run visual-light
```

**Analyzes:**
- 🎨 Color palettes and usage
- 📝 Typography (fonts, sizes, weights)
- 📐 Layout structures and grids
- 📱 Responsive design patterns
- 🏗️ Design system detection (Bootstrap, Tailwind, etc.)
- 👁️ Visual hierarchy and emphasis
- 📸 Screenshot similarity across viewports

### 📝 Step 3: Content Analysis

Deep text analysis using NLP techniques.

```bash
# Standard content analysis (balanced)
npm run content

# Fast mode (larger batches, less detail)
npm run content-fast

# Deep analysis (all metrics, slower)
npm run content-deep

# Light version (memory-safe)
npm run content-light
```

**Parameters:**
- `--batch=N` - Pages to process at once (default: 10)
- `--deep` - Enable expensive metrics
- `--max-tokens=N` - Max tokens per document (default: 5000)
- `--sample-size=N` - Text sample size (default: 10000)

**Analyzes:**
- 📊 Jaccard similarity (token overlap)
- 🔢 Cosine similarity (document vectors)
- 🔍 Content fingerprinting (rolling hashes)
- 🧠 Semantic similarity (meaning comparison)
- 📚 Topic modeling and keywords
- 📖 Readability metrics
- 💡 Information density

### ⚙️ Step 4: Technical Analysis

Examine code structure and implementation.

```bash
# Run technical analysis
npm run technical

# With custom batch size
npm run technical -- --batch=5
```

**Analyzes:**
- 🏗️ HTML structure similarity
- 🏷️ Meta tag comparison
- 📋 Schema markup detection
- 🛠️ Framework detection (React, Vue, jQuery, etc.)
- 📦 Resource analysis (CSS, JS files)
- ⚡ Performance patterns
- 🔍 SEO technical elements

### 📊 Step 5: Generate Reports

Create comprehensive comparison reports.

```bash
# Generate final reports
npm run final
```

**Output includes:**
- 📄 Individual comparison reports (JSON & readable text)
- 📊 Master summary with top similarities
- 🎯 Actionable insights and recommendations
- 📈 Dimensional breakdowns with scores

### 🚀 Full Pipeline

Run the complete scrape-analyze-report pipeline:

```bash
# Complete pipeline (recommended)
npm run SAR ./urls

# Alternative command
npm run scrape-analysis-report ./urls
```

---

## 📊 Understanding the Metrics

### Content Analysis Metrics

#### **Jaccard Similarity** (0-1 score)
- **What it measures**: Word overlap between documents
- **High score (>0.8)**: Very similar vocabulary and topics
- **Use case**: Detecting copied or templated content
- **Example**: Score of 0.75 means 75% of unique words are shared

#### **Cosine Similarity** (0-1 score)
- **What it measures**: Document similarity using word frequency vectors
- **High score (>0.85)**: Similar content structure and emphasis
- **Use case**: Finding semantically similar pages
- **Better than Jaccard**: Accounts for word frequency, not just presence

#### **Content Fingerprinting** (0-1 score)
- **What it measures**: Exact content matches using rolling hashes
- **High score (>0.7)**: Significant verbatim content copying
- **Use case**: Detecting plagiarism or content reuse
- **Advantage**: Very fast, memory efficient

#### **Semantic Similarity** (0-1 score)
- **What it measures**: Meaning and context similarity
- **Components**: Headings, paragraphs, navigation structure
- **High score (>0.8)**: Similar information architecture
- **Use case**: Detecting conceptually similar pages

### Visual Analysis Metrics

#### **Color Similarity** (0-1 score)
- **What it measures**: RGB color distance between elements
- **Components**: Background colors, text colors, accent colors
- **High score (>0.9)**: Nearly identical color schemes
- **Indicates**: Same design system or template

#### **Typography Similarity** (0-1 score)
- **What it measures**: Font families, sizes, and weights
- **High score (>0.85)**: Same typographic system
- **Components**: 
  - Font family matches (exact or category)
  - Font size ratios
  - Font weight patterns

#### **Layout Structure** (0-1 score)
- **What it measures**: Page structure elements
- **Components**: Header, navigation, sidebar, footer presence
- **High score (>0.9)**: Identical page templates
- **Additional**: Container dimensions and aspect ratios

#### **Visual Hierarchy** (0-1 score)
- **What it measures**: How information is emphasized
- **Components**:
  - Size ratios (h1 vs body text)
  - Contrast usage
  - Emphasis methods (bold, color, spacing)
- **High score (>0.8)**: Similar design priorities

#### **Responsive Design** (0-1 score)
- **What it measures**: Consistency across viewports
- **Components**:
  - Layout adaptation strategies
  - Breakpoint consistency
  - Element visibility changes
- **High score (>0.85)**: Same responsive framework

### Technical Analysis Metrics

#### **HTML Structure** (0-1 score)
- **What it measures**: Document structure similarity
- **Components**:
  - Doctype compatibility
  - Language settings
  - Element complexity
- **High score (>0.9)**: Same HTML generation system

#### **Meta Tags** (0-1 score)
- **What it measures**: SEO and metadata similarity
- **Important tags**: viewport, robots, og:tags, twitter:cards
- **High score (>0.8)**: Same SEO strategy or CMS

#### **Framework Detection** (0-1 score)
- **What it measures**: JavaScript framework usage
- **Detects**: React, Vue, Angular, jQuery, Bootstrap
- **Weighted scoring**: Major frameworks weighted higher
- **High score (1.0)**: Exact same tech stack

#### **Schema Markup** (0-1 score)
- **What it measures**: Structured data implementation
- **Components**: Schema types, content similarity
- **High score (>0.9)**: Same data markup strategy
- **Important for**: SEO and rich snippets

---

## 📈 Interpreting Results

### Overall Similarity Classifications

- **🚨 IDENTICAL (90-100%)**: Likely duplicate sites or same template
- **⚠️ VERY SIMILAR (70-89%)**: Strong template/content overlap
- **📊 SIMILAR (50-69%)**: Moderate similarities, possible shared elements
- **✅ DIFFERENT (<50%)**: Sufficiently unique sites

### Red Flags to Watch For

1. **High Content + High Technical Scores**: Possible content theft
2. **High Visual + High Technical, Low Content**: Same template, different content
3. **High scores across all dimensions**: Duplicate or mirror sites
4. **Uneven scores**: Selective copying (e.g., design but not content)

### Best Practices

- Start with 2-3 test URLs to verify setup
- Use `--batch` parameter to balance speed vs memory
- Run visual analysis first (fastest) to test
- Keep scraped data for re-analysis without re-scraping
- Check `analysis_cache/` for detailed per-page results

---

## 🔧 Troubleshooting

### Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=8192"

# Or use light versions
npm run content-light
npm run visual-light
```

### Cloudflare Blocks
- Run scraper with `headless: false` to solve challenges manually
- Increase delays between requests
- Consider using residential proxies for large-scale analysis

### Missing Data
- Check `scraped_sites/` for successful captures
- Review `scraping_summary.json` for errors
- Some pages may be behind authentication

## 👨‍💻 Author

Jeffrey J. Bue

---

*Built with ❤️ using Puppeteer, Natural, and Sharp*