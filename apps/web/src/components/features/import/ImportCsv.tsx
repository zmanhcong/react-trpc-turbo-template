import { Box, Button, Container, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React from "react";
import { handleDownloadCSVTemplate, parseCSV } from "./utils";
import { styled } from '@mui/material';

// https://mui.com/material-ui/react-button/#file-upload
const VisuallyHiddenInputCustom = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const ImportCsv = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  const rows: GridRowsProp = [
    { id: 1, name: 'Data Grid', description: 'the Community version' },
    { id: 2, name: 'Data Grid Pro', description: 'the Pro version' },
    { id: 3, name: 'Data Grid Premium', description: 'the Premium version' },
  ];
  
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Product Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
  ];

  const handleUploadClick = () => ref.current?.click();
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = event.target;
    if(files === null || files.length === 0) return;
    const file = files[0];
    const parsed = parseCSV(file);
    console.log('%c 🐯: handleUpload -> parsed ', 'font-size:16px;background-color:#09f683;color:black;', parsed)
  }
    
  
  return (
    <Container>
    <Box sx={{ p: 3 }}>
      <Stack sx={{ mb: 2 }} direction="row" spacing={2}>
        <Box>
          <Button variant="outlined" color="primary" onClick={handleUploadClick}>Import CSV</Button>
          <VisuallyHiddenInputCustom ref={ref} type="file" accept=".csv" onChange={handleUpload} />
        </Box>
        <Box>
          <Button variant="outlined" color="primary" onClick={handleDownloadCSVTemplate}>Download Format</Button>
        </Box>
      </Stack>
      <DataGrid rows={rows} columns={columns} />
    </Box>
    </Container>
  )
};
