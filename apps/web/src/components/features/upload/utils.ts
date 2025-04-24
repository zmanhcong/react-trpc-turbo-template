import Papa from 'papaparse';
import { CsvHeaderKey, PostalCodeRow, ExtendedPostalCodeRow, csvHeaderJa } from './types';

// Utility to remove parentheses. Exg: "大通西（１〜１９丁目）" -> "大通西"
const transformTownName = (name: string | undefined) =>
  typeof name === 'string' ? name.replace(/（.*?）/g, '').trim() : '';

// Build reverse mapping: Japanese label -> internal key
const jaToKey: Record<string, CsvHeaderKey> = Object.entries(csvHeaderJa).reduce(
  (acc, [key, ja]) => {
    acc[ja] = key as CsvHeaderKey;
    return acc;
  },
  {} as Record<string, CsvHeaderKey>
);

function mapJaKeysToInternal(row: Record<string, string>): Record<CsvHeaderKey, string> {
  const result = {} as Record<CsvHeaderKey, string>;
  for (const [ja, value] of Object.entries(row)) {
    const key = jaToKey[ja];
    if (key) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Parses a Japanese postal codes CSV file or string and returns the processed result as a Promise.
 * @param input File or CSV string
 * @returns Promise<ExtendedPostalCodeRow[]>
 */
export async function parsePostalCodeCsv(
  input: File | string
): Promise<ExtendedPostalCodeRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(input, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const processed = results.data.map((row) => {
          const mapped = mapJaKeysToInternal(row as Record<string, string>);
          return {
            ...mapped,
            originalTownArea: mapped.townArea ?? '',
            townArea: transformTownName(mapped.townArea),
          };
        });
        resolve(processed);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}
