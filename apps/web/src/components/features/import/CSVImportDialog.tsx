import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Button } from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const CSVImportDialog: React.FC<Props> = ({ open, onClose }) => {
  const [file, setFile] = React.useState<File | null>(null);
  console.log('%c ⛲: file ', 'font-size:16px;background-color:#ffc195;color:black;', file)
  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>Import CSV</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please select a CSV file to import.
        </DialogContentText>
        <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button onClick={() => onClose()}>Import</Button>
      </DialogActions>
    </Dialog>
  )
}
