class TechnicalSimilarityAnalyzer {
    constructor() {
        this.frameworkWeights = {
            'jquery': 0.8,
            'react': 1.0,
            'angular': 1.0,
            'vue': 1.0,
            'bootstrap': 0.6
        };

        // 🧹 Initialize cleanup tracking
        this.comparisonCache = new Map();
        this.tempResults = [];
    }

    async compare(page1, page2) {
        const tech1 = page1.technical;
        const tech2 = page2.technical;
        
        const results = {
            htmlStructure: this.compareHTMLStructure(tech1.structure, tech2.structure),
            metaTags: this.compareMetaTags(tech1.metaTags, tech2.metaTags),
            schemaMarkup: this.compareSchemaMarkup(tech1.schemas, tech2.schemas),
            frameworks: this.compareFrameworks(tech1.frameworks, tech2.frameworks),
            resources: this.compareResources(tech1.resources, tech2.resources),
            performance: this.analyzePerformancePatterns(tech1, tech2),
            seoTechnical: this.compareSEOTechnical(tech1, tech2)
        };

        // Calculate overall technical similarity score
        results.overallScore = this.calculateOverallScore(results);

        // 🧹 Clear any temporary data immediately after each comparison
        this.clearTempData();
        
        return results;
    }

    // 🧹 ADD MEMORY CLEANUP METHODS
    clearCache() {
        // Clear any cached comparison data
        this.comparisonCache.clear();
        this.tempResults.length = 0;
        
        // Clear any other internal state
        this.clearTempData();
    }

    clearTempData() {
        // Clear any temporary arrays or objects used during comparison
        this.tempSchemaTypes = null;
        this.tempResourceDomains = null;
        this.tempPerformancePatterns = null;
    }

    compareHTMLStructure(structure1, structure2) {
        if (!structure1 || !structure2) {
            return { score: 0, error: 'Missing structure data' };
        }

        const comparisons = {
            doctype: this.compareDoctype(structure1.doctype, structure2.doctype),
            language: this.compareLanguage(structure1.lang, structure2.lang),
            charset: this.compareCharset(structure1.charset, structure2.charset),
            complexity: this.compareComplexity(structure1, structure2)
        };

        const avgScore = Object.values(comparisons).reduce((sum, comp) => sum + comp.score, 0) / Object.keys(comparisons).length;

        const result = {
            score: avgScore,
            details: comparisons,
            stats: {
                page1: {
                    headElements: structure1.headElementCount,
                    bodyElements: structure1.bodyElementCount
                },
                page2: {
                    headElements: structure2.headElementCount,
                    bodyElements: structure2.bodyElementCount
                }
            }
        };

        // 🧹 Clear comparisons object from memory
        Object.keys(comparisons).forEach(key => comparisons[key] = null);
        
        return result;
    }

    compareMetaTags(meta1, meta2) {
        if (!meta1 || !meta2) {
            return { score: 0, error: 'Missing meta tag data' };
        }

        // Important meta tags for comparison
        const importantTags = [
            'viewport', 'robots', 'author', 'generator',
            'og:type', 'og:site_name', 'twitter:card'
        ];

        const commonTags = Object.keys(meta1).filter(tag => meta2.hasOwnProperty(tag));
        const sharedImportantTags = importantTags.filter(tag => meta1[tag] && meta2[tag]);
        
        // Calculate similarity scores
        const tagOverlapScore = Object.keys(meta1).length > 0 && Object.keys(meta2).length > 0 ? 
            commonTags.length / Math.max(Object.keys(meta1).length, Object.keys(meta2).length) : 0;

        const valueMatchScore = commonTags.reduce((sum, tag) => {
            return sum + (meta1[tag] === meta2[tag] ? 1 : this.calculateStringSimilarity(meta1[tag], meta2[tag]));
        }, 0) / Math.max(commonTags.length, 1);

        const importantTagScore = importantTags.length > 0 ? 
            sharedImportantTags.length / importantTags.length : 0;

        const result = {
            score: (tagOverlapScore * 0.3 + valueMatchScore * 0.5 + importantTagScore * 0.2),
            details: {
                commonTags: commonTags.length,
                totalTags1: Object.keys(meta1).length,
                totalTags2: Object.keys(meta2).length,
                sharedImportantTags,
                exactMatches: commonTags.filter(tag => meta1[tag] === meta2[tag])
            },
            analysis: {
                tagOverlap: tagOverlapScore,
                valueMatch: valueMatchScore,
                importantTags: importantTagScore
            }
        };

        // 🧹 Clear temporary arrays
        commonTags.length = 0;
        sharedImportantTags.length = 0;
        
        return result;
    }

