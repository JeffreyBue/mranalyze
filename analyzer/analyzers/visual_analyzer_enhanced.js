const sharp = require('sharp');
const fs = require('fs').promises;

class EnhancedVisualAnalyzer {
    constructor(options = {}) {
        this.options = {
            colorTolerance: 10,
            enableScreenshots: true,
            compareViewports: true,  // New: compare across viewports
            viewports: {
                desktop: { width: 1200, height: 800, enabled: true },
                tablet: { width: 768, height: 1024, enabled: true },
                mobile: { width: 375, height: 667, enabled: true }
            },
            ...options
        };
    }

    async compare(page1, page2) {
        const results = {
            // Core visual metrics
            layout: await this.compareLayout(page1.visual, page2.visual),
            colors: await this.compareColors(page1.visual, page2.visual),
            typography: await this.compareTypography(page1.visual, page2.visual),
            cssClasses: await this.compareCSSClasses(page1.visual, page2.visual),
            
            // New: Responsive design analysis
            responsiveDesign: await this.compareResponsiveDesign(page1.visual, page2.visual),
            
            // New: Design system detection
            designSystem: await this.compareDesignSystems(page1.visual, page2.visual),
            
            // New: Visual hierarchy analysis
            visualHierarchy: await this.compareVisualHierarchy(page1.visual, page2.visual),
            
            // New: Spacing and grid analysis
            spacingGrid: await this.compareSpacingAndGrid(page1.visual, page2.visual)
        };

        // Screenshot comparison for multiple viewports
        if (this.options.enableScreenshots && this.options.compareViewports) {
            results.screenshots = await this.compareMultiViewportScreenshots(page1, page2);
        } else if (this.options.enableScreenshots) {
            results.screenshots = await this.compareScreenshots(
                page1.screenshotPath || page1.screenshots?.desktop, 
                page2.screenshotPath || page2.screenshots?.desktop
            );
        }

        // Calculate overall visual similarity score
        results.overallScore = this.calculateOverallScore(results);
        
        return results;
    }

    async compareResponsiveDesign(visual1, visual2) {
        const viewportData1 = visual1.viewportData || {};
        const viewportData2 = visual2.viewportData || {};
        
        const viewportScores = {};
        let totalScore = 0;
        let viewportCount = 0;
        
        for (const [viewport, data1] of Object.entries(viewportData1)) {
            if (viewportData2[viewport]) {
                const score = await this.compareViewportData(data1, viewportData2[viewport]);
                viewportScores[viewport] = score;
                totalScore += score.overall;
                viewportCount++;
            }
        }
        
        // Analyze responsive patterns
        const responsivePatterns1 = this.detectResponsivePatterns(viewportData1);
        const responsivePatterns2 = this.detectResponsivePatterns(viewportData2);
        const patternSimilarity = this.comparePatterns(responsivePatterns1, responsivePatterns2);
        
        return {
            score: viewportCount > 0 ? totalScore / viewportCount : 0,
            viewportScores,
            responsivePatterns: {
                page1: responsivePatterns1,
                page2: responsivePatterns2,
                similarity: patternSimilarity
            },
            breakpointConsistency: this.compareBreakpoints(visual1, visual2)
        };
    }

    async compareViewportData(data1, data2) {
        const layoutScore = this.compareViewportLayout(data1.layout, data2.layout);
        const elementVisibility = this.compareElementVisibility(data1.visibility, data2.visibility);
        const navigationChanges = this.compareNavigationAdaptation(data1.navigation, data2.navigation);
        
        return {
            overall: (layoutScore + elementVisibility + navigationChanges) / 3,
            layout: layoutScore,
            visibility: elementVisibility,
            navigation: navigationChanges
        };
    }

    compareViewportLayout(layout1, layout2) {
        if (!layout1 || !layout2) return 0;
        
        let score = 0;
        let comparisons = 0;
        
        // Compare layout structure
        const layoutFeatures = ['hasHamburgerMenu', 'isStacked', 'columnCount', 'hasStickyHeader'];
        
        layoutFeatures.forEach(feature => {
            if (layout1[feature] !== undefined && layout2[feature] !== undefined) {
                if (layout1[feature] === layout2[feature]) score += 1;
                comparisons++;
            }
        });
        
        return comparisons > 0 ? score / comparisons : 0;
    }

    compareElementVisibility(visibility1, visibility2) {
        if (!visibility1 || !visibility2) return 0;
        
        const elements1 = new Set(visibility1.visible || []);
        const elements2 = new Set(visibility2.visible || []);
        
        const intersection = new Set([...elements1].filter(x => elements2.has(x)));
        const union = new Set([...elements1, ...elements2]);
        
        return union.size > 0 ? intersection.size / union.size : 0;
    }

