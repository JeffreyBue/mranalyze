import { json } from "express";

const attachMustacheFunctions = (data) => {

	// CONVERT TO READABLE DATE: {{#readableDate}}{{date_range.start}}{{/readableDate}} => "Nov, 2023"
	data.readableDate = function () {
		return function (text, render) { 			
 			if(render(text)) {
	 			const returnDate = new Date(render(text)).toLocaleDateString("en-us", {
					month: "short",
					year: "numeric",
				});

				return returnDate;
			}
		}
	}

	//convert digit to month name
	data.monthName = function () {
		return function (text, render) {
			const month = render(text);
			const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
			];
			return monthNames[month - 1];
		}
	}

	//get current year
	data.currentYear = function () {
		return function (text, render) {
			return new Date().getFullYear();
		}
	}

	// timestame in microseconds to date
	data.timestampToDate = function () {
		return function (text, render) {
			let date;
			if (render(text)) {
				// convert micro seconds to milli seconds
				const milliseconds = parseInt(render(text)) / 1000;
				date = new Date(milliseconds).toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				});
			}
			return date ?? '';
		};
	}

	// get todays date
	data.getTodayDate = function () {
		return function (text, render) {
			const today = new Date();
			const options = { year: 'numeric', month: 'long', day: 'numeric' };
			const formattedDate = today.toLocaleDateString('en-US', options);
			return formattedDate;
		}
	}

	//force lowercase
	data.lowerCase = function () {
		return function (text, render) {
			return render(text).toLowerCase();
		}
	}

	//titleCase for innerHTML
	data.titleCaseHTML = function () {
		return function (text, render) {
			//capitalize all words in LI innerHTML but ignore href and img tags
			return render(text).replace(/>([^<]+)/g, function (x) {
				return x === '><' ? '><' : '>' + x.substring(1).toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
			});
		}
	}


	//keep first character only
	data.firstChar = function () {
		return function (text, render) {
			return render(text).charAt(0);
		}
	}

	//replace spaces with dashes
	data.addDashes = function () {
		return function (text, render) {
			return render(text).replaceAll(" ", '-');
		}
	}

	data.linkableString = function () {
		return function (text, render) {
			return render(text).toLowerCase().replaceAll(" ", '-')
		}
	}

	data.urlFormatter = function () {
		return function (text, render) {
			// Convert to lowercase, replace spaces with '-', and remove special characters
			return render(text).toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-\s/]/g, '');
		};
	};

	//get State name from State abbreviation using values in statesArray
	data.getStateName = function () {
		return function (text, render) {
			let stateCheck = render(text);
			if (stateCheck.length === 2) {
				let stateObj = data.statesArray.find(function (state) {
					return state.abbr === stateCheck;
				});
				return stateObj ? stateObj.display : "";
			}
			else {
				//leave it alone
				return stateCheck;
			}
		}
	}

	//get State abbreviation from State name using values in statesArray
	data.getStateAbbr = function () {
		return function (text, render) {
			let stateCheck = render(text);
			if (stateCheck.length > 2) {
				let stateObj = data.statesArray.find(function (state) {
					return state.display === stateCheck;
				});
				return stateObj ? stateObj.abbr : "";
			}
			else {
				//leave it alone
				return stateCheck;
			}
		}
	}

	//add in a comma after every 3 digits
	data.addCommas = function () {
		return function (text, render) {
			return render(text).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}

	//skip if {{number}} less than 10 digits
	data.removeOne = function () {
		return function (text, render) {
			const numbString = render(text);
			if (numbString.length > 10) {
				return numbString.substring(1);
			}
			else {
				return render(text);
			}
		}
	}

	//format 10 digit number to (xxx) xxx-xxxx
	data.formatPhone = function () {
		return function (text, render) {
			let phone = render(text);
			if (phone.length === 10) {
				return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
			}
			else {
				return phone;
			}
		}
	}

	//format 10 digit number to 1-xxx-xxx-xxxx
	data.formatPhoneDashes = function () {
		return function (text, render) {
			let phone = render(text);
			if (phone.length === 10) {
				return phone.replace(/(\d{3})(\d{3})(\d{4})/, '1-$1-$2-$3');
			}
			//if phone number is 11 digits and starts with 1, format it
			else if (phone.length === 11 && phone.charAt(0) === '1') {
				return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '$1-$2-$3-$4');
			}
			
			else {
				return phone;
			}
		}
	}

	//strip out all non-numeric characters
	data.stripNonNumeric = function () {
		return function (text, render) {
			return render(text).replace(/\D/g, '');
		}
	}

	//blurEmail function for email address. Blur all before @
	data.blurEmail = function () {
		return function (text, render) {
			let email = render(text);
			let emailParts = email.split('@');
			let emailName = emailParts[0];
			let emailDomain = emailParts[1];
			let emailNameLength = emailName.length;
			let emailNameBlur = '<span class="blur">' + emailName + '</span>';
			//show only 1st and last character of emailName
			//let emailNameBlur = emailName.substring(0, 1) + '<span class="blur">' + emailName.substring(1, emailNameLength - 1) + '</span>' + emailName.substring(emailNameLength - 1, emailNameLength);
			return emailNameBlur + '@' + emailDomain;
		}
	}

	//loop through LIST and remove duplicates
	data.uniqList = function () {
		return function (text, render) {
			const elements = render(text).split('</li>');
			const modifiedElements = elements.map(element => element.trim());
			const uniqueElements = [...new Set(modifiedElements)].sort();
			return uniqueElements.join('</li>');
		}
	}

	//random 3 li's from list
	data.random3List = function () {
		return function (text, render) {
			const elements = render(text).split('</li>');
			const randomElements = elements.sort(() => Math.random() - Math.random()).slice(0, 3);
			return randomElements.join('</li>');
		}
	}

	//convert date like Wed Nov 01 2023 to November 1, 2023
	data.readableDateLong = function () {
		return function (text, render) {
			if(render(text)) {
				const returnDate = new Date(render(text)).toLocaleDateString("en-us", {
					month: "long",
					day: "numeric",
					year: "numeric",
				});

				return returnDate;
			}
		}
	}

	data.getPageType = function () {
		return function (text, render) {
			if(data.urlprops) {
				const pageType = data.urlprops.pagetype || null;
								
				// route is /people-search/*
				if(pageType === 'name_results') {
					const params = data.urlprops.params;
					let state = false;

					// route is /people-search/person/state
					params.forEach(param => {
						if(param.state) {
							state = true;
						}
					});
					
					// if state is true, return multi-state, else return multi-result-state
					return state ? 'multi-result-state' : 'multi-result';
				}
				
				return pageType;
			}

			return;
		}
	}

