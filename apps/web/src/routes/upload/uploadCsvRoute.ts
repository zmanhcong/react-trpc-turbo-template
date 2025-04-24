import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../rootRoute';
import { UploadCsv } from '../../components/features/upload/UploadCsv';

export const uploadCsvRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/upload-csv',
  component: UploadCsv,
});
