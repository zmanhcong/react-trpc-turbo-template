import React, { useRef, useState } from 'react';
import { parsePostalCodeCsv } from './utils';
import { CsvHeaderKey, ExtendedPostalCodeRow } from './types';

const csvHeaderJa = {
  nationalLocalPublicEntityCode: '全国地方公共団体コード',
  oldPostalCode: '旧郵便番号',
  postalCode: '郵便番号',
  prefectureKana: '都道府県名（カナ）',
  cityKana: '市区町村名（カナ）',
  townAreaKana: '町域名（カナ）',
  prefecture: '都道府県名',
  city: '市区町村名',
  townArea: '町域名',
  hasAnotherPostalCode: '一町域が複数の郵便番号で表される場合',
  isNumberedForEachKoaza: '小字毎に番地が起番されている町域',
  hasChome: '丁目を有する町域か',
  hasMultipleTownArea: '一つの郵便番号で複数の町域を表す場合',
  updateIndicator: '更新の表示',
  updateReason: '変更理由',
  originalTownArea: '元の町域名',
} as const;

const extendedHeader = [
  ...Object.keys(csvHeaderJa).filter(k => k !== 'originalTownArea'),
  'originalTownArea',
] as CsvHeaderKey[];

const wideColumns = [
  'nationalLocalPublicEntityCode',
  'prefectureKana',
  'cityKana',
  'townAreaKana',
  'prefecture',
  'city',
  'townArea',
  'originalTownArea',
];

const tableHeaderStyle = {
  border: '1px solid #e3f2fd',
  padding: '10px 6px',
  background: '#1976d2',
  color: '#fff',
  fontWeight: 700,
  fontSize: 15,
  width: 140,
  minWidth: 120,
  maxWidth: 220,
  whiteSpace: 'pre-line' as 'pre-line',
  wordBreak: 'break-word' as 'break-word',
  overflowWrap: 'break-word' as 'break-word',
  textAlign: 'center' as 'center',
};

const tableCellStyle = {
  border: '1px solid #e3f2fd',
  padding: 8,
  background: '#fff',
  fontSize: 14,
  color: '#333',
  whiteSpace: 'pre-wrap' as 'pre-wrap',
  wordBreak: 'break-all' as 'break-all',
};

function convertToCsv(rows: ExtendedPostalCodeRow[], headers: CsvHeaderKey[]): string {
  const headerLine = headers.map(h => csvHeaderJa[h] || h).join(',');
  const dataLines = rows.map(row => headers.map(h => `"${(row[h as keyof ExtendedPostalCodeRow] ?? '').replace(/"/g, '""')}"`).join(','));
  return [headerLine, ...dataLines].join('\r\n');
}

function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const UploadCsv: React.FC = () => {
  const [csvData, setCsvData] = useState<ExtendedPostalCodeRow[]>([]);
  const [filename, setFilename] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilename(file.name);
      try {
        const data = await parsePostalCodeCsv(file);
        setCsvData(data);
      } catch (error) {
        console.error('CSV Parse Error:', error);
      }
    }
  };

  const handleSelectFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleLoadPostalCodes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/src/routes/upload/postal-codes.csv');
      const text = await response.text();
      const data = await parsePostalCodeCsv(text);
      setCsvData(data);
      setFilename('postal-codes.csv');
      setLoading(false);
    } catch (e) {
      console.error('Failed to fetch or parse postal-codes.csv:', e);
      setLoading(false);
    }
  };

  const handleExportCsv = () => {
    const csv = convertToCsv(csvData, extendedHeader);
    downloadCsv(filename ? `exported_${filename}` : 'exported_postal_codes.csv', csv);
  };

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #e3f2fd', minHeight: 600 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 8, fontWeight: 700, fontSize: 28, letterSpacing: 0.5 }}>Upload Postal Code CSV</h2>
      <p style={{ color: '#555', marginBottom: 24, fontSize: 16 }}>Easily upload and preview Japanese postal code CSV data. Supports both manual upload and sample data.</p>
      <div style={{ marginBottom: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
        <button
          onClick={handleSelectFileClick}
          style={{
            padding: '10px 24px',
            fontSize: 16,
            background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #e3f2fd',
            transition: 'background 0.2s',
          }}
        >
          ファイルを選択
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button
          onClick={handleLoadPostalCodes}
          disabled={loading}
          style={{
            padding: '10px 24px',
            fontSize: 16,
            background: loading
              ? 'linear-gradient(90deg, #90caf9 0%, #e3f2fd 100%)'
              : 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px #e3f2fd',
            transition: 'background 0.2s',
          }}
        >
          {loading ? '読み込み中...' : 'サンプルCSVを読み込む'}
        </button>
        <button
          onClick={handleExportCsv}
          disabled={csvData.length === 0}
          style={{
            padding: '10px 24px',
            fontSize: 16,
            background: csvData.length === 0
              ? '#bdbdbd'
              : 'linear-gradient(90deg, #388e3c 0%, #81c784 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            cursor: csvData.length === 0 ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px #e3f2fd',
            transition: 'background 0.2s',
          }}
        >
          エクスポート
        </button>
        {filename && <span style={{ color: '#1976d2', fontWeight: 500, marginLeft: 12 }}>ファイル名: {filename}</span>}
      </div>
      {csvData.length > 0 && (
        <div style={{ overflowX: 'auto', marginTop: 16, borderRadius: 8, boxShadow: '0 2px 8px #e3f2fd' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', background: '#fafcff', borderRadius: 8, overflow: 'hidden' }}>
            <thead>
              <tr>
                {extendedHeader.map((header, idx) => (
                  <th
                    key={idx}
                    style={{
                      ...tableHeaderStyle,
                      width: wideColumns.includes(header) ? 200 : 110,
                      minWidth: wideColumns.includes(header) ? 180 : 100,
                      maxWidth: wideColumns.includes(header) ? 260 : 140,
                    }}
                  >
                    {csvHeaderJa[header] || header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#f5faff' : '#fff' }}>
                  {extendedHeader.map((header, j) => (
                    <td
                      key={j}
                      style={{
                        ...tableCellStyle,
                        width: wideColumns.includes(header) ? 200 : 110,
                        minWidth: wideColumns.includes(header) ? 180 : 100,
                        maxWidth: wideColumns.includes(header) ? 260 : 140,
                      }}
                    >
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