// CLAUDES FUNCTIONS
// Mustache Helper Functions for Comparison Dashboard

// Multiply a decimal by 100 and round to whole number (for percentages)
data.multiply = function () {
	return function (text, render) {
		const value = parseFloat(render(text));
		return Math.round(value * 100);
	}
}

data.multiplyBy = function () {
	return function (text, render) {
		const numbs = render(text).split(' ');
		const value1 = parseFloat(numbs[0]);
		const value2 = parseFloat(numbs[1]);
		return Math.round(value1 * value2);
	}
}

// Check if two values are equal
data.eq = function () {
	return function (text, render) {
		const parts = render(text).split(' ');
		const value1 = parts[0];
		const value2 = parts.slice(1).join(' ');
		return value1 === value2;
	}
}

// Split string by delimiter and return specific index
data.split = function () {
	return function (text, render) {
		const rendered = render(text);

		// Expects format: "string_to_split delimiter index"
		const parts = rendered.split(' ');
		const splitableString = parts[0];
		const delimiter = parts[1];
		const index = parseInt(parts[2]);
		const splitArray = splitableString.split(delimiter);
		

		return splitArray[index] !== undefined ? splitArray[index] : '';
	}
}

// Filter array by property value and return length
data.filter = function () {
	return function (text, render) {
		const rendered = render(text);
		// Expects format: "arrayProperty property value"
		const parts = rendered.split(' ');
		const property = parts[0];
		const value = parts[1];
		
		// This would need to be adapted based on your data structure
		// For now, returns a placeholder count
		return "0";
	}
}