    compareNavigationAdaptation(nav1, nav2) {
        if (!nav1 || !nav2) return 0;
        
        let score = 0;
        if (nav1.type === nav2.type) score += 0.5; // hamburger, dropdown, etc.
        if (nav1.position === nav2.position) score += 0.5; // top, bottom, side
        
        return score;
    }

    detectResponsivePatterns(viewportData) {
        const patterns = {
            hasResponsiveImages: false,
            hasFluidTypography: false,
            hasGridSystem: false,
            hasMobileFirst: false,
            layoutStrategy: 'unknown' // 'reflow', 'hide', 'stack', 'adaptive'
        };
        
        if (!viewportData || Object.keys(viewportData).length < 2) return patterns;
        
        // Detect responsive images
        if (viewportData.mobile?.images && viewportData.desktop?.images) {
            patterns.hasResponsiveImages = viewportData.mobile.images.some(img => 
                img.srcset || img.sizes || img.responsiveLoading
            );
        }
        
        // Detect fluid typography
        if (viewportData.mobile?.typography && viewportData.desktop?.typography) {
            const mobileFontSize = parseFloat(viewportData.mobile.typography.baseFontSize);
            const desktopFontSize = parseFloat(viewportData.desktop.typography.baseFontSize);
            patterns.hasFluidTypography = mobileFontSize !== desktopFontSize;
        }
        
        // Detect layout strategy
        patterns.layoutStrategy = this.detectLayoutStrategy(viewportData);
        
        return patterns;
    }

    detectLayoutStrategy(viewportData) {
        if (!viewportData.mobile || !viewportData.desktop) return 'unknown';
        
        const mobileElements = viewportData.mobile.visibility?.visible || [];
        const desktopElements = viewportData.desktop.visibility?.visible || [];
        
        const hiddenOnMobile = desktopElements.filter(el => !mobileElements.includes(el));
        const mobileLayout = viewportData.mobile.layout;
        
        if (hiddenOnMobile.length > desktopElements.length * 0.3) {
            return 'hide';
        } else if (mobileLayout?.isStacked) {
            return 'stack';
        } else if (mobileLayout?.hasAdaptiveComponents) {
            return 'adaptive';
        } else {
            return 'reflow';
        }
    }

    comparePatterns(patterns1, patterns2) {
        let matches = 0;
        let total = 0;
        
        Object.keys(patterns1).forEach(key => {
            if (patterns1[key] === patterns2[key]) matches++;
            total++;
        });
        
        return total > 0 ? matches / total : 0;
    }

    compareBreakpoints(visual1, visual2) {
        const breakpoints1 = visual1.detectedBreakpoints || [];
        const breakpoints2 = visual2.detectedBreakpoints || [];
        
        if (breakpoints1.length === 0 || breakpoints2.length === 0) return 0;
        
        // Check if breakpoints are similar (within 50px)
        let matches = 0;
        breakpoints1.forEach(bp1 => {
            if (breakpoints2.some(bp2 => Math.abs(bp1 - bp2) <= 50)) {
                matches++;
            }
        });
        
        return matches / Math.max(breakpoints1.length, breakpoints2.length);
    }

    async compareDesignSystems(visual1, visual2) {
        const system1 = this.detectDesignSystem(visual1);
        const system2 = this.detectDesignSystem(visual2);
        
        const componentSimilarity = this.compareComponentPatterns(
            visual1.componentPatterns || {}, 
            visual2.componentPatterns || {}
        );
        
        const spacingConsistency = this.compareSpacingSystem(
            visual1.spacingSystem || {},
            visual2.spacingSystem || {}
        );
        
        // Fix colorSystemMatch to handle missing colorPalette
        let colorSystemMatch = 0;
        if (visual1.colorPalette && visual2.colorPalette) {
            colorSystemMatch = this.compareColorSystems(
                visual1.colorPalette,
                visual2.colorPalette
            );
        }
        
        return {
            score: (componentSimilarity + spacingConsistency + colorSystemMatch) / 3,
            detectedSystems: {
                page1: system1,
                page2: system2,
                match: system1.name === system2.name
            },
            components: {
                similarity: componentSimilarity,
                sharedPatterns: this.findSharedComponentPatterns(visual1, visual2)
            },
            spacing: {
                similarity: spacingConsistency,
                baseUnit1: visual1.spacingSystem?.baseUnit,
                baseUnit2: visual2.spacingSystem?.baseUnit
            },
            colorSystem: {
                similarity: colorSystemMatch,
                primaryMatch: visual1.colorPalette?.primary && visual2.colorPalette?.primary ? 
                    this.compareColor(
                        visual1.colorPalette.primary,
                        visual2.colorPalette.primary
                    ) : 0
            }
        };
    }