    compareSchemaMarkup(schemas1, schemas2) {
        if (!schemas1 && !schemas2) {
            return { score: 1, message: 'No schema markup on either page' };
        }

        if (!schemas1 || !schemas2) {
            return { 
                score: 0, 
                message: `Schema only present on ${schemas1 ? 'page 1' : 'page 2'}`,
                details: { schemas1: schemas1?.length || 0, schemas2: schemas2?.length || 0 }
            };
        }

        // Extract schema types
        const types1 = this.extractSchemaTypes(schemas1);
        const types2 = this.extractSchemaTypes(schemas2);
        
        const commonTypes = types1.filter(type => types2.includes(type));
        const jaccardSimilarity = (types1.length + types2.length) > 0 ? 
            (commonTypes.length * 2) / (types1.length + types2.length) : 0;

        // Compare schema content similarity
        const contentSimilarity = this.compareSchemaContent(schemas1, schemas2);

        return {
            score: (jaccardSimilarity * 0.6 + contentSimilarity * 0.4),
            details: {
                types1,
                types2,
                commonTypes,
                jaccardSimilarity,
                contentSimilarity
            },
            schemas: {
                count1: schemas1.length,
                count2: schemas2.length,
                commonCount: commonTypes.length
            }
        };
    }

    compareFrameworks(frameworks1, frameworks2) {
        if (!frameworks1 || !frameworks2) {
            return { score: 0, error: 'Missing framework data' };
        }

        const allFrameworks = new Set([...Object.keys(frameworks1), ...Object.keys(frameworks2)]);
        let totalWeight = 0;
        let matchedWeight = 0;

        const frameworkComparison = {};

        allFrameworks.forEach(framework => {
            const weight = this.frameworkWeights[framework] || 0.5;
            const present1 = frameworks1[framework] || false;
            const present2 = frameworks2[framework] || false;
            
            totalWeight += weight;
            if (present1 === present2) {
                matchedWeight += weight;
            }

            frameworkComparison[framework] = {
                page1: present1,
                page2: present2,
                match: present1 === present2,
                weight
            };
        });

        const frameworkScore = totalWeight > 0 ? matchedWeight / totalWeight : 1;

        return {
            score: frameworkScore,
            details: frameworkComparison,
            summary: {
                totalFrameworks: allFrameworks.size,
                matchingFrameworks: Object.values(frameworkComparison).filter(f => f.match).length,
                weightedScore: frameworkScore
            }
        };
    }

    compareResources(resources1, resources2) {
        if (!resources1 || !resources2) {
            return { score: 0, error: 'Missing resources data' };
        }

        const stylesheetSimilarity = this.compareResourceLists(
            resources1.stylesheets || [], 
            resources2.stylesheets || []
        );

        const scriptSimilarity = this.compareResourceLists(
            resources1.scripts || [], 
            resources2.scripts || []
        );

        // Analyze CDN usage patterns
        const cdnAnalysis = this.analyzeCDNUsage(resources1, resources2);

        return {
            score: (stylesheetSimilarity.score * 0.4 + scriptSimilarity.score * 0.4 + cdnAnalysis.score * 0.2),
            stylesheets: stylesheetSimilarity,
            scripts: scriptSimilarity,
            cdn: cdnAnalysis,
            summary: {
                totalResources1: (resources1.stylesheets?.length || 0) + (resources1.scripts?.length || 0),
                totalResources2: (resources2.stylesheets?.length || 0) + (resources2.scripts?.length || 0)
            }
        };
    }

    analyzePerformancePatterns(tech1, tech2) {
        // Analyze patterns that affect performance
        const resourceCount1 = (tech1.resources?.stylesheets?.length || 0) + (tech1.resources?.scripts?.length || 0);
        const resourceCount2 = (tech2.resources?.stylesheets?.length || 0) + (tech2.resources?.scripts?.length || 0);
        
        const resourceCountSimilarity = this.calculateNumericSimilarity(resourceCount1, resourceCount2, 50);
        
        const complexityScore1 = (tech1.structure?.headElementCount || 0) + (tech1.structure?.bodyElementCount || 0);
        const complexityScore2 = (tech2.structure?.headElementCount || 0) + (tech2.structure?.bodyElementCount || 0);
        
        const complexitySimilarity = this.calculateNumericSimilarity(complexityScore1, complexityScore2, 100);

        // Check for performance-affecting patterns
        const performancePatterns1 = this.identifyPerformancePatterns(tech1);
        const performancePatterns2 = this.identifyPerformancePatterns(tech2);
        
        const patternSimilarity = this.comparePerformancePatterns(performancePatterns1, performancePatterns2);

        return {
            score: (resourceCountSimilarity * 0.3 + complexitySimilarity * 0.3 + patternSimilarity * 0.4),
            resourceCount: {
                page1: resourceCount1,
                page2: resourceCount2,
                similarity: resourceCountSimilarity
            },
            complexity: {
                page1: complexityScore1,
                page2: complexityScore2,
                similarity: complexitySimilarity
            },
            patterns: {
                page1: performancePatterns1,
                page2: performancePatterns2,
                similarity: patternSimilarity
            }
        };
    }

