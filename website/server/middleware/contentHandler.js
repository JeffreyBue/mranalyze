import { marked } from "marked";
import { csv2json } from 'json-2-csv';
import yaml from 'js-yaml';
import Mustache from 'mustache';

import tables from '#APPROOT/src/tables/index.js';
import markdown from '#APPROOT/src/markdown/index.js';

const contentHandler = async (req, res, next) => {
    const data = req.data;

    let _content = {markdown: {}, table: {}};

    //#### TABLES
    //ATTACH TABLES DATA FROM "src/tables"
    if (tables) {
        const getTables = async () => {
            const tablesJson = Object.values(tables).map(async csvString => await csv2json(csvString));
            return Promise.all(tablesJson);
        }

        const tableData = await getTables();
        // MAKING USABLE OBJECT FROM TABLES example: {{..., tables: {tableslugs: [...rows]}, ...}}
        _content._alltables = tableData.reduce((result, table, index) => {
            const tableName = Object.keys(tables)[index];
            result[tableName] = table;
            return result;
        }, {});

        // IF URL PARAMS MATCHES TABLE SLUG THEN SET TABLE DATA TO TABLE PARAMETER OF _CONTENT
        if (data.urlprops.params) {
            let result = data.urlprops.params.map(paramObj => {
                const [paramKey, paramValue] = Object.entries(paramObj)[0];
                if (_content._alltables[paramValue]) {
                    return { [paramKey]: _content._alltables[paramValue] }
                }
            }).filter(Boolean)
                .reduce((acc, obj) => ({ ...acc, ...obj }), {});

            if (Object.keys(result).length) _content.table = result;
        }
    }

	data._content = _content;

    //#### MARKDOWN
    // TAKING MARKDOWN CONTENT CONVERTING IT TO HTML AND RUNNING IT THROUGH THE DATA.
    const content = {};
    if (markdown) {
        Object.entries(markdown).map(([slug, text]) => {
            // SPLIT THE FILE OF MD FROM "YAML" SYNTAX
            let contentMeta = text.split(/--yaml--/, 1)[0];
            let markdownString = text.substring(text.search(/--yaml--/)).replace(/--yaml--/, "");
            if (!(contentMeta && markdownString)) {
                markdownString = contentMeta;
                contentMeta = ""
            }

            // TAKING APIDATA AND RUNNING IT THROUGH YAML DATA.
            const markDownMetaData = yaml.load(Mustache.render(contentMeta, (data || {})));

            // TAKING YAML PROCCESSED DATA AND DATA, THEN RUNNING IT THROUGH MUSTACHE.
            const processedMarkdown = Mustache.render(markdownString, { ...data, ...markDownMetaData });
            const articleData = { html: marked(processedMarkdown, { mangle: false, headerIds: true}), meta: markDownMetaData }

            // SETTING EACH ARTICLE UNDER "CONTENT" PARAMETER
            content[slug] = articleData;

            // IF SLUG EQUALS URL PARAMATER VALUE THEN SET SAID PARAMATER TO ROOT WITH VALUE OF PROCESSED MARKDOWN AND META
            if (data.urlprops.params) {
                // FINDING MARKDOWN "FILE" AND MATCHING WITH URL PARAMETERS
                let result = data.urlprops.params.map(paramObj => {
                    const [paramKey, paramValue] = Object.entries(paramObj)[0];
                    if (paramValue == slug) {
                        return { [paramKey]: articleData }
                    }
                }).filter(Boolean)
                    .reduce((acc, obj) => ({ ...acc, ...obj }), {});

                // ASSIGNING ROUTE PARAMETER AND VALUES OF MARKDOWN FILE TO ROOT OF DATA OBJECT.
                if (Object.keys(result).length) Object.assign(_content.markdown, result);
            }
        });

        _content._allmarkdown = content;
    }

    data._content = _content;

    await next();
}

export default contentHandler;