    detectDesignSystem(visual) {
        const cssClasses = visual.cssClasses || [];
        const frameworks = visual.detectedFrameworks || {};
        
        // Check for common design systems
        const designSystems = {
            bootstrap: /^(btn|col|container|row|card|nav)/,
            material: /^(mat-|md-|mdc-)/,
            tailwind: /^(bg-|text-|p-|m-|flex|grid)/,
            foundation: /^(small-|medium-|large-|xlarge-)/,
            bulma: /^(button|column|container|hero|section)/,
            semantic: /^(ui\s)/,
            custom: /^(c-|l-|u-|is-|has-)/ // BEM or custom conventions
        };
        
        let detectedSystem = { name: 'custom', confidence: 0 };
        
        for (const [system, pattern] of Object.entries(designSystems)) {
            const matches = cssClasses.filter(cls => pattern.test(cls)).length;
            const confidence = matches / Math.max(cssClasses.length, 1);
            
            if (confidence > detectedSystem.confidence) {
                detectedSystem = { name: system, confidence };
            }
        }
        
        return detectedSystem;
    }

    compareComponentPatterns(patterns1, patterns2) {
        const components = ['buttons', 'cards', 'forms', 'navigation', 'modals'];
        let totalScore = 0;
        let componentCount = 0;
        
        components.forEach(component => {
            if (patterns1[component] && patterns2[component]) {
                const similarity = this.compareComponentStyles(
                    patterns1[component],
                    patterns2[component]
                );
                totalScore += similarity;
                componentCount++;
            }
        });
        
        return componentCount > 0 ? totalScore / componentCount : 0;
    }

    compareComponentStyles(style1, style2) {
        let score = 0;
        let attributes = 0;
        
        const compareAttributes = ['borderRadius', 'boxShadow', 'padding', 'typography'];
        
        compareAttributes.forEach(attr => {
            if (style1[attr] && style2[attr]) {
                if (this.areStylesSimila(style1[attr], style2[attr])) {
                    score++;
                }
                attributes++;
            }
        });
        
        return attributes > 0 ? score / attributes : 0;
    }

    areStylesSimila(style1, style2) {
        if (typeof style1 === 'string' && typeof style2 === 'string') {
            return style1 === style2;
        }
        
        if (typeof style1 === 'number' && typeof style2 === 'number') {
            return Math.abs(style1 - style2) / Math.max(style1, style2) < 0.1;
        }
        
        return false;
    }

    compareSpacingSystem(spacing1, spacing2) {
        if (!spacing1.baseUnit || !spacing2.baseUnit) return 0;
        
        const unitDiff = Math.abs(spacing1.baseUnit - spacing2.baseUnit);
        const unitSimilarity = 1 - (unitDiff / Math.max(spacing1.baseUnit, spacing2.baseUnit));
        
        const scale1 = spacing1.scale || [];
        const scale2 = spacing2.scale || [];
        
        let scaleSimilarity = 0;
        if (scale1.length > 0 && scale2.length > 0) {
            const commonScales = scale1.filter(s => scale2.includes(s)).length;
            scaleSimilarity = commonScales / Math.max(scale1.length, scale2.length);
        }
        
        return (unitSimilarity + scaleSimilarity) / 2;
    }

    compareColorSystems(palette1, palette2) {
        if (!palette1 || !palette2) {
            return 0;
        }
        
        const colorRoles = ['primary', 'secondary', 'accent', 'neutral', 'success', 'warning', 'error'];
        let matches = 0;
        let total = 0;
        
        colorRoles.forEach(role => {
            if (palette1[role] && palette2[role]) {
                const similarity = this.compareColor(palette1[role], palette2[role]);
                if (similarity > 0.8) matches++;
                total++;
            }
        });
        
        return total > 0 ? matches / total : 0;
    }

    findSharedComponentPatterns(visual1, visual2) {
        const patterns1 = visual1.componentPatterns || {};
        const patterns2 = visual2.componentPatterns || {};
        
        const shared = [];
        
        Object.keys(patterns1).forEach(component => {
            if (patterns2[component]) {
                const similarity = this.compareComponentStyles(patterns1[component], patterns2[component]);
                if (similarity > 0.7) {
                    shared.push({
                        component,
                        similarity,
                        style1: patterns1[component],
                        style2: patterns2[component]
                    });
                }
            }
        });
        
        return shared;
    }

    async compareVisualHierarchy(visual1, visual2) {
        const hierarchy1 = this.analyzeVisualHierarchy(visual1);
        const hierarchy2 = this.analyzeVisualHierarchy(visual2);
        
        const emphasisSimilarity = this.compareEmphasisPatterns(
            hierarchy1.emphasis,
            hierarchy2.emphasis
        );
        
        const flowSimilarity = this.compareVisualFlow(
            hierarchy1.flow,
            hierarchy2.flow
        );
        
        const contrastUsage = this.compareContrastUsage(
            hierarchy1.contrast,
            hierarchy2.contrast
        );
        
        return {
            score: (emphasisSimilarity + flowSimilarity + contrastUsage) / 3,
            emphasis: {
                similarity: emphasisSimilarity,
                page1: hierarchy1.emphasis,
                page2: hierarchy2.emphasis
            },
            flow: {
                similarity: flowSimilarity,
                page1: hierarchy1.flow,
                page2: hierarchy2.flow
            },
            contrast: {
                similarity: contrastUsage,
                page1: hierarchy1.contrast,
                page2: hierarchy2.contrast
            }
        };
    }