    compareSEOTechnical(tech1, tech2) {
        // Compare SEO-related technical aspects
        const seoElements1 = this.extractSEOElements(tech1);
        const seoElements2 = this.extractSEOElements(tech2);
        
        const structuredDataScore = tech1.schemas && tech2.schemas ? 
            this.compareSchemaMarkup(tech1.schemas, tech2.schemas).score : 0;

        const metaSEOScore = this.compareSEOMetaTags(tech1.metaTags, tech2.metaTags);
        
        const technicalSEOScore = this.compareTechnicalSEO(seoElements1, seoElements2);

        return {
            score: (structuredDataScore * 0.4 + metaSEOScore * 0.3 + technicalSEOScore * 0.3),
            structuredData: structuredDataScore,
            metaSEO: metaSEOScore,
            technicalSEO: technicalSEOScore,
            elements: {
                page1: seoElements1,
                page2: seoElements2
            }
        };
    }

    // ========================================
    // HELPER METHODS
    // ========================================

    compareDoctype(doctype1, doctype2) {
        const match = (doctype1 || '').toLowerCase() === (doctype2 || '').toLowerCase();
        return {
            score: match ? 1 : 0,
            page1: doctype1,
            page2: doctype2,
            match
        };
    }

    compareLanguage(lang1, lang2) {
        const normalizedLang1 = (lang1 || '').toLowerCase().split('-')[0]; // Get base language
        const normalizedLang2 = (lang2 || '').toLowerCase().split('-')[0];
        const match = normalizedLang1 === normalizedLang2;
        
        return {
            score: match ? 1 : 0,
            page1: lang1,
            page2: lang2,
            match
        };
    }

    compareCharset(charset1, charset2) {
        const normalized1 = (charset1 || '').toLowerCase().replace('-', '');
        const normalized2 = (charset2 || '').toLowerCase().replace('-', '');
        const match = normalized1 === normalized2;
        
        return {
            score: match ? 1 : 0,
            page1: charset1,
            page2: charset2,
            match
        };
    }

    compareComplexity(structure1, structure2) {
        const complexity1 = (structure1.headElementCount || 0) + (structure1.bodyElementCount || 0);
        const complexity2 = (structure2.headElementCount || 0) + (structure2.bodyElementCount || 0);
        
        const similarity = this.calculateNumericSimilarity(complexity1, complexity2, 100);
        
        return {
            score: similarity,
            page1: complexity1,
            page2: complexity2,
            difference: Math.abs(complexity1 - complexity2)
        };
    }

    calculateStringSimilarity(str1, str2) {
        if (!str1 || !str2) return 0;
        if (str1 === str2) return 1;
        
        const maxLength = Math.max(str1.length, str2.length);
        if (maxLength === 0) return 1;
        
        // Simple Levenshtein-based similarity
        const distance = this.levenshteinDistance(str1, str2);
        return 1 - (distance / maxLength);
    }

    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    extractSchemaTypes(schemas) {
        const types = [];
        schemas.forEach(schema => {
            if (schema['@type']) {
                types.push(schema['@type']);
            } else if (schema.type) {
                types.push(schema.type);
            }
        });
        return [...new Set(types)];
    }

    compareSchemaContent(schemas1, schemas2) {
        // Simple content comparison based on JSON structure similarity
        const json1 = JSON.stringify(schemas1).toLowerCase();
        const json2 = JSON.stringify(schemas2).toLowerCase();
        
        return this.calculateStringSimilarity(json1, json2);
    }

    compareResourceLists(list1, list2) {
        const domains1 = list1.map(url => this.extractDomain(url));
        const domains2 = list2.map(url => this.extractDomain(url));
        
        const commonDomains = domains1.filter(domain => domains2.includes(domain));
        const jaccardSimilarity = (domains1.length + domains2.length) > 0 ? 
            (commonDomains.length * 2) / (domains1.length + domains2.length) : 0;

        // Check for exact resource matches
        const exactMatches = list1.filter(resource => list2.includes(resource));
        const exactMatchScore = Math.max(list1.length, list2.length) > 0 ? 
            (exactMatches.length * 2) / (list1.length + list2.length) : 0;

        return {
            score: (jaccardSimilarity * 0.6 + exactMatchScore * 0.4),
            domainSimilarity: jaccardSimilarity,
            exactMatches: exactMatches.length,
            commonDomains,
            stats: {
                count1: list1.length,
                count2: list2.length,
                commonDomainCount: commonDomains.length
            }
        };
    }

    extractDomain(url) {
        try {
            return new URL(url).hostname;
        } catch {
            return url.split('/')[0];
        }
    }

