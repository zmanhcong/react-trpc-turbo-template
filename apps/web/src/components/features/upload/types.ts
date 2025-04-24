export type CsvHeaderKey =
  | 'nationalLocalPublicEntityCode'
  | 'oldPostalCode'
  | 'postalCode'
  | 'prefectureKana'
  | 'cityKana'
  | 'townAreaKana'
  | 'prefecture'
  | 'city'
  | 'townArea'
  | 'hasAnotherPostalCode'
  | 'isNumberedForEachKoaza'
  | 'hasChome'
  | 'hasMultipleTownArea'
  | 'updateIndicator'
  | 'updateReason'
  | 'originalTownArea';

export type PostalCodeRow = Record<CsvHeaderKey, string>;
export type ExtendedPostalCodeRow = Omit<PostalCodeRow, 'townArea'> & {
  townArea: string;
  originalTownArea: string;
};

export const csvHeaderJa: Record<CsvHeaderKey, string> = {
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
};