    analyzeVisualHierarchy(visual) {
        const elementStyles = visual.elementStyles || {};
        
        // Analyze emphasis through size and weight with null checks
        const emphasis = {
            primarySize: 0,
            secondarySize: 0,
            bodySize: 0,
            sizeRatio: 0
        };
        
        // Safely parse font sizes
        if (elementStyles.h1 && elementStyles.h1.fontSize) {
            emphasis.primarySize = parseFloat(elementStyles.h1.fontSize) || 0;
        }
        if (elementStyles.h2 && elementStyles.h2.fontSize) {
            emphasis.secondarySize = parseFloat(elementStyles.h2.fontSize) || 0;
        }
        if (elementStyles.body && elementStyles.body.fontSize) {
            emphasis.bodySize = parseFloat(elementStyles.body.fontSize) || 0;
        }
        
        if (emphasis.bodySize > 0 && emphasis.primarySize > 0) {
            emphasis.sizeRatio = emphasis.primarySize / emphasis.bodySize;
        }
        
        // Analyze visual flow
        const flow = {
            alignment: this.detectAlignment(visual),
            direction: this.detectReadingDirection(visual),
            whitespaceUsage: this.analyzeWhitespace(visual)
        };
        
        // Analyze contrast
        const contrast = {
            textContrast: this.calculateAverageContrast(visual),
            emphasisMethods: this.detectEmphasisMethods(visual)
        };
        
        return { emphasis, flow, contrast };
    }

    detectAlignment(visual) {
        // Simplified alignment detection
        const layout = visual.layout || {};
        if (layout.isCentered) return 'center';
        if (layout.isLeftAligned) return 'left';
        if (layout.isRightAligned) return 'right';
        return 'mixed';
    }

    detectReadingDirection(visual) {
        // Simplified - could be enhanced with actual layout analysis
        return visual.layout?.rtl ? 'rtl' : 'ltr';
    }

    analyzeWhitespace(visual) {
        const spacing = visual.spacingMetrics || {};
        return {
            density: spacing.contentDensity || 'medium',
            consistency: spacing.spacingConsistency || 0
        };
    }

    calculateAverageContrast(visual) {
        const elementStyles = visual.elementStyles || {};
        let totalContrast = 0;
        let count = 0;
        
        Object.values(elementStyles).forEach(style => {
            if (style && typeof style === 'object' && style.color && style.backgroundColor) {
                // This would need actual contrast calculation
                totalContrast += 1; // Placeholder
                count++;
            }
        });
        
        return count > 0 ? totalContrast / count : 0;
    }

    detectEmphasisMethods(visual) {
        const methods = [];
        const styles = visual.elementStyles || {};
        
        // Check for various emphasis methods with null checks
        if (styles.h1 && styles.h1.fontWeight && parseInt(styles.h1.fontWeight) > 600) {
            methods.push('bold');
        }
        if (styles.accent && styles.accent.color) {
            methods.push('color');
        }
        if (styles.highlight && styles.highlight.backgroundColor) {
            methods.push('background');
        }
        if (visual.hasItalics) methods.push('italic');
        if (visual.hasUnderlines) methods.push('underline');
        
        return methods;
    }

    compareEmphasisPatterns(emphasis1, emphasis2) {
        if (!emphasis1 || !emphasis2) return 0;
        
        const ratioSimilarity = emphasis1.sizeRatio && emphasis2.sizeRatio ?
            1 - Math.abs(emphasis1.sizeRatio - emphasis2.sizeRatio) / Math.max(emphasis1.sizeRatio, emphasis2.sizeRatio) : 0;
        
        return ratioSimilarity;
    }

    compareVisualFlow(flow1, flow2) {
        if (!flow1 || !flow2) return 0;
        
        let score = 0;
        if (flow1.alignment === flow2.alignment) score += 0.4;
        if (flow1.direction === flow2.direction) score += 0.3;
        if (flow1.whitespaceUsage?.density === flow2.whitespaceUsage?.density) score += 0.3;
        
        return score;
    }

    compareContrastUsage(contrast1, contrast2) {
        if (!contrast1 || !contrast2) return 0;
        
        const methods1 = new Set(contrast1.emphasisMethods || []);
        const methods2 = new Set(contrast2.emphasisMethods || []);
        
        const commonMethods = [...methods1].filter(m => methods2.has(m)).length;
        const totalMethods = new Set([...methods1, ...methods2]).size;
        
        return totalMethods > 0 ? commonMethods / totalMethods : 0;
    }