    analyzeCDNUsage(resources1, resources2) {
        const cdnPatterns = [
            'cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'unpkg.com',
            'code.jquery.com', 'maxcdn.bootstrapcdn.com', 'fonts.googleapis.com'
        ];

        const cdns1 = this.identifyCDNs(resources1, cdnPatterns);
        const cdns2 = this.identifyCDNs(resources2, cdnPatterns);

        const commonCDNs = cdns1.filter(cdn => cdns2.includes(cdn));
        const similarity = (cdns1.length + cdns2.length) > 0 ? 
            (commonCDNs.length * 2) / (cdns1.length + cdns2.length) : 1;

        return {
            score: similarity,
            cdns1,
            cdns2,
            commonCDNs,
            cdnUsage1: cdns1.length > 0,
            cdnUsage2: cdns2.length > 0
        };
    }

    identifyCDNs(resources, patterns) {
        const allResources = [...(resources.stylesheets || []), ...(resources.scripts || [])];
        const foundCDNs = new Set();

        allResources.forEach(resource => {
            patterns.forEach(pattern => {
                if (resource.includes(pattern)) {
                    foundCDNs.add(pattern);
                }
            });
        });

        return Array.from(foundCDNs);
    }

    calculateNumericSimilarity(num1, num2, maxDifference) {
        const difference = Math.abs(num1 - num2);
        return Math.max(0, 1 - (difference / maxDifference));
    }

    identifyPerformancePatterns(tech) {
        const patterns = [];
        
        // Check for common performance patterns
        if (tech.resources?.scripts?.length > 10) {
            patterns.push('many_scripts');
        }
        
        if (tech.resources?.stylesheets?.length > 5) {
            patterns.push('many_stylesheets');
        }
        
        if (tech.frameworks?.jquery && tech.frameworks?.react) {
            patterns.push('mixed_frameworks');
        }
        
        const resourceUrls = [...(tech.resources?.scripts || []), ...(tech.resources?.stylesheets || [])];
        if (resourceUrls.some(url => url.includes('google-analytics') || url.includes('gtag'))) {
            patterns.push('analytics');
        }
        
        return patterns;
    }

    comparePerformancePatterns(patterns1, patterns2) {
        const commonPatterns = patterns1.filter(pattern => patterns2.includes(pattern));
        const totalPatterns = new Set([...patterns1, ...patterns2]).size;
        
        return totalPatterns > 0 ? (commonPatterns.length * 2) / (patterns1.length + patterns2.length) : 1;
    }

    extractSEOElements(tech) {
        const elements = {
            hasStructuredData: tech.schemas && tech.schemas.length > 0,
            hasRobotsMeta: tech.metaTags && tech.metaTags.robots,
            hasViewportMeta: tech.metaTags && tech.metaTags.viewport,
            hasOGTags: tech.metaTags && Object.keys(tech.metaTags).some(key => key.startsWith('og:')),
            hasTwitterTags: tech.metaTags && Object.keys(tech.metaTags).some(key => key.startsWith('twitter:'))
        };
        
        return elements;
    }

    compareSEOMetaTags(meta1, meta2) {
        const seoTags = ['robots', 'description', 'keywords', 'author', 'canonical'];
        let matches = 0;
        let total = 0;
        
        seoTags.forEach(tag => {
            if (meta1 && meta1[tag] && meta2 && meta2[tag]) {
                total++;
                if (meta1[tag] === meta2[tag]) {
                    matches++;
                } else {
                    matches += this.calculateStringSimilarity(meta1[tag], meta2[tag]);
                }
            }
        });
        
        return total > 0 ? matches / total : 0;
    }

    compareTechnicalSEO(elements1, elements2) {
        const features = Object.keys(elements1);
        let matches = 0;
        
        features.forEach(feature => {
            if (elements1[feature] === elements2[feature]) {
                matches++;
            }
        });
        
        return features.length > 0 ? matches / features.length : 0;
    }

    calculateOverallScore(results) {
        const weights = {
            htmlStructure: 0.15,
            metaTags: 0.20,
            schemaMarkup: 0.15,
            frameworks: 0.20,
            resources: 0.15,
            performance: 0.10,
            seoTechnical: 0.05
        };
        
        const score = (
            results.htmlStructure.score * weights.htmlStructure +
            results.metaTags.score * weights.metaTags +
            results.schemaMarkup.score * weights.schemaMarkup +
            results.frameworks.score * weights.frameworks +
            results.resources.score * weights.resources +
            results.performance.score * weights.performance +
            results.seoTechnical.score * weights.seoTechnical
        );

        // 🧹 Clear weights object
        Object.keys(weights).forEach(key => weights[key] = null);
        
        return score;
    }
}

module.exports = TechnicalSimilarityAnalyzer;