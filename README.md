# 🌐 MrAnalyze.com

**Comprehensive Website Route Comparison Analysis Platform**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-green.svg)
![Docker](https://img.shields.io/badge/docker-compose-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎯 Overview

MrAnalyze is a sophisticated web application designed for **comprehensive website route comparison analysis**. It provides multi-dimensional analysis across visual design, content similarity, technical implementation, and SEO optimization to help businesses identify duplicate content risks and maintain unique digital footprints across multiple domains.

**🎯 Perfect for:**
- **SEO Professionals** - Identifying duplicate content risks across multiple domains
- **Digital Agencies** - Ensuring client websites maintain unique digital footprints  
- **Content Managers** - Detecting template reuse and content cannibalization
- **Web Developers** - Analyzing technical implementation patterns across sites
- **Business Owners** - Maintaining competitive differentiation in search results

**💡 What Makes MrAnalyze Unique:**
The platform goes **far beyond simple similarity scoring** by providing **detailed, interactive analysis dashboards** for each dimension. Users can drill down into granular page-by-page comparisons, view side-by-side visual comparisons with annotated differences, explore detailed metric breakdowns with explanations, and access actionable improvement suggestions based on analysis results. The **real-time progress tracking** via Server-Sent Events (SSE) provides transparency into the analysis process, while the **comprehensive export options** ensure results can be shared and acted upon by teams.

### 🔥 Key Features

- **🔄 Real-time Analysis Pipeline** - Live progress tracking via Server-Sent Events (SSE)
- **📊 Multi-Dimensional Analysis** - Visual, Content, Technical, and SEO analysis engines
- **🎨 Interactive Web Interface** - **Detailed analysis dashboards** with granular page-by-page insights
- **📈 Advanced Similarity Detection** - Jaccard, Cosine, Semantic, and Content Fingerprinting algorithms
- **🐳 Docker-Based Architecture** - Scalable microservices with shared data volumes
- **⚡ Command Line Interface** - Full automation via SAR (Scrape-Analyze-Report) system
- **📱 Multi-Viewport Analysis** - Desktop, tablet, and mobile responsive design comparison
- **🛡️ Anti-Detection Scraping** - Cloudflare bypass with Puppeteer Stealth technology
- **📋 Actionable SEO Insights** - Priority-ranked optimization tasks with effort estimates
- **💾 Comprehensive Export Options** - JSON, CSV, PDF reports with detailed metrics

---

## 🏗️ Architecture

```
📊 ANALYSIS REQUEST FLOW:
[Web Interface] → [Website API] → [Analyzer API] → [Analysis Engine] → [Shared Data Volume]

📡 REAL-TIME PROGRESS UPDATES:
[Analysis Engine] → [Analyzer API] → [Website API] → [SSE Stream] → [Web Interface]

📋 RESULTS ACCESS:
[Web Interface] ← [Shared Data Volume] (Direct access to completed reports)
```

**🔄 How It Works:**
1. **User submits analysis** → Request flows through APIs to Analysis Engine
2. **Analysis runs** → Progress updates stream back in real-time via SSE
3. **Results saved** → Web Interface accesses completed reports directly from shared storage
4. **User views results** → Interactive dashboards powered by stored analysis data

**Frontend (Web Interface)**
- Reports List
- Report
  - Visual
  - Technical
  - Content
  - SEO
- Interactive route input validation
- Real-time progress tracking via SSE
- Results visualization and export

**Website API (`analysis.js`)**
- Express.js middleware for analysis requests
- SSE streaming for real-time updates
- Request validation and routing

**Analyzer API (`api-server.js`)**
- Backend service managing analysis execution
- Progress broadcasting and status management
- Analysis pipeline orchestration

**Analysis Engine (SAR System)**
- Node.js-based scraping and analysis scripts
- Multi-viewport website capture
- Advanced similarity detection algorithms

**Infrastructure**
- Docker Compose orchestration
- Shared `/app/shared-data/` volume
- Container networking and communication

---

## 🎨 Rich Web Interface Experience

**MrAnalyze isn't just a command-line tool** - it provides a **comprehensive web-based analysis platform** with detailed interactive dashboards that rival enterprise-grade analytics tools.

### 🌟 **Why Use the Web Interface?**

**📊 Visual Data Exploration**
- Interactive similarity matrices with sortable columns and filtering
- Color-coded scoring with hover-over explanations and context
- Side-by-side screenshot comparisons across all viewport sizes
- Real-time progress monitoring with detailed pipeline status

**🔍 Granular Analysis Deep-Dives**
- **Page-by-page comparison views** with annotated differences and insights
- **Metric breakdown explanations** that help interpret similarity scores
- **Interactive charts and visualizations** showing patterns across multiple sites
- **Actionable recommendations** with priority rankings and effort estimates

**📋 Professional Reporting**
- **Executive summary dashboards** perfect for client presentations
- **Detailed technical reports** for development teams and SEO specialists
- **Exportable insights** in multiple formats (JSON, CSV, PDF)
- **Historical analysis tracking** to monitor changes over time

**⚡ Real-Time Experience**
- **Live progress updates** via Server-Sent Events - watch analysis happen in real-time
- **Immediate result access** as soon as analysis completes
- **No command-line expertise required** - intuitive point-and-click interface
- **Team collaboration friendly** - shareable URLs and exportable reports

---

## 🚀 Quick Start

### Prerequisites

- **Docker & Docker Compose** - For containerized deployment
- **Node.js 16+** - For local development
- **8GB RAM minimum** - 16GB recommended for large analyses
- **2GB free storage** - For scraped data and analysis cache

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd mranalyze

# Environment setup
cp .env.example .env
# Edit .env with your configuration

# Start with Docker Compose in DEV
docker compose up -d
# Start with Docker Compose in PROD without .env file
NODE_ENV=production docker compose up

# Visit Browser
http://localhost:8787
```

### Run Scrape Analyze Report command line.

```bash
# Go to analyzer folder
cd mranlayze.com/analyzer/

# Install Packages
npm install

# Run Command
npm run SAR
```

---

## 🌐 Web Interface Usage

### **VISIT HOME PAGE**

- `/` - Home page.

- `/reports/` - Latest reports.

- Choose - report to view.

- `/run_report/` - Run report.

### **RUN REPORT**

### 1. Setup Tab
- **Route Input**: Paste or upload lists of URLs for comparison
- **Validation**: Real-time URL format checking
- **Configuration**: Analysis parameters and options

### 2. Progress Tab
- **Live Updates**: Real-time terminal output streaming
- **Pipeline Status**: Current step and completion percentage
- **Resource Monitoring**: Memory usage and performance metrics

### 3. Results Tab
- **Interactive Reports**: Sortable similarity matrices
- **View Complete Report**: Complete report with all metrics
- **Action Items**: SEO recommendations and optimization tasks

---

## 🛠️ Command Line Interface

### SAR Pipeline (Complete Analysis)

The **S**crape-**A**nalyze-**R**eport pipeline runs the complete analysis workflow:

```bash
# Basic usage - analyze URLs from ./urls directory
npm run SAR

# Custom input directory
npm run SAR ./my-websites

# Custom output destination
npm run SAR ./urls --dest=analysis_2025

# Named parameters
npm run SAR --input=./websites --dest=/directory/comparison_jan2025
```

**Pipeline Steps:**
1. 🔄 **Scrape** all .txt files in input directory
2. 🎨 **Visual** analysis of all scraped sites  
3. 📝 **Content** analysis of all scraped sites
4. ⚙️ **Technical** analysis of all scraped sites
5. 🔍 **SEO** analysis of all scraped sites
6. 📋 **Generate** final comparison reports

### Individual Analysis Commands

#### 🔄 Scraping Commands

```bash
# Scrape all URL files in directory
npm run scrape-all

# Scrape specific URL file
npm run scrape-file ./urls/websites.txt

# Scrape with test mode
npm run test
```

**Scraping Features:**
- 🛡️ Cloudflare bypass with Puppeteer Stealth
- 📱 Multi-viewport capture (desktop, tablet, mobile)
- 📸 Full-page screenshots for each viewport
- 🔄 Automatic retry with exponential backoff
- ⏱️ Configurable delays between requests

#### 🎨 Visual Analysis Commands

```bash
# Standard visual analysis (recommended)
npm run visual

# Light version without screenshots (faster)
npm run visual-light
```

**Visual Analysis Metrics:**
- 🎨 Color palettes and usage patterns
- 🔤 Typography (fonts, sizes, weights)
- 📐 Layout structures and grid systems
- 📱 Responsive design patterns
- 🗂️ Design system detection (Bootstrap, Tailwind, etc.)
- 👁️ Visual hierarchy and emphasis
- 📸 Screenshot similarity across viewports

#### 📝 Content Analysis Commands

```bash
# Standard content analysis (balanced performance)
npm run content

# Fast mode (larger batches, less detail)
npm run content-fast

# Deep analysis (all metrics, slower)
npm run content-deep

# Light version (memory-safe)
npm run content-light
```

**Content Analysis Parameters:**
- `--batch=N` - Pages to process simultaneously (default: 10)
- `--deep` - Enable expensive semantic metrics
- `--max-tokens=N` - Maximum tokens per document (default: 5000)
- `--sample-size=N` - Text sample size for analysis (default: 10000)

**Content Similarity Metrics:**
- 📊 **Jaccard Similarity** - Token overlap percentage
- 📈 **Cosine Similarity** - Document vector similarity
- 🔍 **Content Fingerprinting** - Rolling hash comparison
- 🧠 **Semantic Similarity** - Meaning-based comparison
- 📚 **Topic Modeling** - Thematic analysis
- 📖 **Readability Metrics** - Text complexity scoring

#### ⚙️ Technical Analysis Commands

```bash
# Run technical analysis
npm run technical

# Custom batch processing
npm run technical -- --batch=5
```

**Technical Analysis Coverage:**
- 🗃️ HTML structure similarity
- 🏷️ Meta tag comparison
- 📋 Schema markup detection
- 🛠️ Framework detection (React, Vue, jQuery, etc.)
- 📦 Resource analysis (CSS, JS files)
- ⚡ Performance patterns
- 🔍 SEO technical elements

#### 🔍 SEO Analysis Commands

```bash
# Run SEO analysis
npm run seo
```

**SEO Analysis Features:**
- 🚨 Duplicate content risk assessment
- 📈 Content uniqueness scoring
- 🎯 Search intent analysis
- 🔗 Internal linking patterns
- 📱 Mobile optimization checks

#### 📋 Report Generation Commands

```bash
# Generate final reports
npm run final

# Legacy report format
npm run final-legacy
```

### Combined Analysis Commands

```bash
# Run all analysis types
npm run analyze-all

# Content analysis + report
npm run analyze-content

# Visual analysis + report
npm run analyze-visual

# Technical analysis + report
npm run analyze-technical

# SEO analysis + report
npm run analyze-seo
```

### Memory Optimization Commands

```bash
# Test memory allocation
npm run memory-test

# Clean all generated files
npm run clean-all

# Clean reports only
npm run clean

# Clean analysis cache
npm run clean-cache

# Clean final reports
npm run clean-reports
```

---

## 📡 API Documentation

### Analysis Endpoints

#### Start Analysis
```http
POST /analyze
Content-Type: application/json

{
  "routeLists":[
    {
      "name":"instantcheckmate.com",
      "routes":[
        "https://www.instantcheckmate.com/people/john-smith/",
        "https://www.instantcheckmate.com/people/john-smith/",
        "https://www.instantcheckmate.com/people/john-smith/"
      ],
      "domain":""
    },
    {
      "name":"instantcheckmate.com",
      "routes":[
        "https://www.instantcheckmate.com/people/john-smith/",
        "https://www.instantcheckmate.com/people/john-smith/",
        "https://www.instantcheckmate.com/people/john-smith/"
      ],
      "domain":""
    }
  ]
}
```

#### Check Status
```http
GET /status/
```

#### Progress Stream (SSE)
```http
GET /progress/
```

#### Cancel Analysis
```http
POST /cancel/
```

#### Archive Report
```http
DELETE /report/:reportId

#### Get Report Summary
```http
GET /report/:reportId/summary
```

#### Check If Server Is Running
```http
GET /health
```

#### Create Lock
```http
GET /create-lock
```

#### Remove Lock
```http
GET /remove-lock
```
### Response Formats

**Analysis Status Response:**
```json
{
    "success": true,
    "message": "Analysis started",
    "timestamp": "2025-08-14T17:35:59.302Z",
    "reportId": "analyze_20250814173559"
}
```

---

## 📊 Understanding Analysis Results

### Content Analysis Metrics

#### Jaccard Similarity (0-1 Score)
- **Measures:** Word overlap between documents
- **High Score (>0.8):** Very similar vocabulary and topics
- **Use Case:** Detecting copied or templated content
- **Example:** Score of 0.75 = 75% of unique words are shared

#### Cosine Similarity (0-1 Score)
- **Measures:** Document similarity using word frequency vectors
- **High Score (>0.85):** Similar content structure and emphasis
- **Use Case:** Finding semantically similar pages
- **Advantage:** Accounts for word frequency, not just presence

#### Content Fingerprinting (0-1 Score)
- **Measures:** Exact content matches using rolling hashes
- **High Score (>0.7):** Significant verbatim content copying
- **Use Case:** Detecting plagiarism or content reuse
- **Advantage:** Very fast, memory efficient

#### Semantic Similarity (0-1 Score)
- **Measures:** Meaning-based content comparison
- **High Score (>0.8):** Similar topics and concepts
- **Use Case:** Detecting conceptual content overlap
- **Technology:** Advanced NLP and topic modeling

### Visual Analysis Metrics

#### Color Similarity
- **Primary Color Match:** Dominant color analysis
- **Palette Similarity:** Color scheme comparison
- **Brand Consistency:** Color usage patterns

#### Typography Analysis
- **Font Detection:** Typeface identification
- **Size Patterns:** Typography hierarchy analysis
- **Weight Distribution:** Text emphasis patterns

#### Layout Similarity
- **Grid Systems:** Layout structure comparison
- **Component Placement:** UI element positioning
- **Responsive Patterns:** Multi-viewport analysis

### SEO Risk Assessment

#### Duplicate Content Risk Levels
- **🟢 Low (0-30%):** Minimal overlap, unique content
- **🟡 Medium (31-60%):** Some similarities, monitor closely
- **🟠 High (61-80%):** Significant overlap, action recommended
- **🔴 Critical (81-100%):** Extensive duplication, immediate action required

---

## 📁 Output Structure & Results

### **🗂️ Comprehensive Analysis Results**

Each analysis generates an **extensive collection of detailed reports and data** stored in a structured format for easy access and review:

### Report Directory Structure
```
/app/shared-data/completed_reports/analyze_YYYYMMDDHHMMSS/
├── 📸 scraped_sites/                           # Raw captured website data
│   ├── site1.com/
│   │   ├── 001_route/                          # Individual page captures
│   │   │   ├── content.json                    # Extracted text and metadata
│   │   │   ├── content.txt                     # Clean text for analysis
│   │   │   ├── screenshot_desktop.png          # Desktop viewport capture
│   │   │   ├── screenshot_mobile.png           # Mobile viewport capture
│   │   │   ├── screenshot_tablet.png           # Tablet viewport capture
│   │   │   ├── technical.json                  # Technical metadata and frameworks
│   │   │   ├── visual_desktop.json             # Desktop visual analysis data
│   │   │   ├── visual_mobile.json              # Mobile visual analysis data
│   │   │   ├── visual_tablet.json              # Tablet visual analysis data
│   │   │   └── visual.json                     # Combined visual analysis
│   │   ├── 002_route/                          # Additional pages...
│   │   └── scraping_summary.json               # Site-level scraping report
│   └── site2.com/                              # Additional sites...
├── 📊 reports/                                 # Analysis results and comparisons
│   ├── analysis_cache/                         # Detailed comparison matrices
│   │   ├── content/                            # Content similarity comparisons
│   │   │   └── [page1_vs_page2]_content.json   # Page-to-page content analysis
│   │   ├── technical/                          # Technical implementation comparisons
│   │   │   └── [page1_vs_page2]_technical.json # Technical similarity data
│   │   ├── visual/                             # Visual design comparisons
│   │   │   └── [page1_vs_page2]_visual.json    # Visual similarity metrics
│   │   ├── content_master_summary.json         # Overall content analysis
│   │   ├── technical_master_summary.json       # Overall technical analysis
│   │   ├── visual_master_summary.json          # Overall visual analysis
│   │   └── [site1_vs_site2]_*_summary.json     # Site-to-site summaries
│   ├── 🔍 seo_analysis/                        # SEO risk assessment and recommendations
│   │   ├── comparison_reports/                 # SEO comparison between sites
│   │   │   └── [site1_vs_site2]_seo_comparison.json
│   │   ├── page_reports/                       # Individual page SEO analysis
│   │   │   ├── [site1_page1]_seo.json          # Page-specific SEO data
│   │   │   └── [site2_page1]_seo.json          # Page-specific SEO data
│   │   ├── SEO_ACTION_PLAN.txt                 # Strategic SEO recommendations
│   │   ├── SEO_ACTION_ITEMS.csv                # Trackable SEO tasks with priorities
│   │   └── seo_master_summary.json             # Overall SEO risk assessment
│   └── 📋 final_reports/                       # Executive summaries and actionable insights
│       ├── actionable_items_summary.json       # Priority action items
│       ├── ACTIONABLE_ITEMS_SUMMARY.txt        # Human-readable action plan
│       ├── [site1_vs_site2_final_report].json  # Complete comparison report
│       ├── master_final_summary.json           # Overall analysis summary
│       └── MASTER_SUMMARY.txt                  # Executive summary with key insights
└── 📄 master_scraping_summary.txt              # Complete scraping operation summary
```

### **🎯 Key Output Files Explained**

#### **📊 MASTER_SUMMARY.txt** - Executive Overview
**Perfect for stakeholders and decision-makers:**
- Cross-dimensional similarity scores with risk assessments
- Analysis coverage overview showing what was successfully analyzed
- Key insights and patterns identified across all dimensions
- Priority recommendations ranked by impact and effort
- Executive summary suitable for client presentations

#### **🔍 SEO_ACTION_PLAN.txt** - Strategic SEO Roadmap
**Comprehensive SEO optimization strategy:**
- Content differentiation strategies to reduce duplicate content risk
- Technical SEO improvements with implementation priority
- Keyword optimization recommendations based on content analysis
- Link building opportunities identified through technical analysis
- Long-term SEO strategy aligned with business goals

#### **📋 SEO_ACTION_ITEMS.csv** - Trackable Task List
**Project management ready action items:**
- Priority levels (High/Medium/Low) based on impact analysis
- Effort estimates (Hours/Days/Weeks) for resource planning
- Impact assessments showing expected SEO improvement
- Implementation deadlines for project timeline planning
- Assignable tasks perfect for team collaboration

#### **🎯 ACTIONABLE_ITEMS_SUMMARY.txt** - Implementation Roadmap
**Prioritized action list organized by timeline:**
- **Immediate fixes** that can be implemented within hours
- **Medium-term improvements** requiring days or weeks
- **Long-term strategic changes** for ongoing optimization
- **Resource allocation recommendations** for team planning
- **ROI predictions** based on similarity risk reduction

#### **📄 Individual Comparison Reports** - Detailed Analysis
**Deep-dive analysis for each site pair:**
- Comprehensive similarity scoring across all dimensions
- Page-by-page comparison matrices with detailed metrics
- Visual design analysis with screenshot comparisons
- Content analysis with NLP-powered insights
- Technical implementation comparison with framework detection
- SEO risk assessment with specific recommendations

### **💎 What Makes These Reports Special**

**🎯 Actionable Insights, Not Just Data**
Every report includes specific, implementable recommendations rather than just similarity scores. You'll know exactly what to fix, how to fix it, and why it matters for your SEO strategy.

**📊 Multiple Detail Levels**
From executive summaries perfect for stakeholder presentations to granular technical details for development teams - every audience gets the information they need in the format they prefer.

**🔄 Real-Time Accessibility**
All reports are accessible through the web interface immediately upon completion, with interactive visualizations, sortable data tables, and exportable formats for sharing and collaboration.

---

## ⚙️ Configuration

### Environment Variables

```bash
# Application Environment
NODE_ENV=production                    # production | development

# Service URLs
ANALYZER_SERVICE_URL=http://analyzer:3001  # Analyzer API endpoint
```

### Docker Environment

**Development Environment:**
- Uses `nodemon` for hot reloading
- Verbose logging enabled
- Debug mode active
- **⚠️ Note:** Server reloads can crash active analysis sessions

**Production Environment:**
- Optimized for stability
- Minimal logging
- **Recommended** for web interface analysis sessions
- No automatic server restarts

### Analysis Parameters

```bash
# Content Analysis
--batch=20                    # Pages per batch
--deep                        # Enable semantic analysis
--max-tokens=5000            # Token limit per document
--sample-size=10000          # Text sample size

# Visual Analysis  
--screenshots                # Include screenshot comparison
--viewports=desktop,mobile   # Specify viewport captures

# Technical Analysis
--batch=5                    # Conservative batch size
--frameworks                 # Deep framework detection

# Memory Optimization
--max-old-space-size=16384   # Node.js heap size (MB)
```

---

## 🐛 Troubleshooting

### Common Issues

#### SSE Connection Problems
```bash
# Check service status
docker-compose ps

# Restart services
docker-compose restart
```

#### Memory Allocation Errors
```bash
# Increase heap size
npm run content -- --max-old-space-size=16384

# Use light analysis mode
npm run content-light

# Process in smaller batches
npm run content -- --batch=5
```

#### Analysis Failures
```bash
# Check available disk space
df -h

# Verify URL accessibility
curl -I [website-url]
```

#### Lock File Issues
```bash
# Remove stale lock files
rm -f /app/shared-data/locks/analysis.lock
```

### Performance Optimization

#### Memory Management
- Use `content-light` for large datasets
- Increase `--max-old-space-size` for complex analysis
- Process in smaller batches during peak usage
- Monitor system resources during analysis

#### Speed Optimization
- Use `content-fast` for quick overviews
- Skip screenshots with `visual-light`
- Run analysis during off-peak hours
- Scale horizontally with multiple analyzer instances

---

## 🔧 Development Guide

### Local Development Setup

```bash
# Clone and install
git clone [repository-url]
cd mranalyze/analyze
npm install

cd mranalyze/website
npm install

# Development mode (website)
cd mranalyze/website
npm run dev
```
---

## 🤝 Contributing

### Development Workflow

1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/amazing-analysis`
3. **Commit** changes: `git commit -m 'Add amazing analysis capability'`
4. **Push** to branch: `git push origin feature/amazing-analysis`
5. **Submit** pull request

### Code Standards

- **ESLint** configuration for code quality
- **Prettier** for code formatting
- **Docker** for consistent environments

---

---

**Built with ❤️ by Jeffrey Bue for web professionals who demand comprehensive analysis and actionable insights.**

---

*MrAnalyze.com - Comprehensive Website Route Comparison Analysis Platform*
*Version 1.0.0 | MIT License | © 2025*