    async compareSpacingAndGrid(visual1, visual2) {
        const grid1 = this.analyzeGridSystem(visual1);
        const grid2 = this.analyzeGridSystem(visual2);
        
        const gridSimilarity = this.compareGridSystems(grid1, grid2);
        const spacingRhythm = this.compareSpacingRhythm(
            visual1.spacingMetrics || {},
            visual2.spacingMetrics || {}
        );
        
        return {
            score: (gridSimilarity + spacingRhythm) / 2,
            grid: {
                similarity: gridSimilarity,
                system1: grid1,
                system2: grid2
            },
            spacing: {
                similarity: spacingRhythm,
                metrics1: visual1.spacingMetrics,
                metrics2: visual2.spacingMetrics
            }
        };
    }

    analyzeGridSystem(visual) {
        const grid = {
            type: 'unknown', // 'flexbox', 'grid', 'float', 'table'
            columns: 0,
            gutterSize: 0,
            containerWidth: visual.layout?.containerWidth || 0,
            isResponsive: false
        };
        
        // Detect grid type from CSS classes
        const cssClasses = visual.cssClasses || [];
        if (cssClasses.some(c => c.includes('flex'))) grid.type = 'flexbox';
        else if (cssClasses.some(c => c.includes('grid'))) grid.type = 'grid';
        else if (cssClasses.some(c => c.includes('col-'))) grid.type = 'column-based';
        
        // Detect columns
        const colMatches = cssClasses.filter(c => c.match(/col-(\d+)/));
        if (colMatches.length > 0) {
            grid.columns = 12; // Assume 12-column grid
            grid.isResponsive = cssClasses.some(c => c.includes('sm-') || c.includes('md-') || c.includes('lg-'));
        }
        
        return grid;
    }

    compareGridSystems(grid1, grid2) {
        let score = 0;
        
        if (grid1.type === grid2.type) score += 0.4;
        if (grid1.columns === grid2.columns) score += 0.3;
        if (grid1.isResponsive === grid2.isResponsive) score += 0.3;
        
        return score;
    }

    compareSpacingRhythm(metrics1, metrics2) {
        if (!metrics1.rhythm || !metrics2.rhythm) return 0;
        
        // Compare spacing consistency
        const consistency1 = metrics1.spacingConsistency || 0;
        const consistency2 = metrics2.spacingConsistency || 0;
        const consistencyDiff = Math.abs(consistency1 - consistency2);
        
        return 1 - (consistencyDiff / Math.max(consistency1, consistency2, 1));
    }

    async compareMultiViewportScreenshots(page1, page2) {
        const results = {};
        const screenshots1 = page1.screenshots || {};
        const screenshots2 = page2.screenshots || {};
        
        for (const [viewport, enabled] of Object.entries(this.options.viewports)) {
            if (enabled && screenshots1[viewport] && screenshots2[viewport]) {
                results[viewport] = await this.compareScreenshots(
                    screenshots1[viewport],
                    screenshots2[viewport]
                );
            }
        }
        
        // Calculate combined score
        const scores = Object.values(results).map(r => r.score);
        const overallScore = scores.length > 0 ? 
            scores.reduce((a, b) => a + b, 0) / scores.length : 0;
        
        return {
            score: overallScore,
            viewports: results,
            responsiveConsistency: this.calculateResponsiveConsistency(results)
        };
    }

    calculateResponsiveConsistency(viewportResults) {
        const scores = Object.values(viewportResults).map(r => r.score);
        if (scores.length < 2) return 1;
        
        // Calculate variance in scores across viewports
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        const variance = scores.reduce((sum, score) => sum + Math.pow(score - avg, 2), 0) / scores.length;
        
        // Convert variance to consistency score (lower variance = higher consistency)
        return 1 - Math.min(variance, 1);
    }

    // Keep existing methods...
    async compareLayout(visual1, visual2) {
        const layout1 = visual1.layout;
        const layout2 = visual2.layout;
        
        const layoutFeatures = ['hasHeader', 'hasNav', 'hasSidebar', 'hasFooter'];
        let matches = 0;
        const details = {};
        
        layoutFeatures.forEach(feature => {
            const match = layout1[feature] === layout2[feature];
            matches += match ? 1 : 0;
            details[feature] = {
                page1: layout1[feature],
                page2: layout2[feature],
                match
            };
        });
        
        const dimensionSimilarity = this.compareDimensions(layout1, layout2);
        
        return {
            structuralSimilarity: matches / layoutFeatures.length,
            dimensionSimilarity,
            details,
            score: (matches / layoutFeatures.length + dimensionSimilarity) / 2
        };
    }

