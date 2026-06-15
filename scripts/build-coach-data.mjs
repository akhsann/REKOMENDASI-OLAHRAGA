import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const xlsxPath =
  process.argv[2] ||
  'd:/TUGAS AKHIR/FORM KUSIONER COACH/SALINAN KUSIONER VALIDASI COACH.xlsx';

const wb = XLSX.readFile(xlsxPath, { cellDates: true });
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null });

function cellStr(v) {
  if (v == null || v === '') return '';
  if (typeof v === 'boolean') return v ? '1' : '';
  return String(v).trim();
}

/** Detect coach marking in Excel (checkbox sometimes exports as 1, TRUE, x, ✓) */
function isMarked(v) {
  const s = cellStr(v).toLowerCase();
  if (!s) return false;
  if (s === '1' || s === 'true' || s === 'x' || s === 'v' || s === '✓' || s === 'checked')
    return true;
  return Boolean(v === true || v === 1);
}

const CONDITIONS = new Map([
  ['HIPERTENSI', 'hipertensi'],
  ['ASMA', 'asma'],
  ['DIABETES', 'diabetes'],
  ['OBESITAS', 'obesitas'],
  ['NYERI SENDI', 'nyeri-sendi'],
]);

function deriveSafety(aman, tidakAman, amanCatatan, catatanText) {
  if (isMarked(tidakAman)) return 'tidak_aman';
  if (isMarked(amanCatatan) || catatanText) return 'aman_dengan_catatan';
  if (isMarked(aman)) return 'aman';
  if (catatanText) return 'aman_dengan_catatan';
  return 'tidak_diketahui';
}

let currentCondition = null;
const rules = [];
let inIntensitySection = false;

for (let i = 0; i < rows.length; i++) {
  const row = rows[i] || [];
  const c0 = cellStr(row[0]);
  const c1 = cellStr(row[1]);

  if (c1 === 'HIPERTENSI' || c1 === 'ASMA' || c1 === 'DIABETES' || c1 === 'OBESITAS' || c1 === 'NYERI SENDI') {
    currentCondition = CONDITIONS.get(c1);
    inIntensitySection = false;
    continue;
  }

  if (c1 === 'TINGKAT ITENSITAS' || c1.includes('TINGKAT ITENSITAS')) {
    inIntensitySection = true;
    currentCondition = null;
    continue;
  }

  if (!currentCondition || inIntensitySection) continue;

  if (c1 === 'Nama Olaharga' && cellStr(row[2]) === 'Aman') continue;

  const exerciseName = c1;
  if (!exerciseName || exerciseName === 'Nama Olaharga') continue;

  const aman = row[2];
  const tidakAman = row[3];
  const amanCatatan = row[4];
  const catatanText = cellStr(row[5]);

  let safety = deriveSafety(aman, tidakAman, amanCatatan, catatanText);
  if (safety === 'tidak_diketahui' && !isMarked(aman) && !isMarked(tidakAman) && !isMarked(amanCatatan)) {
    safety = 'aman';
  }

  rules.push({
    condition: currentCondition,
    questionnaireExerciseName: exerciseName,
    safety,
    catatan: catatanText || undefined,
  });
}

const outDir = path.join(__dirname, '..', 'src', 'data');
const outFile = path.join(outDir, 'coachQuestionnaire.generated.json');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  outFile,
  JSON.stringify({ rules, generatedFrom: xlsxPath }, null, 2),
  'utf8'
);
console.log('Wrote', rules.length, 'rules to', outFile);
