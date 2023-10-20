import { displayCharts, createCharts } from './functions.mjs';

let results = JSON.parse(localStorage.getItem('typingTestResults')) || [];

displayCharts(results);
createCharts(results);