    compareDimensions(layout1, layout2) {
        const aspectRatio1 = layout1.containerWidth / layout1.containerHeight;
        const aspectRatio2 = layout2.containerWidth / layout2.containerHeight;
        
        const aspectDiff = Math.abs(aspectRatio1 - aspectRatio2);
        const maxAspectDiff = 1.0;
        
        return Math.max(0, 1 - (aspectDiff / maxAspectDiff));
    }

    async compareColors(visual1, visual2) {
        // Handle both old and new data formats
        const colors1 = this.extractColors(visual1.elementStyles || visual1);
        const colors2 = this.extractColors(visual2.elementStyles || visual2);
        
        const colorComparisons = {};
        let totalSimilarity = 0;
        let comparisonCount = 0;
        
        Object.keys(colors1).forEach(element => {
            if (colors2[element]) {
                const similarity = this.compareColorPalette(colors1[element], colors2[element]);
                if (similarity && typeof similarity.score === 'number') {
                    colorComparisons[element] = similarity;
                    totalSimilarity += similarity.score;
                    comparisonCount++;
                }
            }
        });
        
        return {
            elementComparisons: colorComparisons,
            overallColorSimilarity: comparisonCount > 0 ? totalSimilarity / comparisonCount : 0,
            score: comparisonCount > 0 ? totalSimilarity / comparisonCount : 0
        };
    }

    extractColors(elementStyles) {
        if (!elementStyles || typeof elementStyles !== 'object') {
            return {};
        }
        
        const colors = {};
        
        Object.keys(elementStyles).forEach(element => {
            const styles = elementStyles[element];
            if (styles && typeof styles === 'object') {
                // Only add if we have valid color data
                if (styles.backgroundColor || styles.color) {
                    colors[element] = {
                        backgroundColor: styles.backgroundColor || null,
                        textColor: styles.color || null
                    };
                }
            }
        });
        
        return colors;
    }

    compareColorPalette(palette1, palette2) {
        if (!palette1 || !palette2) {
            return { score: 0 };
        }
        
        let bgSimilarity = 0;
        let textSimilarity = 0;
        let validComparisons = 0;
        
        // Compare background colors if both exist
        if (palette1.backgroundColor && palette2.backgroundColor) {
            bgSimilarity = this.compareColor(palette1.backgroundColor, palette2.backgroundColor);
            validComparisons++;
        }
        
        // Compare text colors if both exist
        if (palette1.textColor && palette2.textColor) {
            textSimilarity = this.compareColor(palette1.textColor, palette2.textColor);
            validComparisons++;
        }
        
        // If no valid comparisons, return 0
        if (validComparisons === 0) {
            return {
                backgroundColor: {
                    color1: palette1.backgroundColor,
                    color2: palette2.backgroundColor,
                    similarity: 0
                },
                textColor: {
                    color1: palette1.textColor,
                    color2: palette2.textColor,
                    similarity: 0
                },
                score: 0
            };
        }
        
        // Calculate average only of valid comparisons
        const totalScore = bgSimilarity + textSimilarity;
        
        return {
            backgroundColor: {
                color1: palette1.backgroundColor,
                color2: palette2.backgroundColor,
                similarity: palette1.backgroundColor && palette2.backgroundColor ? bgSimilarity : 0
            },
            textColor: {
                color1: palette1.textColor,
                color2: palette2.textColor,
                similarity: palette1.textColor && palette2.textColor ? textSimilarity : 0
            },
            score: totalScore / validComparisons
        };
    }

    compareColor(color1, color2) {
        if (!color1 || !color2) return 0;
        
        const rgb1 = this.parseColor(color1);
        const rgb2 = this.parseColor(color2);
        
        if (!rgb1 || !rgb2) return 0;
        
        const distance = Math.sqrt(
            Math.pow(rgb1.r - rgb2.r, 2) +
            Math.pow(rgb1.g - rgb2.g, 2) +
            Math.pow(rgb1.b - rgb2.b, 2)
        );
        
        const maxDistance = 441;
        const similarity = 1 - (distance / maxDistance);
        
        return Math.max(0, similarity);
    }

    extractColorPalette(elementStyles) {
        const palette = {
            primary: null,
            secondary: null,
            accent: null,
            neutral: null,
            background: null,
            text: null
        };
        
        if (!elementStyles || typeof elementStyles !== 'object') {
            return palette;
        }
        
        // Extract primary from headings or buttons (with null checks)
        if (elementStyles.h1 && elementStyles.h1.color) {
            palette.primary = elementStyles.h1.color;
        } else if (elementStyles.button && elementStyles.button.backgroundColor) {
            palette.primary = elementStyles.button.backgroundColor;
        }
        
        // Extract background and text (with null checks)
        if (elementStyles.body) {
            if (elementStyles.body.backgroundColor) {
                palette.background = elementStyles.body.backgroundColor;
            }
            if (elementStyles.body.color) {
                palette.text = elementStyles.body.color;
            }
        }
        
        return palette;
    }

