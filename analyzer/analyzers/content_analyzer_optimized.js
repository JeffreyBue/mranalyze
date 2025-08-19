const natural = require('natural');
const crypto = require('crypto');

class OptimizedContentAnalyzer {
    constructor(options = {}) {
        this.options = {
            maxTextSample: 10000,        // Sample first 10k chars for expensive operations
            maxTokens: 5000,             // Limit tokens per document
            topTermsCount: 50,           // Track only top 50 terms
            enableLevenshtein: false,    // Disable by default (expensive)
            enableDeepAnalysis: false,   // Disable by default
            ...options
        };
        
        this.stemmer = natural.PorterStemmer;
        this.tokenizer = new natural.WordTokenizer();
        
        // Limited vocabulary cache per session
        this.sessionVocabulary = new Map();
        this.maxVocabSize = 10000; // Hard limit
    }

    async compare(page1, page2) {
        const startTime = Date.now();
        const content1 = page1.content;
        const content2 = page2.content;
        
        // Pre-process texts once
        const processedText1 = this.preprocessText(content1.fullText);
        const processedText2 = this.preprocessText(content2.fullText);
        
        const results = {
            // Core metrics (fast and essential)
            jaccard: this.calculateJaccardSimilarity(processedText1.tokens, processedText2.tokens),
            cosine: this.calculateCosineSimilarity(processedText1.tokens, processedText2.tokens),
            contentFingerprint: this.compareContentFingerprints(content1.fullText, content2.fullText),
            
            // Structural metrics (medium cost)
            semantic: this.calculateSemanticSimilarity(content1, content2),
            topicSimilarity: this.compareTopics(processedText1.topTerms, processedText2.topTerms),
            
            // Metadata comparison (fast)
            metadata: this.compareMetadata(content1.meta, content2.meta),
            
            // Statistics
            stats: {
                text1Length: processedText1.length,
                text2Length: processedText2.length,
                tokens1: processedText1.tokens.length,
                tokens2: processedText2.tokens.length,
                processingTimeMs: Date.now() - startTime
            }
        };

        // Optional expensive metrics
        if (this.options.enableLevenshtein) {
            results.levenshtein = this.calculateLevenshteinSimilarity(
                processedText1.sample, 
                processedText2.sample
            );
        }

        // Calculate overall score
        results.overallScore = this.calculateOverallScore(results);
        
        // Clean up session vocabulary if too large
        this.cleanupVocabulary();
        
        return results;
    }

    preprocessText(text) {
        if (!text) return { tokens: [], topTerms: [], length: 0, sample: '' };
        
        // Get sample for expensive operations
        const sample = text.substring(0, this.options.maxTextSample);
        
        // Tokenize efficiently
        const tokens = this.tokenizeEfficiently(text);
        
        // Get top terms without keeping full frequency map
        const topTerms = this.getTopTermsEfficiently(tokens);
        
        return {
            tokens: tokens.slice(0, this.options.maxTokens),
            topTerms,
            length: text.length,
            sample
        };
    }

    tokenizeEfficiently(text) {
        if (!text) return [];
        
        // Simple tokenization without stemming for speed
        const tokens = text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(token => token.length > 2 && token.length < 20 && !/^\d+$/.test(token));
        
        return tokens;
    }

    getTopTermsEfficiently(tokens) {
        const freq = new Map();
        
        // Count frequencies
        for (const token of tokens) {
            freq.set(token, (freq.get(token) || 0) + 1);
        }
        
        // Get top N terms
        return Array.from(freq.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, this.options.topTermsCount)
            .map(([term, frequency]) => ({ term, frequency }));
    }

    calculateJaccardSimilarity(tokens1, tokens2) {
        const set1 = new Set(tokens1);
        const set2 = new Set(tokens2);
        
        let intersectionSize = 0;
        const smaller = set1.size < set2.size ? set1 : set2;
        const larger = set1.size < set2.size ? set2 : set1;
        
        for (const token of smaller) {
            if (larger.has(token)) intersectionSize++;
        }
        
        const unionSize = set1.size + set2.size - intersectionSize;
        const similarity = unionSize > 0 ? intersectionSize / unionSize : 0;
        
        return {
            score: similarity,
            stats: {
                tokens1: set1.size,
                tokens2: set2.size,
                intersection: intersectionSize,
                union: unionSize
            }
        };
    }

    calculateCosineSimilarity(tokens1, tokens2) {
        // Create limited vocabulary for this comparison
        const vocab = new Set();
        const sampleSize = Math.min(1000, tokens1.length, tokens2.length);
        
        // Sample tokens for vocabulary
        for (let i = 0; i < sampleSize; i++) {
            if (tokens1[i]) vocab.add(tokens1[i]);
            if (tokens2[i]) vocab.add(tokens2[i]);
        }
        
        const vocabArray = Array.from(vocab);
        if (vocabArray.length === 0) return { score: 0, vectorSize: 0 };
        
        // Create frequency maps
        const freq1 = this.createFrequencyMap(tokens1);
        const freq2 = this.createFrequencyMap(tokens2);
        
        // Calculate cosine similarity
        let dotProduct = 0;
        let magnitude1 = 0;
        let magnitude2 = 0;
        
        for (const term of vocabArray) {
            const tf1 = freq1.get(term) || 0;
            const tf2 = freq2.get(term) || 0;
            
            dotProduct += tf1 * tf2;
            magnitude1 += tf1 * tf1;
            magnitude2 += tf2 * tf2;
        }
        
        magnitude1 = Math.sqrt(magnitude1);
        magnitude2 = Math.sqrt(magnitude2);
        
        const similarity = (magnitude1 && magnitude2) ? dotProduct / (magnitude1 * magnitude2) : 0;
        
        return {
            score: similarity,
            vectorSize: vocabArray.length
        };
    }

