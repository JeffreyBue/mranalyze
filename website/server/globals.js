import { URL } from 'url';
import { resolve } from 'path';
import CONFIG from '#APPROOT/config.js';

global.CONFIG = CONFIG;
global.APPROOT = resolve(new URL('../', import.meta.url).pathname);
global.CSSDATE = 'v=20250812T160259';
global.JSDATE = 'v=20250812T160109';