    parseColor(colorString) {
        if (!colorString) return null;
        
        const rgbMatch = colorString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
            return {
                r: parseInt(rgbMatch[1]),
                g: parseInt(rgbMatch[2]),
                b: parseInt(rgbMatch[3])
            };
        }
        
        const rgbaMatch = colorString.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
        if (rgbaMatch) {
            return {
                r: parseInt(rgbaMatch[1]),
                g: parseInt(rgbaMatch[2]),
                b: parseInt(rgbaMatch[3])
            };
        }
        
        const hexMatch = colorString.match(/^#([0-9a-f]{6})$/i);
        if (hexMatch) {
            const hex = hexMatch[1];
            return {
                r: parseInt(hex.slice(0, 2), 16),
                g: parseInt(hex.slice(2, 4), 16),
                b: parseInt(hex.slice(4, 6), 16)
            };
        }
        
        return null;
    }

    async compareTypography(visual1, visual2) {
        const typo1 = this.extractTypography(visual1.elementStyles);
        const typo2 = this.extractTypography(visual2.elementStyles);
        
        const comparisons = {};
        let totalSimilarity = 0;
        let comparisonCount = 0;
        
        Object.keys(typo1).forEach(element => {
            if (typo2[element]) {
                const similarity = this.compareTypographyElement(typo1[element], typo2[element]);
                comparisons[element] = similarity;
                totalSimilarity += similarity.score;
                comparisonCount++;
            }
        });
        
        return {
            elementComparisons: comparisons,
            score: comparisonCount > 0 ? totalSimilarity / comparisonCount : 0
        };
    }

    extractTypography(elementStyles) {
        const typography = {};
        
        if (!elementStyles || typeof elementStyles !== 'object') {
            return typography;
        }
        
        Object.keys(elementStyles).forEach(element => {
            if (elementStyles[element] && typeof elementStyles[element] === 'object') {
                typography[element] = {
                    fontSize: elementStyles[element].fontSize || null,
                    fontFamily: elementStyles[element].fontFamily || null,
                    fontWeight: elementStyles[element].fontWeight || null
                };
            }
        });
        
        return typography;
    }

    compareTypographyElement(typo1, typo2) {
        const fontSizeScore = this.compareFontSize(typo1.fontSize, typo2.fontSize);
        const fontFamilyScore = this.compareFontFamily(typo1.fontFamily, typo2.fontFamily);
        const fontWeightScore = this.compareFontWeight(typo1.fontWeight, typo2.fontWeight);
        
        return {
            fontSize: {
                value1: typo1.fontSize,
                value2: typo2.fontSize,
                score: fontSizeScore
            },
            fontFamily: {
                value1: typo1.fontFamily,
                value2: typo2.fontFamily,
                score: fontFamilyScore
            },
            fontWeight: {
                value1: typo1.fontWeight,
                value2: typo2.fontWeight,
                score: fontWeightScore
            },
            score: (fontSizeScore + fontFamilyScore + fontWeightScore) / 3
        };
    }

    compareFontSize(size1, size2) {
        if (!size1 || !size2) return 0;
        
        const px1 = this.parseFontSize(size1);
        const px2 = this.parseFontSize(size2);
        
        if (!px1 || !px2) return 0;
        
        const diff = Math.abs(px1 - px2);
        const maxDiff = Math.max(px1, px2);
        
        return maxDiff > 0 ? Math.max(0, 1 - (diff / maxDiff)) : 1;
    }

    parseFontSize(fontSize) {
        if (!fontSize) return null;
        
        const pxMatch = fontSize.match(/(\d+(?:\.\d+)?)px/);
        if (pxMatch) return parseFloat(pxMatch[1]);
        
        const emMatch = fontSize.match(/(\d+(?:\.\d+)?)em/);
        if (emMatch) return parseFloat(emMatch[1]) * 16;
        
        return null;
    }

