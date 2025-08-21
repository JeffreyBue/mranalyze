export default {
	"name": "mranalyze",
	"paths": {
		'assetsFolder': "/assets/",
		'assetsRoute': "/_/",
		"partials": "/src/partials/index.js",
		"templates": "/src/templates/index.js",
		"markdown": "/src/markdown/index.js",
		"tables": "/src/tables/index.js",
		"mustache": "/utils/mustacheFunctions.js",
		"apiDataTrx": "/utils/apiDataTrx.js",
		"states": "/utils/states.js"
	},
	"hosts": [
		"localhost",
		"www.localhost",
		"mranalyze.dev",
		"www.mranalyze.dev",
		"www2.mranalyze.dev"
	],
	"endpoints": {
		"api_base_url": {}
	},
	"routes": [
		{
			"host": "",
			"path": "/",
			"template": "home"
		},
		{
			"host": "",
			"path": "/reports/?",
			"template": "reports"
		},
		{
			"host": "",
			"path": "/report/(?<report>[_a-zA-Z\\d]+)/?",
			"template": "report"
		},
		{
			"host": "",
			"path": "/report/(?<report>[_a-zA-Z\\d]+)/seo/?",
			"template": "report_seo"
		},
		{
			"host": "",
			"path": "/report/(?<report>[_a-zA-Z\\d]+)/seo/compare/(?<comparison>[_a-zA-Z\\d]+)/?",
			"template": "report_seo_compare"
		},
		{
			"host": "",
			"path": "/report/(?<report>[_a-zA-Z\\d]+)/seo/page/(?<page_report>[_a-zA-Z\\d]+)/?",
			"template": "report_seo_page"
		},
		{
			"host": "",
			"path": "/report/(?<report>[_a-zA-Z\\d]+)/visual/?",
			"template": "report_visual"
		},
		{
			"host": "",
			"path": "/report/(?<report>[_a-zA-Z\\d]+)/visual/compare/(?<comparison>[_a-zA-Z\\d]+)/?",
			"template": "report_visual_compare"
		},
		{
			"host": "",
			"path": "/report/(?<report>[_a-zA-Z\\d]+)/visual/page/(?<page>[_a-zA-Z\\d]+)/?",
			"template": "report_visual_page"
		},
		{
			"host": "",
			"path": "/report/(?<report>[_a-zA-Z\\d]+)/content/?",
			"template": "report_content"
		},
		{
			"host": "",
			"path": "/report/(?<report>[_a-zA-Z\\d]+)/content/compare/(?<comparison>[_a-zA-Z\\d]+)/?",
			"template": "report_content_compare"
		},
		{
			"host": "",
			"path": "/report/(?<report>[_a-zA-Z\\d]+)/content/page/(?<page>[_a-zA-Z\\d]+)/?",
			"template": "report_content_page"
		},
		{
			"host": "",
			"path": "/report/(?<report>[_a-zA-Z\\d]+)/technical/?",
			"template": "report_technical"
		},
		{
			"host": "",
			"path": "/report/(?<report>[_a-zA-Z\\d]+)/technical/compare/(?<comparison>[_a-zA-Z\\d]+)/?",
			"template": "report_technical_compare"
		},
		{
			"host": "",
			"path": "/report/(?<report>[_a-zA-Z\\d]+)/technical/page/(?<page>[_a-zA-Z\\d]+)/?",
			"template": "report_technical_page"
		},
		{
			"host": "",
			"path": "/report/(?<report>[_a-zA-Z\\d]+)/page/(?<site>[_a-zA-Z\\d]+)/(?<page>[_-a-zA-Z\\d]+)/?",
			"template": "report_page"
		},
		{
			"host": "",
			"path": "/run_report/?",
			"template": "run_report"
		},
		{
			"host": "",
			"path": "/style_guide/?",
			"template": "style_guide"
		}
	],
	"404pagetypes": [],
	"route_groups": {}
}
