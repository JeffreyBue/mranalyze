import CryptoJS from "crypto-js";
import { HttpError } from './errorHandler.js';
import fs from 'fs/promises';
import path from 'path';

import statesArray, { states } from '#APPROOT/utils/states.js';
import attachMustacheFunctions from '#APPROOT/utils/mustacheFunctions.js';
import apiDataTrx from '#APPROOT/utils/apiDataTrx.js';
import getAnalysisFiles from "#APPROOT/utils/getAnalysisFiles.js";

// Extract variable bindings.
let apisecret;
try {
	apisecret = process.env.KRYPTOPASS;
	if (typeof apisecret !== 'string' || !apisecret) {
		throw new Error('Missing APISECRET binding from CloudRun environment.');
	}
} catch (error) {
	console.log('Missing APISECRET binding from CloudRun environment, Docker, or .env enviroment.');
}

const getData = async (req, res, next) => {
	let ERROR = null;

	// ONE DATA POINT FROM STATIC API
	let apiData = req.route_config?.endpoint ? await getApiData(req) : false;

	// IF GETTING A ERROR FROM THE API REQUEST THROW ERROR
	if (apiData instanceof Error) {
		ERROR = apiData;
		apiData = null;
	};
	// 404 FOR MAIN PAGES, IF NOTHTING COMES BACK FROM THE API
	if (!apiData && CONFIG["404pagetypes"].includes(req.route_config.template)) return next(new HttpError(...(ERROR ? [ERROR.message, ERROR.status] : ["NOT FOUND", 404])));

	// GET A LIST OF DIRECTORY NAMES FROM /shared-data/completed_reports/ AND SAVE THEM TO A CONSTANT reports
	let files = null;

	try {
		const report = req.urlparams ? req.urlparams.find(param => param.report)?.report : null;
		files = await getAnalysisFiles(report);
	} catch (err) {
		console.error('Error reading analysis directory:', err);
	}

	// MAIN DATA OBJECT FOR TEMPLATE
	const data = {
		files,
		_config: CONFIG,
		assetsDate: {
			css: CSSDATE,
			js: JSDATE
		},
		urlprops: {
			pathname: req.path.replace(/\/$/, "") + '/',
			pagetype: req.route_config.template || null,
			noIndexRoute: (!req.path.endsWith('/') && ["name_ranges", "name_results", "name_trending", "name_trending_date", "phone_areacodes", "phone_areacode", "phone_prefixes", "phone_prefixes_x", "phone_result"].includes(req.route_config.template)),
			params: req.urlparams || null,
			query: req.query || null
		},
		isMobile: /(?:android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i.test(req.headers['user-agent']),
		warningModalPopped: req.cookies.warningModalPopped ? true : null,
		...apiData,
		reports: files ? files?.reports : null,
		statesArray,
		states
	}

	// POST PROCESSING OF RETRIEVED DATA
	await dataHook(data);

	req.data = data;

	await next();
}

const getApiData = async (req, next) => {
	let data = {},
		getQuery = (new URLSearchParams(req.query).toString()).replace(/&?api=?/g, "");

	try {
		const reqRoute = `${CONFIG.endpoints[req.route_config.endpoint].url}${req.path.replace(/\/$/, "")}`,
			config_headers = CONFIG.endpoints[req.route_config.endpoint].headers || {},
			response = await fetch(`${reqRoute}${getQuery ? `?${getQuery}` : ""}`, {
				method: 'GET',
				headers: config_headers
			}),
			textType = ['text/plain', 'text/html', 'text/xml', 'application/xml'],
			fileType = ['application/x-gzip', 'application/gzip', 'application/octet-stream', 'application/zip',],
			headers = await response.headers.get('content-type'),
			responseData = fileType.some(t => headers.includes(t)) ? await response.arrayBuffer() : textType.some(t => headers.includes(t)) ? await response.text() : await response.json(),
			decryptedReturn = apisecret && headers.includes('text/plain') ? CryptoJS.AES.decrypt(responseData, apisecret).toString(CryptoJS.enc.Utf8) : null,
			returnedData = decryptedReturn ? JSON.parse(decryptedReturn) : responseData;

		if (response.status !== 200) {
			if (response.status === 404) {
				if (!returnedData) return false;
				req.commonNames = returnedData;
				return false
			};
			throw new HttpError(`API STATUS: ${response.status} - ${req.path}`, response.status);
		};

		data = returnedData;
	} catch (error) {
		// If the api is down, we still want to render the page. Still upto debate.
		console.error(error);
		return error;
	}

	return data;
}

export const dataHook = async (data) => {
	//#### MUSTACHE
	await attachMustacheFunctions(data);

	//#### FORM OF DATA HOOK TO FILL IN GAPS FROM STATIC API GOES HERE
	await apiDataTrx(data);
}

export default getData;