    compareFontFamily(family1, family2) {
        if (!family1 || !family2) return 0;
        
        const normalize = (family) => family.toLowerCase()
            .replace(/["']/g, '')
            .split(',')
            .map(f => f.trim())
            .filter(f => f && !f.includes('serif') && !f.includes('sans-serif') && !f.includes('monospace'));
        
        const fonts1 = normalize(family1);
        const fonts2 = normalize(family2);
        
        for (const font1 of fonts1) {
            for (const font2 of fonts2) {
                if (font1 === font2) return 1;
            }
        }
        
        const categories = {
            serif: ['times', 'georgia', 'serif'],
            sansSerif: ['arial', 'helvetica', 'sans-serif', 'roboto', 'open sans'],
            monospace: ['courier', 'monaco', 'monospace', 'consolas']
        };
        
        const getCategory = (fonts) => {
            for (const [category, keywords] of Object.entries(categories)) {
                if (fonts.some(font => keywords.some(keyword => font.includes(keyword)))) {
                    return category;
                }
            }
            return 'other';
        };
        
        const cat1 = getCategory(fonts1);
        const cat2 = getCategory(fonts2);
        
        return cat1 === cat2 ? 0.7 : 0;
    }

    compareFontWeight(weight1, weight2) {
        if (!weight1 || !weight2) return 0;
        
        const normalize = (weight) => {
            if (typeof weight === 'string') {
                const weightMap = {
                    'normal': 400,
                    'bold': 700,
                    'lighter': 300,
                    'bolder': 600
                };
                return weightMap[weight] || parseInt(weight) || 400;
            }
            return parseInt(weight) || 400;
        };
        
        const w1 = normalize(weight1);
        const w2 = normalize(weight2);
        
        const diff = Math.abs(w1 - w2);
        const maxDiff = 600;
        
        return Math.max(0, 1 - (diff / maxDiff));
    }

    async compareScreenshots(screenshot1Path, screenshot2Path) {
        try {
            const image1 = sharp(screenshot1Path);
            const image2 = sharp(screenshot2Path);
            
            const meta1 = await image1.metadata();
            const meta2 = await image2.metadata();
            
            const targetWidth = 200;
            const targetHeight = 300;
            
            const resized1 = await image1
                .resize(targetWidth, targetHeight, { fit: 'cover' })
                .raw()
                .toBuffer();
                
            const resized2 = await image2
                .resize(targetWidth, targetHeight, { fit: 'cover' })
                .raw()
                .toBuffer();
            
            const structuralSimilarity = this.calculateImageSimilarity(resized1, resized2, targetWidth, targetHeight);
            
            return {
                structuralSimilarity,
                dimensionsSimilarity: this.compareDimensions(
                    { containerWidth: meta1.width, containerHeight: meta1.height },
                    { containerWidth: meta2.width, containerHeight: meta2.height }
                ),
                score: (structuralSimilarity + 0.3) / 1.3
            };
            
        } catch (error) {
            console.warn(`Screenshot comparison failed: ${error.message}`);
            return {
                structuralSimilarity: 0,
                dimensionsSimilarity: 0,
                score: 0,
                error: error.message
            };
        }
    }

    calculateImageSimilarity(buffer1, buffer2, width, height) {
        if (buffer1.length !== buffer2.length) return 0;
        
        let totalDiff = 0;
        const pixelCount = width * height;
        const channels = 3;
        
        for (let i = 0; i < buffer1.length; i += channels) {
            const r1 = buffer1[i], g1 = buffer1[i + 1], b1 = buffer1[i + 2];
            const r2 = buffer2[i], g2 = buffer2[i + 1], b2 = buffer2[i + 2];
            
            const pixelDiff = Math.sqrt(
                Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
            );
            
            totalDiff += pixelDiff;
        }
        
        const avgDiff = totalDiff / pixelCount;
        const maxDiff = Math.sqrt(3 * Math.pow(255, 2));
        
        return Math.max(0, 1 - (avgDiff / maxDiff));
    }

    async compareCSSClasses(visual1, visual2) {
        const classes1 = new Set(visual1.cssClasses || []);
        const classes2 = new Set(visual2.cssClasses || []);
        
        const intersection = new Set([...classes1].filter(x => classes2.has(x)));
        const union = new Set([...classes1, ...classes2]);
        
        const jaccardSimilarity = union.size > 0 ? intersection.size / union.size : 0;
        
        return {
            sharedClasses: Array.from(intersection),
            uniqueToPage1: Array.from(new Set([...classes1].filter(x => !classes2.has(x)))),
            uniqueToPage2: Array.from(new Set([...classes2].filter(x => !classes1.has(x)))),
            jaccardSimilarity,
            score: jaccardSimilarity
        };
    }

    calculateOverallScore(results) {
        const weights = {
            layout: 0.15,
            colors: 0.15,
            typography: 0.10,
            cssClasses: 0.05,
            responsiveDesign: 0.20,
            designSystem: 0.15,
            visualHierarchy: 0.10,
            spacingGrid: 0.10
        };
        
        let totalScore = 0;
        let totalWeight = 0;
        
        Object.entries(weights).forEach(([metric, weight]) => {
            if (results[metric] && typeof results[metric].score === 'number') {
                totalScore += results[metric].score * weight;
                totalWeight += weight;
            }
        });
        
        // Add screenshot score if available
        if (results.screenshots && typeof results.screenshots.score === 'number') {
            const screenshotWeight = 0.15;
            totalScore += results.screenshots.score * screenshotWeight;
            totalWeight += screenshotWeight;
        }
        
        return totalWeight > 0 ? totalScore / totalWeight : 0;
    }
}

module.exports = EnhancedVisualAnalyzer;