import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../rootRoute';
import { ImportCsv } from '../../components/features/import/ImportCsv';

export const importCsvRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/import-csv',
  component: ImportCsv,
});
