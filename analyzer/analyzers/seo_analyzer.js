class SEOAnalyzer {
    constructor() {
        this.stopWords = new Set([
            'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
            'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
            'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must',
            'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'
        ]);
        
        this.keywordPatterns = {
            location: /\b([A-Z][a-z]+,?\s*[A-Z]{2})\b/g,
            phone: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
            email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
            name: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g
        };
    }

    async analyzeIndividualPage(pageData) {
        const content = pageData.content;
        const technical = pageData.technical;
        
        const analysis = {
            pageId: pageData.pageId,
            url: pageData.url,
            titleTagAnalysis: this.analyzeTitleTag(content.meta.title),
            metaDescriptionAnalysis: this.analyzeMetaDescription(content.meta.description),
            headingStructure: this.analyzeHeadingStructure(content.headings),
            contentQuality: this.analyzeContentQuality(content),
            keywordOptimization: this.analyzeKeywordOptimization(content),
            technicalSEO: this.analyzeTechnicalSEO(technical, content),
            uniquenessIndicators: this.analyzeUniquenessIndicators(content),
            actionableItems: []
        };
        
        // Calculate overall score
        analysis.overallScore = this.calculateOverallSEOScore(analysis);
        
        // Generate actionable items
        analysis.actionableItems = this.generateIndividualPageActions(analysis, pageData);
        
        return analysis;
    }

    async comparePages(page1Data, page2Data) {
        const content1 = page1Data.content;
        const content2 = page2Data.content;
        
        const comparison = {
            duplicateContentRisk: this.assessDuplicateContentRisk(content1, content2),
            titleSimilarity: this.compareTitles(content1.meta.title, content2.meta.title),
            metaSimilarity: this.compareMetaDescriptions(content1.meta.description, content2.meta.description),
            contentSimilarity: this.compareContentSimilarity(content1, content2),
            uniquenessGap: this.analyzeUniquenessGap(content1, content2),
            keywordCannibalization: this.detectKeywordCannibalization(content1, content2),
            structuralSimilarity: this.compareStructuralElements(content1, content2),
            actionableItems: []
        };
        
        // Generate comparison-based actionable items
        comparison.actionableItems = this.generateComparisonActions(comparison, page1Data, page2Data);
        
        return comparison;
    }

    analyzeTitleTag(title) {
        if (!title) {
            return {
                score: 0,
                issues: ['Missing title tag'],
                length: 0,
                hasKeywords: false,
                brandingPosition: 'none'
            };
        }
        
        const length = title.length;
        const issues = [];
        let score = 1.0;
        
        // Length analysis
        if (length < 30) {
            issues.push('Title too short (under 30 characters)');
            score -= 0.3;
        } else if (length > 60) {
            issues.push('Title too long (over 60 characters) - may be truncated in search results');
            score -= 0.2;
        }
        
        // Keyword presence
        const meaningfulWords = this.extractMeaningfulWords(title);
        const hasKeywords = meaningfulWords.length >= 2;
        if (!hasKeywords) {
            issues.push('Title lacks descriptive keywords');
            score -= 0.3;
        }
        
        // Branding position
        const brandingPosition = this.detectBrandingPosition(title);
        
        // Uniqueness indicators
        if (title.toLowerCase().includes('home') || title.toLowerCase().includes('welcome')) {
            issues.push('Generic title - lacks specificity');
            score -= 0.2;
        }
        
        return {
            title,
            score: Math.max(0, score),
            issues,
            length,
            hasKeywords,
            brandingPosition,
            meaningfulWords
        };
    }

    analyzeMetaDescription(description) {
        if (!description) {
            return {
                score: 0,
                issues: ['Missing meta description'],
                length: 0,
                hasCallToAction: false,
                keywordPresence: false
            };
        }
        
        const length = description.length;
        const issues = [];
        let score = 1.0;
        
        // Length analysis
        if (length < 120) {
            issues.push('Meta description too short (under 120 characters)');
            score -= 0.2;
        } else if (length > 160) {
            issues.push('Meta description too long (over 160 characters) - may be truncated');
            score -= 0.1;
        }
        
        // Call to action detection
        const hasCallToAction = this.detectCallToAction(description);
        if (!hasCallToAction) {
            issues.push('Missing call-to-action in meta description');
            score -= 0.2;
        }
        
        // Keyword presence
        const meaningfulWords = this.extractMeaningfulWords(description);
        const keywordPresence = meaningfulWords.length >= 3;
        if (!keywordPresence) {
            issues.push('Meta description lacks descriptive keywords');
            score -= 0.2;
        }
        
        // Uniqueness check
        if (description.toLowerCase().includes('lorem ipsum') || 
            description.toLowerCase().includes('coming soon')) {
            issues.push('Placeholder content detected');
            score -= 0.4;
        }
        
        return {
            description,
            score: Math.max(0, score),
            issues,
            length,
            hasCallToAction,
            keywordPresence,
            meaningfulWords
        };
    }

    analyzeHeadingStructure(headings) {
        const analysis = {
            score: 1.0,
            issues: [],
            h1Count: (headings.h1 || []).length,
            h2Count: (headings.h2 || []).length,
            h3Count: (headings.h3 || []).length,
            hasKeywords: false,
            hierarchy: 'good'
        };
        
        // H1 analysis
        if (analysis.h1Count === 0) {
            analysis.issues.push('Missing H1 tag');
            analysis.score -= 0.4;
        } else if (analysis.h1Count > 1) {
            analysis.issues.push('Multiple H1 tags detected - should have only one per page');
            analysis.score -= 0.2;
        }
        
        // Keyword analysis in headings
        const allHeadings = [
            ...(headings.h1 || []),
            ...(headings.h2 || []),
            ...(headings.h3 || [])
        ].join(' ');
        
        const meaningfulWords = this.extractMeaningfulWords(allHeadings);
        analysis.hasKeywords = meaningfulWords.length >= 3;
        
        if (!analysis.hasKeywords) {
            analysis.issues.push('Headings lack descriptive keywords');
            analysis.score -= 0.3;
        }
        
        // Hierarchy analysis
        if (analysis.h2Count === 0 && analysis.h3Count > 0) {
            analysis.issues.push('Poor heading hierarchy - H3 without H2');
            analysis.hierarchy = 'poor';
            analysis.score -= 0.2;
        }
        
        return analysis;
    }

    analyzeContentQuality(content) {
        const fullText = content.fullText || '';
        const wordCount = content.stats?.wordCount || 0;
        
        const analysis = {
            score: 1.0,
            issues: [],
            wordCount,
            readabilityEstimate: this.estimateReadability(fullText),
            keywordDensity: {},
            contentDepth: 'shallow',
            uniquenessScore: 0
        };
        
        // Word count analysis
        if (wordCount < 300) {
            analysis.issues.push('Content too short (under 300 words) - may lack depth');
            analysis.score -= 0.3;
        } else if (wordCount > 2000) {
            analysis.contentDepth = 'comprehensive';
        } else if (wordCount > 1000) {
            analysis.contentDepth = 'detailed';
        } else if (wordCount > 500) {
            analysis.contentDepth = 'moderate';
        }
        
        // Keyword density analysis
        const topKeywords = this.extractTopKeywords(fullText);
        analysis.keywordDensity = this.calculateKeywordDensities(fullText, topKeywords);
        
        // Check for over-optimization
        const overOptimized = Object.values(analysis.keywordDensity).some(density => density > 5);
        if (overOptimized) {
            analysis.issues.push('Potential keyword stuffing detected (density > 5%)');
            analysis.score -= 0.2;
        }
        
        // Uniqueness indicators
        analysis.uniquenessScore = this.calculateContentUniqueness(content);
        if (analysis.uniquenessScore < 0.3) {
            analysis.issues.push('Content appears generic - lacks unique information');
            analysis.score -= 0.3;
        }
        
        return analysis;
    }

    analyzeKeywordOptimization(content) {
        const primaryKeywords = this.extractPrimaryKeywords(content);
        const analysis = {
            score: 1.0,
            issues: [],
            primaryKeywords,
            keywordPlacement: {},
            semanticKeywords: [],
            opportunities: []
        };
        
        // Analyze keyword placement
        primaryKeywords.forEach(keyword => {
            const placement = this.analyzeKeywordPlacement(keyword, content);
            analysis.keywordPlacement[keyword] = placement;
            
            if (!placement.inTitle) {
                analysis.opportunities.push(`Include "${keyword}" in title tag`);
            }
            if (!placement.inHeadings) {
                analysis.opportunities.push(`Include "${keyword}" in headings`);
            }
            if (placement.density < 1) {
                analysis.opportunities.push(`Increase "${keyword}" density in content`);
            }
        });
        
        // Semantic keyword analysis
        analysis.semanticKeywords = this.findSemanticKeywords(content);
        
        // Score calculation
        const avgPlacementScore = Object.values(analysis.keywordPlacement)
            .reduce((sum, p) => sum + p.score, 0) / Math.max(1, primaryKeywords.length);
        analysis.score = avgPlacementScore;
        
        return analysis;
    }

    analyzeTechnicalSEO(technical, content) {
        const analysis = {
            score: 1.0,
            issues: [],
            hasStructuredData: false,
            metaTagsPresent: [],
            missingMetaTags: [],
            performanceIndicators: {}
        };
        
        // Structured data analysis
        if (technical.schemas && technical.schemas.length > 0) {
            analysis.hasStructuredData = true;
        } else {
            analysis.issues.push('No structured data (schema markup) found');
            analysis.score -= 0.2;
        }
        
        // Meta tags analysis
        const essentialMetaTags = ['description', 'viewport', 'robots'];
        const presentTags = Object.keys(technical.metaTags || {});
        
        analysis.metaTagsPresent = presentTags;
        analysis.missingMetaTags = essentialMetaTags.filter(tag => !presentTags.includes(tag));
        
        if (analysis.missingMetaTags.length > 0) {
            analysis.issues.push(`Missing essential meta tags: ${analysis.missingMetaTags.join(', ')}`);
            analysis.score -= 0.1 * analysis.missingMetaTags.length;
        }
        
        // Performance indicators
        analysis.performanceIndicators = {
            imageCount: content.stats?.imageCount || 0,
            linkCount: content.stats?.linkCount || 0,
            hasAltTags: false // Would need image analysis from visual data
        };
        
        return analysis;
    }

    analyzeUniquenessIndicators(content) {
        const analysis = {
            uniqueElements: [],
            genericElements: [],
            uniquenessScore: 0,
            opportunities: []
        };
        
        // Detect unique elements
        const text = content.fullText.toLowerCase();
        
        // Look for specific information
        if (this.keywordPatterns.phone.test(text)) {
            analysis.uniqueElements.push('phone_number');
        }
        if (this.keywordPatterns.email.test(text)) {
            analysis.uniqueElements.push('email_address');
        }
        if (this.keywordPatterns.location.test(text)) {
            analysis.uniqueElements.push('location_specific');
        }
        
        // Detect personal information
        const names = text.match(this.keywordPatterns.name);
        if (names && names.length > 0) {
            analysis.uniqueElements.push('personal_names');
        }
        
        // Check for generic content
        const genericPhrases = [
            'lorem ipsum', 'coming soon', 'under construction',
            'welcome to our website', 'about us', 'contact us'
        ];
        
        genericPhrases.forEach(phrase => {
            if (text.includes(phrase)) {
                analysis.genericElements.push(phrase);
            }
        });
        
        // Calculate uniqueness score
        analysis.uniquenessScore = Math.max(0, 
            (analysis.uniqueElements.length * 0.2) - (analysis.genericElements.length * 0.1)
        );
        
        // Generate opportunities
        if (analysis.uniqueElements.length < 3) {
            analysis.opportunities.push('Add more specific, unique information about the subject');
        }
        if (!analysis.uniqueElements.includes('location_specific')) {
            analysis.opportunities.push('Include location-specific information');
        }
        if (!analysis.uniqueElements.includes('personal_names')) {
            analysis.opportunities.push('Add personal or company-specific details');
        }
        
        return analysis;
    }

    assessDuplicateContentRisk(content1, content2) {
        const titleSim = this.calculateTextSimilarity(content1.meta.title, content2.meta.title);
        const descSim = this.calculateTextSimilarity(content1.meta.description, content2.meta.description);
        const contentSim = this.calculateTextSimilarity(content1.fullText, content2.fullText);
        const headingSim = this.calculateHeadingSimilarity(content1.headings, content2.headings);
        
        const riskScore = (titleSim * 0.3 + descSim * 0.2 + contentSim * 0.4 + headingSim * 0.1);
        
        return {
            riskScore,
            riskLevel: this.getRiskLevel(riskScore),
            breakdown: {
                titleSimilarity: titleSim,
                descriptionSimilarity: descSim,
                contentSimilarity: contentSim,
                headingSimilarity: headingSim
            },
            riskFactors: this.identifyRiskFactors(riskScore, titleSim, descSim, contentSim)
        };
    }

    analyzeUniquenessGap(content1, content2) {
        const words1 = new Set(this.extractMeaningfulWords(content1.fullText));
        const words2 = new Set(this.extractMeaningfulWords(content2.fullText));
        
        const uniqueToFirst = Array.from(words1).filter(word => !words2.has(word));
        const uniqueToSecond = Array.from(words2).filter(word => !words1.has(word));
        const shared = Array.from(words1).filter(word => words2.has(word));
        
        const totalWords = words1.size + words2.size;
        const uniqueWords = uniqueToFirst.length + uniqueToSecond.length;
        
        return {
            score: totalWords > 0 ? uniqueWords / totalWords : 0,
            uniqueToFirst,
            uniqueToSecond,
            sharedWords: shared,
            opportunities: this.generateUniquenessOpportunities(uniqueToFirst, uniqueToSecond)
        };
    }

    generateIndividualPageActions(analysis, pageData) {
        const actions = [];
        
        // Title tag actions
        if (analysis.titleTagAnalysis.score < 0.7) {
            analysis.titleTagAnalysis.issues.forEach(issue => {
                actions.push({
                    priority: issue.includes('Missing') ? 'CRITICAL' : 'HIGH',
                    category: 'Title Tags',
                    title: 'Fix Title Tag Issues',
                    description: issue,
                    impact: 'HIGH',
                    pageId: pageData.pageId,
                    url: pageData.url,
                    specificAction: this.getTitleTagRecommendation(analysis.titleTagAnalysis, pageData.content.meta.title)
                });
            });
        }
        
        // Meta description actions
        if (analysis.metaDescriptionAnalysis.score < 0.7) {
            analysis.metaDescriptionAnalysis.issues.forEach(issue => {
                actions.push({
                    priority: issue.includes('Missing') ? 'CRITICAL' : 'HIGH',
                    category: 'Meta Descriptions',
                    title: 'Optimize Meta Description',
                    description: issue,
                    impact: 'HIGH',
                    pageId: pageData.pageId,
                    url: pageData.url,
                    specificAction: this.getMetaDescriptionRecommendation(analysis.metaDescriptionAnalysis, pageData.content.meta.description)
                });
            });
        }
        
        // Content quality actions
        if (analysis.contentQuality.score < 0.6) {
            actions.push({
                priority: 'MEDIUM',
                category: 'Content Quality',
                title: 'Improve Content Quality',
                description: `Content quality score: ${(analysis.contentQuality.score * 100).toFixed(1)}%`,
                impact: 'MEDIUM',
                pageId: pageData.pageId,
                url: pageData.url,
                specificAction: this.getContentQualityRecommendations(analysis.contentQuality)
            });
        }
        
        // Uniqueness actions
        if (analysis.uniquenessIndicators.uniquenessScore < 0.3) {
            actions.push({
                priority: 'HIGH',
                category: 'Content Uniqueness',
                title: 'Increase Content Uniqueness',
                description: 'Content lacks unique, specific information',
                impact: 'HIGH',
                pageId: pageData.pageId,
                url: pageData.url,
                specificAction: analysis.uniquenessIndicators.opportunities.join('; ')
            });
        }
        
        // Technical SEO actions
        if (analysis.technicalSEO.issues.length > 0) {
            analysis.technicalSEO.issues.forEach(issue => {
                actions.push({
                    priority: 'MEDIUM',
                    category: 'Technical SEO',
                    title: 'Fix Technical SEO Issues',
                    description: issue,
                    impact: 'MEDIUM',
                    pageId: pageData.pageId,
                    url: pageData.url,
                    specificAction: this.getTechnicalSEORecommendation(issue)
                });
            });
        }
        
        return actions;
    }

    generateComparisonActions(comparison, page1Data, page2Data) {
        const actions = [];
        
        // Duplicate content risk actions
        if (comparison.duplicateContentRisk.riskScore > 0.7) {
            actions.push({
                priority: 'CRITICAL',
                category: 'Duplicate Content',
                title: 'Address Duplicate Content Risk',
                description: `High duplicate content risk detected (${(comparison.duplicateContentRisk.riskScore * 100).toFixed(1)}%)`,
                impact: 'HIGH',
                page1: page1Data.pageId,
                page2: page2Data.pageId,
                specificAction: this.getDuplicateContentRecommendations(comparison.duplicateContentRisk)
            });
        }
        
        // Title similarity actions
        if (comparison.titleSimilarity > 0.8) {
            actions.push({
                priority: 'HIGH',
                category: 'Title Tags',
                title: 'Differentiate Similar Titles',
                description: `Titles are ${(comparison.titleSimilarity * 100).toFixed(1)}% similar`,
                impact: 'HIGH',
                page1: page1Data.pageId,
                page2: page2Data.pageId,
                specificAction: 'Rewrite titles to be more distinct and specific to each page\'s unique content'
            });
        }
        
        // Keyword cannibalization actions
        if (comparison.keywordCannibalization.cannibalizing) {
            actions.push({
                priority: 'HIGH',
                category: 'Keyword Strategy',
                title: 'Resolve Keyword Cannibalization',
                description: `Pages competing for same keywords: ${comparison.keywordCannibalization.conflictingKeywords.join(', ')}`,
                impact: 'HIGH',
                page1: page1Data.pageId,
                page2: page2Data.pageId,
                specificAction: 'Differentiate keyword focus - assign unique primary keywords to each page'
            });
        }
        
        // Uniqueness gap opportunities
        if (comparison.uniquenessGap.score < 0.4) {
            actions.push({
                priority: 'MEDIUM',
                category: 'Content Gaps',
                title: 'Add Unique Content Elements',
                description: 'Pages lack sufficient unique content elements',
                impact: 'MEDIUM',
                page1: page1Data.pageId,
                page2: page2Data.pageId,
                specificAction: comparison.uniquenessGap.opportunities.join('; ')
            });
        }
        
        return actions;
    }

    // Helper methods
    extractMeaningfulWords(text) {
        if (!text) return [];
        return text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 2 && !this.stopWords.has(word))
            .filter(word => !/^\d+$/.test(word));
    }

    calculateTextSimilarity(text1, text2) {
        if (!text1 || !text2) return 0;
        
        const words1 = new Set(this.extractMeaningfulWords(text1));
        const words2 = new Set(this.extractMeaningfulWords(text2));
        
        if (words1.size === 0 || words2.size === 0) return 0;
        
        let intersection = 0;
        for (const word of words1) {
            if (words2.has(word)) intersection++;
        }
        
        return (2 * intersection) / (words1.size + words2.size);
    }

    calculateOverallSEOScore(analysis) {
        const weights = {
            titleTagAnalysis: 0.25,
            metaDescriptionAnalysis: 0.15,
            headingStructure: 0.15,
            contentQuality: 0.25,
            keywordOptimization: 0.1,
            technicalSEO: 0.1
        };
        
        let totalScore = 0;
        Object.keys(weights).forEach(key => {
            if (analysis[key] && typeof analysis[key].score === 'number') {
                totalScore += analysis[key].score * weights[key];
            }
        });
        
        return Math.max(0, Math.min(1, totalScore));
    }

    getRiskLevel(score) {
        if (score >= 0.8) return 'CRITICAL';
        if (score >= 0.6) return 'HIGH';
        if (score >= 0.4) return 'MEDIUM';
        return 'LOW';
    }

    getTitleTagRecommendation(analysis, currentTitle) {
        if (!currentTitle) {
            return 'Add a descriptive title tag (30-60 characters)';
        }
        if (currentTitle.length < 30) {
            return `Expand title from ${currentTitle.length} to 30-60 characters with more descriptive keywords`;
        }
        if (currentTitle.length > 60) {
            return `Shorten title from ${currentTitle.length} to under 60 characters`;
        }
        return 'Optimize title tag with more specific, unique keywords';
    }

    getMetaDescriptionRecommendation(analysis, currentDesc) {
        if (!currentDesc) {
            return 'Add a compelling meta description (120-160 characters) with a call-to-action';
        }
        if (currentDesc.length < 120) {
            return `Expand meta description from ${currentDesc.length} to 120-160 characters`;
        }
        if (currentDesc.length > 160) {
            return `Shorten meta description from ${currentDesc.length} to under 160 characters`;
        }
        if (!analysis.hasCallToAction) {
            return 'Add a call-to-action to the meta description';
        }
        return 'Optimize meta description with more compelling, unique content';
    }

    // Additional helper methods
    detectCallToAction(text) {
        const ctaPatterns = [
            /\b(call|contact|visit|learn|discover|explore|find|get|download|sign up|register)\b/i,
            /\b(more info|read more|click here|see more)\b/i
        ];
        return ctaPatterns.some(pattern => pattern.test(text));
    }

    detectBrandingPosition(title) {
        const words = title.split(/\s+/);
        if (words.length < 2) return 'none';
        
        // Check if first word looks like a brand (capitalized)
        if (/^[A-Z][a-z]+$/.test(words[0])) return 'beginning';
        
        // Check if last word looks like a brand
        if (/^[A-Z][a-z]+$/.test(words[words.length - 1])) return 'end';
        
        return 'middle';
    }

    extractPrimaryKeywords(content) {
        // Extract from title and headings
        const importantText = [
            content.meta.title,
            ...(content.headings.h1 || []),
            ...(content.headings.h2 || [])
        ].join(' ');
        
        return this.extractTopKeywords(importantText, 5);
    }

    analyzeKeywordPlacement(keyword, content) {
        const inTitle = content.meta.title.toLowerCase().includes(keyword.toLowerCase());
        const inMetaDesc = content.meta.description.toLowerCase().includes(keyword.toLowerCase());
        const inHeadings = [
            ...(content.headings.h1 || []),
            ...(content.headings.h2 || []),
            ...(content.headings.h3 || [])
        ].some(heading => heading.toLowerCase().includes(keyword.toLowerCase()));
        
        const density = this.calculateKeywordDensities(content.fullText, [keyword])[keyword];
        
        let score = 0;
        if (inTitle) score += 0.4;
        if (inMetaDesc) score += 0.2;
        if (inHeadings) score += 0.3;
        if (density > 1) score += 0.1;
        
        return {
            score,
            inTitle,
            inMetaDesc,
            inHeadings,
            density: parseFloat(density)
        };
    }

    findSemanticKeywords(content) {
        // Simple semantic keyword extraction based on context
        const text = content.fullText.toLowerCase();
        const semanticGroups = {
            business: ['company', 'business', 'service', 'professional', 'industry'],
            location: ['location', 'address', 'area', 'city', 'local'],
            contact: ['phone', 'email', 'contact', 'reach', 'call'],
            experience: ['experience', 'years', 'expertise', 'skilled', 'qualified']
        };
        
        const found = [];
        Object.entries(semanticGroups).forEach(([group, keywords]) => {
            keywords.forEach(keyword => {
                if (text.includes(keyword)) {
                    found.push({ group, keyword });
                }
            });
        });
        
        return found;
    }

    calculateContentUniqueness(content) {
        let uniquenessScore = 0;
        const text = content.fullText.toLowerCase();
        
        // Check for specific information
        if (this.keywordPatterns.phone.test(text)) uniquenessScore += 0.2;
        if (this.keywordPatterns.email.test(text)) uniquenessScore += 0.2;
        if (this.keywordPatterns.location.test(text)) uniquenessScore += 0.2;
        
        // Check for personal/specific names
        const names = text.match(this.keywordPatterns.name);
        if (names && names.length > 0) uniquenessScore += 0.3;
        
        // Penalize generic content
        const genericPhrases = ['lorem ipsum', 'coming soon', 'under construction'];
        genericPhrases.forEach(phrase => {
            if (text.includes(phrase)) uniquenessScore -= 0.3;
        });
        
        return Math.max(0, Math.min(1, uniquenessScore));
    }

    compareTitles(title1, title2) {
        return this.calculateTextSimilarity(title1, title2);
    }

    compareMetaDescriptions(desc1, desc2) {
        return this.calculateTextSimilarity(desc1, desc2);
    }

    compareContentSimilarity(content1, content2) {
        const textSim = this.calculateTextSimilarity(content1.fullText, content2.fullText);
        const headingSim = this.calculateHeadingSimilarity(content1.headings, content2.headings);
        const navSim = this.calculateNavigationSimilarity(content1.navigation, content2.navigation);
        
        return {
            textSimilarity: textSim,
            headingSimilarity: headingSim,
            navigationSimilarity: navSim,
            overallSimilarity: (textSim * 0.6 + headingSim * 0.3 + navSim * 0.1)
        };
    }

    calculateHeadingSimilarity(headings1, headings2) {
        const allHeadings1 = [
            ...(headings1.h1 || []),
            ...(headings1.h2 || []),
            ...(headings1.h3 || [])
        ].join(' ');
        
        const allHeadings2 = [
            ...(headings2.h1 || []),
            ...(headings2.h2 || []),
            ...(headings2.h3 || [])
        ].join(' ');
        
        return this.calculateTextSimilarity(allHeadings1, allHeadings2);
    }

    calculateNavigationSimilarity(nav1, nav2) {
        if (!nav1 || !nav2) return 0;
        
        const navText1 = (nav1 || []).map(item => item.text || '').join(' ');
        const navText2 = (nav2 || []).map(item => item.text || '').join(' ');
        
        return this.calculateTextSimilarity(navText1, navText2);
    }

    detectKeywordCannibalization(content1, content2) {
        const keywords1 = new Set(this.extractPrimaryKeywords(content1));
        const keywords2 = new Set(this.extractPrimaryKeywords(content2));
        
        const conflictingKeywords = [];
        keywords1.forEach(keyword => {
            if (keywords2.has(keyword)) {
                conflictingKeywords.push(keyword);
            }
        });
        
        return {
            cannibalizing: conflictingKeywords.length > 0,
            conflictingKeywords,
            riskLevel: conflictingKeywords.length > 2 ? 'HIGH' : conflictingKeywords.length > 0 ? 'MEDIUM' : 'LOW'
        };
    }

    compareStructuralElements(content1, content2) {
        const structure1 = this.extractStructuralElements(content1);
        const structure2 = this.extractStructuralElements(content2);
        
        let similarities = 0;
        let totalElements = 0;
        
        Object.keys(structure1).forEach(key => {
            totalElements++;
            if (structure1[key] === structure2[key]) {
                similarities++;
            }
        });
        
        return {
            similarity: totalElements > 0 ? similarities / totalElements : 0,
            structure1,
            structure2
        };
    }

    extractStructuralElements(content) {
        return {
            hasH1: (content.headings.h1 || []).length > 0,
            hasH2: (content.headings.h2 || []).length > 0,
            hasH3: (content.headings.h3 || []).length > 0,
            hasNavigation: (content.navigation || []).length > 0,
            hasForms: (content.forms || []).length > 0,
            paragraphCount: (content.paragraphs || []).length,
            wordCountRange: this.getWordCountRange(content.stats?.wordCount || 0)
        };
    }

    getWordCountRange(wordCount) {
        if (wordCount < 300) return 'short';
        if (wordCount < 800) return 'medium';
        if (wordCount < 1500) return 'long';
        return 'very_long';
    }

    generateUniquenessOpportunities(uniqueToFirst, uniqueToSecond) {
        const opportunities = [];
        
        if (uniqueToFirst.length < 20) {
            opportunities.push('Add more unique content elements to differentiate from similar pages');
        }
        
        if (uniqueToSecond.length < 20) {
            opportunities.push('Expand content with specific details not found on competing pages');
        }
        
        // Suggest specific content types based on what's missing
        const contentSuggestions = [
            'Add testimonials or reviews',
            'Include specific case studies or examples',
            'Add location-specific information',
            'Include pricing or service details',
            'Add FAQ section with unique questions',
            'Include contact information and business hours',
            'Add team member information or bios'
        ];
        
        opportunities.push(...contentSuggestions.slice(0, 3));
        
        return opportunities;
    }

    identifyRiskFactors(riskScore, titleSim, descSim, contentSim) {
        const factors = [];
        
        if (titleSim > 0.8) factors.push('Nearly identical titles');
        if (descSim > 0.8) factors.push('Nearly identical meta descriptions');
        if (contentSim > 0.7) factors.push('High content similarity');
        if (riskScore > 0.8) factors.push('Overall duplicate content risk is critical');
        
        return factors;
    }

    getContentQualityRecommendations(analysis) {
        const recommendations = [];
        
        if (analysis.wordCount < 300) {
            recommendations.push('Expand content to at least 300 words for better SEO value');
        }
        
        if (analysis.uniquenessScore < 0.3) {
            recommendations.push('Add more specific, unique information about the subject');
        }
        
        if (analysis.readabilityEstimate === 'very_difficult') {
            recommendations.push('Simplify language and sentence structure for better readability');
        }
        
        // Check keyword density issues
        const overOptimized = Object.values(analysis.keywordDensity).some(density => density > 5);
        if (overOptimized) {
            recommendations.push('Reduce keyword density to avoid over-optimization');
        }
        
        return recommendations.join('; ');
    }

    getTechnicalSEORecommendation(issue) {
        const recommendations = {
            'No structured data (schema markup) found': 'Add JSON-LD structured data for better search engine understanding',
            'Missing essential meta tags': 'Add missing meta tags including viewport, robots, and description',
            'Missing meta description': 'Add a compelling 120-160 character meta description',
            'Missing viewport meta tag': 'Add <meta name="viewport" content="width=device-width, initial-scale=1">',
            'Missing robots meta tag': 'Add <meta name="robots" content="index, follow">'
        };
        
        return recommendations[issue] || 'Review and fix technical SEO issue';
    }

    getDuplicateContentRecommendations(riskAnalysis) {
        const recommendations = [];
        
        if (riskAnalysis.breakdown.titleSimilarity > 0.8) {
            recommendations.push('Rewrite titles to be more distinct and specific');
        }
        
        if (riskAnalysis.breakdown.descriptionSimilarity > 0.8) {
            recommendations.push('Create unique meta descriptions for each page');
        }
        
        if (riskAnalysis.breakdown.contentSimilarity > 0.7) {
            recommendations.push('Add unique content sections to differentiate pages');
            recommendations.push('Include page-specific information and details');
        }
        
        if (riskAnalysis.breakdown.headingSimilarity > 0.8) {
            recommendations.push('Use different heading structures and keywords');
        }
        
        return recommendations.join('; ');
    }

    countSyllables(word) {
        // Simple syllable counting for readability analysis
        word = word.toLowerCase();
        if (word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        const matches = word.match(/[aeiouy]{1,2}/g);
        return matches ? matches.length : 1;
    }

    estimateReadability(text) {
        // Simple readability estimate based on sentence and word length
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = text.split(/\s+/).filter(w => w.length > 0);
        
        if (sentences.length === 0 || words.length === 0) return 'unknown';
        
        const avgWordsPerSentence = words.length / sentences.length;
        const avgSyllablesPerWord = words.reduce((sum, word) => sum + this.countSyllables(word), 0) / words.length;
        
        // Simplified Flesch reading score
        const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
        
        if (score >= 90) return 'very_easy';
        if (score >= 80) return 'easy';
        if (score >= 70) return 'fairly_easy';
        if (score >= 60) return 'standard';
        if (score >= 50) return 'fairly_difficult';
        if (score >= 30) return 'difficult';
        return 'very_difficult';
    }

    extractTopKeywords(text, count = 10) {
        const words = this.extractMeaningfulWords(text);
        const frequency = {};
        
        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });
        
        return Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, count)
            .map(([word]) => word);
    }

    calculateKeywordDensities(text, keywords) {
        const totalWords = text.split(/\s+/).length;
        const densities = {};
        
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
            const matches = (text.match(regex) || []).length;
            densities[keyword] = ((matches / totalWords) * 100).toFixed(2);
        });
        
        return densities;
    }

    estimateReadability(text) {
        // Simple readability estimate based on sentence and word length
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = text.split(/\s+/).filter(w => w.length > 0);
        
        if (sentences.length === 0 || words.length === 0) return 'unknown';
        
        const avgWordsPerSentence = words.length / sentences.length;
        const avgSyllablesPerWord = words.reduce((sum, word) => sum + this.countSyllables(word), 0) / words.length;
        
        // Simplified Flesch reading score
        const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
        
        if (score >= 90) return 'very_easy';
        if (score >= 80) return 'easy';
        if (score >= 70) return 'fairly_easy';
        if (score >= 60) return 'standard';
        if (score >= 50) return 'fairly_difficult';
        if (score >= 30) return 'difficult';
        return 'very_difficult';
    }

    countSyllables(word) {
        // Simple syllable counting
        word = word.toLowerCase();
        if (word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        const matches = word.match(/[aeiouy]{1,2}/g);
        return matches ? matches.length : 1;
    }
}

module.exports = SEOAnalyzer;