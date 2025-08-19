import readFromFile from '#APPROOT/readFromFile.js';

const home = await readFromFile('/src/templates/home.html');
const reports = await readFromFile('/src/templates/reports.html');
const report = await readFromFile('/src/templates/report_summary.html');
const report_seo = await readFromFile('/src/templates/report_seo.html');
const report_seo_compare = await readFromFile('/src/templates/report_seo_compare.html');
const report_seo_page = await readFromFile('/src/templates/report_seo_page.html');
const report_visual = await readFromFile('/src/templates/report_visual.html');
const report_visual_compare = await readFromFile('/src/templates/report_visual_compare.html');
const report_visual_page = await readFromFile('/src/templates/report_visual_page.html');
const report_content = await readFromFile('/src/templates/report_content.html');
const report_content_compare = await readFromFile('/src/templates/report_content_compare.html');
const report_content_page = await readFromFile('/src/templates/report_content_page.html');
const report_technical = await readFromFile('/src/templates/report_technical.html');
const report_technical_compare = await readFromFile('/src/templates/report_technical_compare.html');
const report_technical_page = await readFromFile('/src/templates/report_technical_page.html');
const report_page = await readFromFile('/src/templates/report_page.html');
const run_report = await readFromFile('/src/templates/run_report.html');
const style_guide = await readFromFile('/src/templates/style_guide.html');

export default {
    home,
    reports,
    report,
    report_seo,
    report_seo_compare,
    report_seo_page,
    report_visual,
    report_visual_compare,
    report_visual_page,
    report_content,
    report_content_compare,
    report_content_page,
    report_technical,
    report_technical_compare,
    report_technical_page,
    report_page,
    run_report,
    style_guide
}