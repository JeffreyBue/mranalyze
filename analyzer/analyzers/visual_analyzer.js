const sharp = require('sharp');
const fs = require('fs').promises;

class VisualSimilarityAnalyzer {
    constructor(options = {}) {
        this.colorTolerance = 10; // RGB color difference tolerance
        this.enableScreenshots = options.enableScreenshots !== false; // Default true
    }

    async compare(page1, page2) {
        const results = {
            layout: await this.compareLayout(page1.visual, page2.visual),
            colors: await this.compareColors(page1.visual, page2.visual),
            typography: await this.compareTypography(page1.visual, page2.visual),
            cssClasses: await this.compareCSSClasses(page1.visual, page2.visual)
        };

        // Only do screenshot comparison if enabled (memory intensive)
        if (this.enableScreenshots) {
            results.screenshot = await this.compareScreenshots(page1.screenshotPath, page2.screenshotPath);
        } else {
            results.screenshot = { score: 0, skipped: true, message: 'Screenshot comparison disabled' };
        }

        // Calculate overall visual similarity score
        results.overallScore = this.calculateOverallScore(results);
        
        return results;
    }

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
        
        // Compare dimensions (normalize for different screen sizes)
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
        const maxAspectDiff = 1.0; // Maximum expected difference
        
        return Math.max(0, 1 - (aspectDiff / maxAspectDiff));
    }

    async compareColors(visual1, visual2) {
        const colors1 = this.extractColors(visual1.elementStyles);
        const colors2 = this.extractColors(visual2.elementStyles);
        
        const colorComparisons = {};
        let totalSimilarity = 0;
        let comparisonCount = 0;
        
        // Compare colors for each element type
        Object.keys(colors1).forEach(element => {
            if (colors2[element]) {
                const similarity = this.compareColorPalette(colors1[element], colors2[element]);
                colorComparisons[element] = similarity;
                totalSimilarity += similarity.score;
                comparisonCount++;
            }
        });
        
        return {
            elementComparisons: colorComparisons,
            overallColorSimilarity: comparisonCount > 0 ? totalSimilarity / comparisonCount : 0,
            score: comparisonCount > 0 ? totalSimilarity / comparisonCount : 0
        };
    }

    extractColors(elementStyles) {
        const colors = {};
        
        Object.keys(elementStyles).forEach(element => {
            if (elementStyles[element]) {
                colors[element] = {
                    backgroundColor: elementStyles[element].backgroundColor,
                    textColor: elementStyles[element].color
                };
            }
        });
        
        return colors;
    }

    compareColorPalette(palette1, palette2) {
        const bgSimilarity = this.compareColor(palette1.backgroundColor, palette2.backgroundColor);
        const textSimilarity = this.compareColor(palette1.textColor, palette2.textColor);
        
        return {
            backgroundColor: {
                color1: palette1.backgroundColor,
                color2: palette2.backgroundColor,
                similarity: bgSimilarity
            },
            textColor: {
                color1: palette1.textColor,
                color2: palette2.textColor,
                similarity: textSimilarity
            },
            score: (bgSimilarity + textSimilarity) / 2
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
        
        // Maximum possible distance is sqrt(255^2 * 3) ≈ 441
        const maxDistance = 441;
        const similarity = 1 - (distance / maxDistance);
        
        return Math.max(0, similarity);
    }

    parseColor(colorString) {
        if (!colorString) return null;
        
        // Handle rgb(r, g, b) format
        const rgbMatch = colorString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
            return {
                r: parseInt(rgbMatch[1]),
                g: parseInt(rgbMatch[2]),
                b: parseInt(rgbMatch[3])
            };
        }
        
        // Handle rgba(r, g, b, a) format
        const rgbaMatch = colorString.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
        if (rgbaMatch) {
            return {
                r: parseInt(rgbaMatch[1]),
                g: parseInt(rgbaMatch[2]),
                b: parseInt(rgbaMatch[3])
            };
        }
        
        // Handle hex colors
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
        
        Object.keys(elementStyles).forEach(element => {
            if (elementStyles[element]) {
                typography[element] = {
                    fontSize: elementStyles[element].fontSize,
                    fontFamily: elementStyles[element].fontFamily,
                    fontWeight: elementStyles[element].fontWeight
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
        if (emMatch) return parseFloat(emMatch[1]) * 16; // Assume 16px base
        
        return null;
    }

    compareFontFamily(family1, family2) {
        if (!family1 || !family2) return 0;
        
        // Normalize font families
        const normalize = (family) => family.toLowerCase()
            .replace(/["']/g, '')
            .split(',')
            .map(f => f.trim())
            .filter(f => f && !f.includes('serif') && !f.includes('sans-serif') && !f.includes('monospace'));
        
        const fonts1 = normalize(family1);
        const fonts2 = normalize(family2);
        
        // Check for exact matches
        for (const font1 of fonts1) {
            for (const font2 of fonts2) {
                if (font1 === font2) return 1;
            }
        }
        
        // Check for similar font categories
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
        const maxDiff = 600; // Max reasonable difference
        
        return Math.max(0, 1 - (diff / maxDiff));
    }

    async compareScreenshots(screenshot1Path, screenshot2Path) {
        try {
            // Load and process images with much smaller sizes to reduce memory usage
            const image1 = sharp(screenshot1Path);
            const image2 = sharp(screenshot2Path);
            
            // Get metadata
            const meta1 = await image1.metadata();
            const meta2 = await image2.metadata();
            
            // Use much smaller size for comparison to reduce memory usage
            const targetWidth = 200;  // Reduced from 400
            const targetHeight = 300; // Reduced accordingly
            
            const resized1 = await image1
                .resize(targetWidth, targetHeight, { fit: 'cover' })
                .raw()
                .toBuffer();
                
            const resized2 = await image2
                .resize(targetWidth, targetHeight, { fit: 'cover' })
                .raw()
                .toBuffer();
            
            // Calculate structural similarity
            const structuralSimilarity = this.calculateImageSimilarity(resized1, resized2, targetWidth, targetHeight);
            
            return {
                structuralSimilarity,
                dimensionsSimilarity: this.compareDimensions(
                    { containerWidth: meta1.width, containerHeight: meta1.height },
                    { containerWidth: meta2.width, containerHeight: meta2.height }
                ),
                score: (structuralSimilarity + 0.3) / 1.3 // Weight structural similarity more
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
        const channels = 3; // RGB
        
        for (let i = 0; i < buffer1.length; i += channels) {
            const r1 = buffer1[i], g1 = buffer1[i + 1], b1 = buffer1[i + 2];
            const r2 = buffer2[i], g2 = buffer2[i + 1], b2 = buffer2[i + 2];
            
            const pixelDiff = Math.sqrt(
                Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
            );
            
            totalDiff += pixelDiff;
        }
        
        const avgDiff = totalDiff / pixelCount;
        const maxDiff = Math.sqrt(3 * Math.pow(255, 2)); // Maximum possible difference
        
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
        if (this.enableScreenshots) {
            // Original weights with screenshots
            const weights = {
                layout: 0.25,
                colors: 0.25,
                typography: 0.20,
                screenshot: 0.20,
                cssClasses: 0.10
            };
            
            return (
                results.layout.score * weights.layout +
                results.colors.score * weights.colors +
                results.typography.score * weights.typography +
                results.screenshot.score * weights.screenshot +
                results.cssClasses.score * weights.cssClasses
            );
        } else {
            // Adjusted weights without screenshots
            const weights = {
                layout: 0.30,
                colors: 0.30,
                typography: 0.25,
                cssClasses: 0.15
            };
            
            return (
                results.layout.score * weights.layout +
                results.colors.score * weights.colors +
                results.typography.score * weights.typography +
                results.cssClasses.score * weights.cssClasses
            );
        }
    }
}

module.exports = VisualSimilarityAnalyzer;