// Alternative multiply that preserves one decimal place
data.multiplyDecimal = function () {
	return function (text, render) {
		const value = parseFloat(render(text));
		return (value * 100).toFixed(1);
	}
}

// Format timestamp to readable date
data.formatDate = function () {
	return function (text, render) {
		const timestamp = render(text);
		let date;
		// Check for YYYYMMDD format (e.g., 20250708)
		if (/^\d{8}$/.test(timestamp)) {
			const year = parseInt(timestamp.slice(0, 4), 10);
			const month = parseInt(timestamp.slice(4, 6), 10) - 1; // JS months are 0-based
			const day = parseInt(timestamp.slice(6, 8), 10);
			date = new Date(year, month, day);
		} else {
			date = new Date(timestamp);
		}
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
}

// Convert classification to readable format
data.formatClassification = function () {
	return function (text, render) {
		const classification = render(text);
		switch (classification) {
			case 'VERY_SIMILAR':
				return 'Very Similar';
			case 'SIMILAR':
				return 'Similar';
			case 'DIFFERENT':
				return 'Different';
			case 'IDENTICAL':
				return 'Identical';
			default:
				return classification;
		}
	}
}

// Truncate text to specified length
data.truncate = function () {
	return function (text, render) {
		const rendered = render(text);
		const lastSpaceIndex = rendered.lastIndexOf(' ');
		const length = parseInt(rendered.substring(lastSpaceIndex + 1));
		const textToTruncate = rendered.substring(0, lastSpaceIndex);
		
		if (textToTruncate.length <= length) {
			return textToTruncate;
		}
		return textToTruncate.substring(0, length) + '...';
	}
}

// Convert snake_case to Title Case
data.titleCase = function () {
	return function (text, render) {
		const str = render(text);
		return str
			.replace(/_/g, ' ')
			.replace(/\w\S*/g, (txt) => 
				txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
			);
	}
}

// Get priority icon based on priority level
data.priorityIcon = function () {
	return function (text, render) {
		const priority = render(text);
		switch (priority.toUpperCase()) {
			case 'CRITICAL':
				return '🚨';
			case 'HIGH':
				return '⚠️';
			case 'MEDIUM':
				return '📊';
			case 'LOW':
				return 'ℹ️';
			default:
				return '•';
		}
	}
}

// Get risk level color class
data.riskClass = function () {
	return function (text, render) {
		const risk = render(text);
		switch (risk.toUpperCase()) {
			case 'CRITICAL':
				return 'critical';
			case 'HIGH':
				return 'high';
			case 'MEDIUM':
				return 'medium';
			case 'LOW':
				return 'low';
			default:
				return 'unknown';
		}
	}
}

// Convert comparison string to site names
data.getSiteNames = function () {
	return function (text, render) {
		const comparison = render(text);
		// Assumes format: "site1_timestamp_vs_site2_timestamp"
		const parts = comparison.split('_vs_');
		if (parts.length === 2) {
			const site1 = parts[0].split('_')[0];
			const site2 = parts[1].split('_')[0];
			return `${site1} vs ${site2}`;
		}
		return comparison;
	}
}

// Get site name from comparison (first site)
data.getFirstSite = function () {
	return function (text, render) {
		const comparison = render(text);
		const parts = comparison.split('_vs_');
		if (parts.length >= 1) {
			return parts[0].split('_')[0];
		}
		return comparison;
	}
}

// Get site name from comparison (second site)
data.getSecondSite = function () {
	return function (text, render) {
		const comparison = render(text);
		const parts = comparison.split('_vs_');
		if (parts.length === 2) {
			return parts[1].split('_')[0];
		}
		return comparison;
	}
}

// Count items by property value (simplified version)
data.countBy = function () {
	return function (text, render) {
		// This is a placeholder - you'll need to implement based on your data structure
		// Expected usage: {{#countBy}}actionableItems priority CRITICAL{{/countBy}}
		return "0";
	}
}

// Check if value is greater than threshold
data.eval = function () {
	return function (text, render) {
		const rendered = render(text);
		const parts = rendered.split('|||');
		const value = eval(parts[0]);
		return value ? parts[1] : '';
	}
}

// Check if value is less than threshold
data.lt = function () {
	return function (text, render) {
		const rendered = render(text);
		const parts = rendered.split(' ');
		const value = eval(parts[0]); // Use eval to handle expressions like "value < threshold"
		const threshold = parseFloat(parts[1]);
		return value < threshold;
	}
}

// Get CSS class based on score ranges
data.getScoreClass = function () {
	return function (text, render) {
		const score = parseFloat(render(text));
		if (score >= 0.9) return 'excellent';
		if (score >= 0.7) return 'good';
		if (score >= 0.5) return 'moderate';
		return 'poor';
	}
}

// Format score as percentage with one decimal
data.percentageOneDecimal = function () {
	return function (text, render) {
		const value = parseFloat(render(text));
		return (value * 100).toFixed(1) + '%';
	}
}

// Get classification emoji
data.classificationEmoji = function () {
	return function (text, render) {
		const classification = render(text);
		switch (classification) {
			case 'VERY_SIMILAR':
				return '⚠️';
			case 'SIMILAR':
				return '📊';
			case 'DIFFERENT':
				return '✅';
			case 'IDENTICAL':
				return '🚨';
			default:
				return '❓';
		}
	}
}	

data.add = function () {
	return function (text, render) {
		const parts = render(text).split('');
		const total = parts.reduce((sum, part) => {
			const num = parseFloat(part);
			return isNaN(num) ? sum : sum + num;
		}
		, 0);
		return total;
	}
}

// Make url string from two values site: instantcheckmate_20250708_1354, pageId: 001_people_gabino-valadez
// example: {{#seo_page}}{{site}} {{pageId}}{{/seo_page}}
// outcome "instantcheckmate_20250708_1354_page_001"
data.seo_page = function () {
	return function (text, render) {
		const rendered = render(text);
		const parts = rendered.split(' ');
		if (parts.length === 2) {
			const site = parts[0];
			let pageId = parts[1];
			const number = pageId.split('_').filter(part => /^\d+$/.test(part));
			if(!number.length) return `${site}_page_`;
			pageId = pageId.substring(0, number[0].length);
			return `${site}_page_${pageId}`;
		}
		return '';
	}
}


// Additional Mustache Helper Functions for SEO Analysis

// Get SEO grade letter based on score
data.getGrade = function () {
    return function (text, render) {
        const score = parseFloat(render(text));
        if (score >= 0.9) return 'F';
        if (score >= 0.8) return 'D';
        if (score >= 0.7) return 'C';
        if (score >= 0.6) return 'B';
        return 'A';
    }
}

// Get grade description based on score
data.getGradeDescription = function () {
    return function (text, render) {
        const score = parseFloat(render(text));
        if (score >= 0.9) return 'Poor';
        if (score >= 0.8) return 'Needs Improvement';
        if (score >= 0.7) return 'Fair';
        if (score >= 0.6) return 'Good';
        return 'Excellent';
    }
}

// Check if value is greater than threshold
data.gt = function () {
    return function (text, render) {
        const rendered = render(text);
        const parts = rendered.split(' ');
        const value = parseFloat(parts[0]);
        const threshold = parseFloat(parts[1]);
        return value > threshold ? 'warning' : '';
    }
}

// Convert boolean to CSS class
data.booleanClass = function () {
    return function (text, render) {
        const value = render(text).trim();
        const isTrue = value === 'true' || value === true;
        return isTrue ? 'good' : 'bad';
    }
}

// Convert boolean to readable text
data.booleanText = function () {
    return function (text, render) {
        const value = render(text).trim();
        const isTrue = value === 'true' || value === true;
        return isTrue ? 'Yes' : 'No';
    }
}

// Group semantic keywords by group
data.groupSemanticKeywords = function () {
    return function (text, render) {
        const rendered = render(text);
        try {
            const keywords = JSON.parse(rendered);
            const groups = {};
            
            keywords.forEach(item => {
                if (!groups[item.group]) {
                    groups[item.group] = [];
                }
                groups[item.group].push(item.keyword);
            });
            
            let result = '';
            Object.keys(groups).forEach(groupName => {
                result += `
                    <div class="semantic-group">
                        <div class="group-title">${groupName}</div>
                        <div class="group-keywords">
                            ${groups[groupName].map(keyword => 
                                `<span class="keyword-tag">${keyword}</span>`
                            ).join('')}
                        </div>
                    </div>
                `;
            });
            
            return result;
        } catch {
            return '';
        }
    }
}

// Format timestamp to readable date
data.formatTimestamp = function () {
    return function (text, render) {
        const timestamp = render(text);
        try {
            const date = new Date(timestamp);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return timestamp;
        }
    }
}

// Format site name from technical format
data.formatSiteName = function () {
    return function (text, render) {
        const siteName = render(text);
        // Remove timestamp and convert to readable format
        const cleanName = siteName.split('_')[0];
        
        // Convert to title case and handle common site names
        const siteMap = {
            'instantcheckmate': 'InstantCheckmate',
            'truthfinder': 'TruthFinder',
            'intelius': 'Intelius'
        };
        
        return siteMap[cleanName.toLowerCase()] || 
               cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    }
}

// Check if score indicates warning level
data.isWarningScore = function () {
    return function (text, render) {
        const score = parseFloat(render(text));
        return score < 0.7 ? 'warning' : '';
    }
}

// Check if score indicates error level
data.isErrorScore = function () {
    return function (text, render) {
        const score = parseFloat(render(text));
        return score < 0.5 ? 'error' : '';
    }
}

// Get density color class based on percentage
data.getDensityClass = function () {
    return function (text, render) {
        const density = parseFloat(render(text));
        if (density > 5) return 'error';
        if (density > 3) return 'warning';
        return 'good';
    }
}

// Format keyword density percentage
data.formatDensity = function () {
    return function (text, render) {
        const density = parseFloat(render(text));
        return density.toFixed(2) + '%';
    }
}

// Convert readability estimate to user-friendly text
data.formatReadability = function () {
    return function (text, render) {
        const readability = render(text).trim();
        const readabilityMap = {
            'very_easy': 'Very Easy',
            'easy': 'Easy',
            'fairly_easy': 'Fairly Easy',
            'standard': 'Standard',
            'fairly_difficult': 'Fairly Difficult',
            'difficult': 'Difficult',
            'very_difficult': 'Very Difficult'
        };
        
        return readabilityMap[readability] || readability;
    }
}

// Get readability color class
data.getReadabilityClass = function () {
    return function (text, render) {
        const readability = render(text).trim();
        const goodReadability = ['very_easy', 'easy', 'fairly_easy', 'standard'];
        const warningReadability = ['fairly_difficult'];
        
        if (goodReadability.includes(readability)) return 'good';
        if (warningReadability.includes(readability)) return 'warning';
        return 'error';
    }
}

// Check if array has items
data.hasItems = function () {
    return function (text, render) {
        const rendered = render(text);
        try {
            const array = JSON.parse(rendered);
            return Array.isArray(array) && array.length > 0;
        } catch {
            return false;
        }
    }
}

// Get first item from array
data.getFirst = function () {
    return function (text, render) {
        const rendered = render(text);
        try {
            const array = JSON.parse(rendered);
            return Array.isArray(array) && array.length > 0 ? array[0] : '';
        } catch {
            return '';
        }
    }
}

// Check if text length exceeds limit
data.exceedsLength = function () {
    return function (text, render) {
        const rendered = render(text);
        const parts = rendered.split(' ');
        const length = parseInt(parts[0]);
        const limit = parseInt(parts[1]);
        return length > limit ? 'warning' : 'good';
    }
}

// Check if text length is under minimum
data.underLength = function () {
    return function (text, render) {
        const rendered = render(text);
        const parts = rendered.split(' ');
        const length = parseInt(parts[0]);
        const minimum = parseInt(parts[1]);
        return length < minimum ? 'warning' : 'good';
    }
}

// Format number with commas
data.formatNumber = function () {
    return function (text, render) {
        const number = parseInt(render(text));
        return number.toLocaleString();
    }
}

// Get priority icon based on priority level
data.getPriorityIcon = function () {
    return function (text, render) {
        const priority = render(text).trim().toUpperCase();
        const icons = {
            'CRITICAL': '🚨',
            'HIGH': '⚠️',
            'MEDIUM': '📊',
            'LOW': 'ℹ️'
        };
        return icons[priority] || '•';
    }
}

// Get impact color class
data.getImpactClass = function () {
    return function (text, render) {
        const impact = render(text).trim().toUpperCase();
        const classes = {
            'HIGH': 'error',
            'MEDIUM': 'warning',
            'LOW': 'good'
        };
        return classes[impact] || '';
    }
}

// Calculate percentage of score
data.getScorePercentage = function () {
    return function (text, render) {
        const score = parseFloat(render(text));
        return Math.round(score * 100);
    }
}

// Check if keyword placement is good
data.isGoodPlacement = function () {
    return function (text, render) {
        const rendered = render(text);
        const parts = rendered.split(' ');
        const inTitle = parts[0] === 'true';
        const inMeta = parts[1] === 'true';
        const inHeadings = parts[2] === 'true';
        
        return (inTitle && inMeta && inHeadings) ? 'good' : 'warning';
    }
}

// Get technical SEO status class
data.getTechnicalStatus = function () {
    return function (text, render) {
        const score = parseFloat(render(text));
        if (score >= 0.9) return 'good';
        if (score >= 0.7) return 'warning';
        return 'error';
    }
}

// Format meta tag status
data.formatMetaStatus = function () {
    return function (text, render) {
        const hasTag = render(text).trim() === 'true';
        return hasTag ? 'Present' : 'Missing';
    }
}

// Get uniqueness level text
data.getUniquenessLevel = function () {
    return function (text, render) {
        const score = parseFloat(render(text));
        if (score >= 0.8) return 'Highly Unique';
        if (score >= 0.6) return 'Moderately Unique';
        if (score >= 0.4) return 'Somewhat Unique';
        if (score >= 0.2) return 'Low Uniqueness';
        return 'Very Generic';
    }
}

// Get uniqueness color class
data.getUniquenessClass = function () {
    return function (text, render) {
        const score = parseFloat(render(text));
        if (score >= 0.6) return 'good';
        if (score >= 0.3) return 'warning';
        return 'error';
    }
}

// Check if issues array has items
data.hasIssues = function () {
    return function (text, render) {
        const rendered = render(text);
        try {
            const issues = JSON.parse(rendered);
            return Array.isArray(issues) && issues.length > 0;
        } catch {
            // If it's a simple string, check if it's not empty
            return rendered && rendered.trim().length > 0;
        }
    }
}

// Get truncated text
data.truncateText = function () {
    return function (text, render) {
        const rendered = render(text);
        const parts = rendered.split('|||');
        const textToTruncate = parts[0];
        const maxLength = parseInt(parts[1]) || 100;
        
        if (textToTruncate.length <= maxLength) {
            return textToTruncate;
        }
        return textToTruncate.substring(0, maxLength) + '...';
    }
}

// Simple conditional helper
data.ifEquals = function () {
    return function (text, render) {
        const rendered = render(text);
        const parts = rendered.split('|||');
        if (parts.length < 3) return '';
        
        const value1 = parts[0].trim();
        const value2 = parts[1].trim();
        const content = parts[2];
        
        return value1 === value2 ? content : '';
    }
}

// Simple conditional helper for not equals
data.ifNotEquals = function () {
    return function (text, render) {
        const rendered = render(text);
        const parts = rendered.split('|||');
        if (parts.length < 3) return '';
        
        const value1 = parts[0].trim();
        const value2 = parts[1].trim();
        const content = parts[2];
        
        return value1 !== value2 ? content : '';
    }
}	

// Remove file extension from string
data.removeExtension = function () {
	return function (text, render) {
		const filename = render(text);
		return filename.substring(0, filename.lastIndexOf('.')) || filename;
	}
}

// Get color class based on similarity (inverse of typical scoring)
data.getSimilarityClass = function () {
    return function (text, render) {
        const score = parseFloat(render(text));

        if (score >= 0.75) return 'error';      // High similarity = bad
        if (score >= 0.5) return 'warning';     // Moderate similarity = warning
        if (score >= 0.25) return 'good';       // Low similarity = good
        return 'excellent';                     // Very low similarity = excellent
    }
}

// Calculate percentage from value and maximum
data.percentage = function () {
    return function (text, render) {
        const parts = render(text).trim().split(' ');
        if (parts.length !== 2) {
            return '0';
        }
        
        const value = parseFloat(parts[0]);
        const maximum = parseFloat(parts[1]);
        
        if (isNaN(value) || isNaN(maximum) || maximum === 0) {
            return '0';
        }
        
        return Math.round((value / maximum) * 100);
    }
}

// Home Preview Mustache Helper Functions
// Format date for display
data.formatDate = function () {
    return function (text, render) {
        const timestamp = render(text);
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Get similarity label based on score
data.getSimilarityLabel = function () {
    return function (text, render) {
        const score = parseFloat(render(text));
        if (score >= 0.9) return 'Critical';
        if (score >= 0.75) return 'High';
        if (score >= 0.5) return 'Moderate';
        return 'Low';
    }
}

// Get risk level class based on score
data.getRiskLevel = function () {
    return function (text, render) {
        const score = parseFloat(render(text));
        if (score >= 0.9) return 'critical';
        if (score >= 0.75) return 'high';
        if (score >= 0.5) return 'moderate';
        return 'low';
    }
}

// Get risk text based on score
data.getRiskText = function () {
    return function (text, render) {
        const score = parseFloat(render(text));
        if (score >= 0.9) return 'CRITICAL RISK';
        if (score >= 0.75) return 'HIGH RISK';
        if (score >= 0.5) return 'MODERATE RISK';
        return 'LOW RISK';
    }
}

// Get report ID from comparison string
data.getReportId = function () {
    return function (text, render) {
        const comparison = render(text);
        // Extract the first part before '_vs_' as the main report identifier
        return comparison.split('_vs_')[0] || comparison;
    }
}

// FOR REPORT PAGE

// Truncate helper - shortens long text
data.truncate = function () {
  return function (text, render) {
    const value = render(text);
    return value.length > 50 ? value.substring(0, 50) + '...' : value;
  };
};

// Truncate URL helper - shortens URLs for display
data.truncateUrl = function () {
  return function (text, render) {
    const value = render(text);
    const url = new URL(value);

	const filename = url.pathname.split('/').pop();
    return filename || url.hostname;
  };
};

// Status text helper - converts boolean to text
data.statusText = function () {
  return function (text, render) {
    const value = render(text);
    return value === 'true' || value === true ? 'Yes' : 'No';
  };
};

// Status class helper - converts boolean to CSS class
data.statusClass = function () {
  return function (text, render) {
    const value = render(text);
    return value === 'true' || value === true ? 'active' : 'inactive';
  };
};

// JSON stringify helper - formats JSON for display
data.jsonStringify = function () {
  return function (text, render) {
    const value = render(text);

	try {
      const parsed = typeof value === 'string' ? JSON.parse(value) : value;
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      return value;
    }
  };
};

// Index helper - provides array index in loops for simple strings
// inside loop: {{#index}}{{#content.paragraphs}}{{{.}}} ::: {{/content.paragraphs}}{{/index}}
data.index = function () {
  return function (text, render) {
    const context = this,
		combinedStrings = render(text),
		arrayOfElements = combinedStrings.split(' ::: '),
		index = arrayOfElements.indexOf(context);

	if (index > -1) {
		return index + 1; // +1 to make it 1-based index
	}

    return 0;
  };
};
}

export default attachMustacheFunctions;