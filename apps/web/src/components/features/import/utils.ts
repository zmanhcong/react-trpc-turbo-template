import Papa from 'papaparse';
import * as Encoding from 'encoding-japanese';
import csvUrl from './format.csv?url';

export const downloadCSV = <T extends readonly string[]>(rows: T[], filename: string) => {
  const csv = Papa.unparse(rows, { header: false, quotes: true});
  downloadTextAsShiftJis(filename, csv);
}

const fileToText = async (file: File, encoding: 'shift_jis'): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target === null || typeof e.target.result !== 'string') {
        reject(new Error('Failed to read file'));
        return;
      }
      resolve(e.target.result);
    };
    reader.onerror = (e) => {
      reject(e);
    };
    reader.readAsText(file, encoding);
  });
}

export const parseCSV = async (file: File) => {
  const csv = await fileToText(file, 'shift_jis');
  return new Promise((resolve) => {
    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
      console.log('%c 🏊‍♂️: parseCSV -> results ', 'font-size:16px;background-color:#1cf137;color:black;', results)
        resolve(results.data);
      },
    });
  });
}

export const handleDownloadCSVTemplate = async () => {
  try {
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'format.csv';
    anchor.click();
    anchor.remove();
    window.URL.revokeObjectURL(url);
  } catch (e) {
    console.error('Failed to fetch or download format.csv:', e);
  }
};
  

export const downloadTextAsShiftJis = (filename: string, text: string) => {
  const unicodeArray = Encoding.stringToCode(text);
  const shiftJisCodeList = Encoding.convert(unicodeArray, { to: 'SJIS', from: 'UNICODE' });
  const shiftJisString = new Uint8Array(shiftJisCodeList);

  const blob = new Blob([shiftJisString], { type: 'text/csv;charset=Shift_JIS' });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  anchor.remove();
  window.URL.revokeObjectURL(url);
};