    createFrequencyMap(tokens) {
        const freq = new Map();
        for (const token of tokens) {
            freq.set(token, (freq.get(token) || 0) + 1);
        }
        return freq;
    }

    compareContentFingerprints(text1, text2) {
        // Create content fingerprints using rolling hashes
        const fingerprint1 = this.createFingerprint(text1);
        const fingerprint2 = this.createFingerprint(text2);
        
        let matches = 0;
        for (const hash of fingerprint1) {
            if (fingerprint2.has(hash)) matches++;
        }
        
        const similarity = Math.max(fingerprint1.size, fingerprint2.size) > 0 ? 
            matches / Math.max(fingerprint1.size, fingerprint2.size) : 0;
        
        return {
            score: similarity,
            fingerprints1: fingerprint1.size,
            fingerprints2: fingerprint2.size,
            matches
        };
    }

    createFingerprint(text, windowSize = 50, numHashes = 100) {
        if (!text || text.length < windowSize) return new Set();
        
        const hashes = new Set();
        const step = Math.max(1, Math.floor(text.length / numHashes));
        
        for (let i = 0; i < text.length - windowSize && hashes.size < numHashes; i += step) {
            const window = text.substring(i, i + windowSize).toLowerCase();
            const hash = crypto.createHash('md5').update(window).digest('hex').substring(0, 8);
            hashes.add(hash);
        }
        
        return hashes;
    }

    calculateSemanticSimilarity(content1, content2) {
        const headingText1 = this.extractHeadingText(content1.headings);
        const headingText2 = this.extractHeadingText(content2.headings);
        
        const headingSimilarity = this.calculateTextSimilarity(headingText1, headingText2);
        
        // Compare first few paragraphs only
        const para1 = (content1.paragraphs || []).slice(0, 5).join(' ');
        const para2 = (content2.paragraphs || []).slice(0, 5).join(' ');
        const paragraphSimilarity = this.calculateTextSimilarity(para1, para2);
        
        return {
            score: (headingSimilarity * 0.6 + paragraphSimilarity * 0.4),
            headingSimilarity,
            paragraphSimilarity
        };
    }

    extractHeadingText(headings) {
        if (!headings) return '';
        return [
            ...(headings.h1 || []),
            ...(headings.h2 || []),
            ...(headings.h3 || [])
        ].join(' ');
    }

    calculateTextSimilarity(text1, text2) {
        if (!text1 || !text2) return 0;
        
        const tokens1 = new Set(this.tokenizeEfficiently(text1));
        const tokens2 = new Set(this.tokenizeEfficiently(text2));
        
        if (tokens1.size === 0 || tokens2.size === 0) return 0;
        
        let intersection = 0;
        for (const token of tokens1) {
            if (tokens2.has(token)) intersection++;
        }
        
        return (2 * intersection) / (tokens1.size + tokens2.size);
    }

    compareTopics(topTerms1, topTerms2) {
        const topics1 = new Set(topTerms1.slice(0, 20).map(t => t.term));
        const topics2 = new Set(topTerms2.slice(0, 20).map(t => t.term));
        
        let commonTopics = 0;
        for (const topic of topics1) {
            if (topics2.has(topic)) commonTopics++;
        }
        
        const similarity = Math.max(topics1.size, topics2.size) > 0 ? 
            commonTopics / Math.max(topics1.size, topics2.size) : 0;
        
        return {
            score: similarity,
            commonTopics,
            totalTopics1: topics1.size,
            totalTopics2: topics2.size
        };
    }

    compareMetadata(meta1, meta2) {
        const titleSim = this.calculateTextSimilarity(meta1?.title || '', meta2?.title || '');
        const descSim = this.calculateTextSimilarity(meta1?.description || '', meta2?.description || '');
        
        return {
            score: (titleSim + descSim) / 2,
            titleSimilarity: titleSim,
            descriptionSimilarity: descSim
        };
    }

    calculateLevenshteinSimilarity(text1, text2) {
        // Only calculate on samples
        const sample1 = text1.substring(0, 500);
        const sample2 = text2.substring(0, 500);
        
        const distance = this.levenshteinDistance(sample1, sample2);
        const maxLength = Math.max(sample1.length, sample2.length);
        const similarity = maxLength > 0 ? 1 - (distance / maxLength) : 1;
        
        return {
            score: similarity,
            distance,
            sampleLength: maxLength
        };
    }

    levenshteinDistance(str1, str2) {
        const matrix = [];
        const n = Math.min(str1.length, 500);
        const m = Math.min(str2.length, 500);
        
        if (n === 0) return m;
        if (m === 0) return n;
        
        for (let i = 0; i <= m; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= n; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
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
        
        return matrix[m][n];
    }

    calculateOverallScore(results) {
        const weights = {
            jaccard: 0.25,
            cosine: 0.25,
            contentFingerprint: 0.20,
            semantic: 0.20,
            topicSimilarity: 0.10
        };
        
        let totalScore = 0;
        let totalWeight = 0;
        
        for (const [metric, weight] of Object.entries(weights)) {
            if (results[metric] && typeof results[metric].score === 'number') {
                totalScore += results[metric].score * weight;
                totalWeight += weight;
            }
        }
        
        return totalWeight > 0 ? totalScore / totalWeight : 0;
    }

    cleanupVocabulary() {
        if (this.sessionVocabulary.size > this.maxVocabSize) {
            this.sessionVocabulary.clear();
        }
    }

    clearCache() {
        this.sessionVocabulary.clear();
        if (global.gc) global.gc();
    }
}

module.exports = OptimizedContentAnalyzer;