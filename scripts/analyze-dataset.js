const XLSX = require('xlsx');
const fs = require('fs');

const wb = XLSX.readFile('dataset_umkm_jabar_2024_2025_full_kecamatan_sektor_8778rows.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(ws);

const output = [];
output.push('=== DATASET ANALYSIS ===');
output.push('Total Rows: ' + data.length);
output.push('\n=== ALL COLUMNS ===');
Object.keys(data[0]).forEach((k, i) => output.push(`${i}: ${k}`));

output.push('\n=== SAMPLE ROW ===');
output.push(JSON.stringify(data[0], null, 2));

output.push('\n=== UNIQUE VALUES ===');
output.push('Years: ' + JSON.stringify([...new Set(data.map(r => r.tahun))]));
output.push('Kab/Kota count: ' + [...new Set(data.map(r => r.kab_kota))].length);
output.push('Kecamatan count: ' + [...new Set(data.map(r => r.kecamatan))].length);
output.push('Sektor: ' + JSON.stringify([...new Set(data.map(r => r.sektor_umkm_utama))]));

fs.writeFileSync('dataset-analysis.txt', output.join('\n'));
console.log('Analysis saved to dataset-analysis.txt');
