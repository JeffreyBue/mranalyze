import readFromFile from '#APPROOT/readFromFile.js';

const ATFSTYLES = await readFromFile('/assets/css/atf_global.css');
const HEAD = await readFromFile('/src/partials/head.html');
const HEADER = await readFromFile('/src/partials/header.html');
const FOOTER = await readFromFile('/src/partials/footer.html');
const FOOT = await readFromFile('/src/partials/foot.html');

export default {
    ATFSTYLES,
    HEAD,
    HEADER,
    FOOTER,
    FOOT
}