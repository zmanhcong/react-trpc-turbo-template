import React from 'react';
import { Link } from '@tanstack/react-router';

// SVG Icons for each button
const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: 8 }}>
    <path d="M10 14V5M10 5L6 9M10 5l4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 15.5A3.5 3.5 0 0013.5 12H13a1 1 0 01-1-1v0a1 1 0 00-1-1h-2a1 1 0 00-1 1v0a1 1 0 01-1 1h-.5A3.5 3.5 0 003 15.5v.5A2 2 0 005 18h10a2 2 0 002-2v-.5z" stroke="#1976d2" strokeWidth="1.5" strokeLinejoin="round" fill="#e3f2fd"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="20" height="20" fill="none" style={{ marginRight: 8 }} viewBox="0 0 20 20"><circle cx="9" cy="9" r="7" stroke="#fff" strokeWidth="1.5" fill="#b3e5fc"/><path d="M14.5 14.5L18 18" stroke="#1976d2" strokeWidth="1.5" strokeLinecap="round"/></svg>
);
const NormalizeIcon = () => (
  <svg width="20" height="20" fill="none" style={{ marginRight: 8 }} viewBox="0 0 20 20"><rect x="3" y="8" width="14" height="4" rx="2" fill="#b2dfdb" stroke="#fff" strokeWidth="1.5"/><path d="M7 8V6a3 3 0 016 0v2" stroke="#1976d2" strokeWidth="1.5"/></svg>
);
const MergeIcon = () => (
  <svg width="20" height="20" fill="none" style={{ marginRight: 8 }} viewBox="0 0 20 20"><rect x="2" y="6" width="6" height="8" rx="2" fill="#c5cae9" stroke="#fff" strokeWidth="1.5"/><rect x="12" y="6" width="6" height="8" rx="2" fill="#c5cae9" stroke="#fff" strokeWidth="1.5"/><path d="M8 10h4" stroke="#1976d2" strokeWidth="1.5"/></svg>
);
const BatchIcon = () => (
  <svg width="20" height="20" fill="none" style={{ marginRight: 8 }} viewBox="0 0 20 20"><rect x="3" y="3" width="14" height="14" rx="3" fill="#ffe082" stroke="#fff" strokeWidth="1.5"/><path d="M7 7h6v6H7z" fill="#1976d2"/></svg>
);
const ExportIcon = () => (
  <svg width="20" height="20" fill="none" style={{ marginRight: 8 }} viewBox="0 0 20 20"><rect x="3" y="3" width="14" height="14" rx="3" fill="#b2ebf2" stroke="#fff" strokeWidth="1.5"/><path d="M10 7v6M10 13l-2-2m2 2l2-2" stroke="#1976d2" strokeWidth="1.5" strokeLinecap="round"/></svg>
);

// ButtonLink component
const ButtonLink: React.FC<{ to: string; children: React.ReactNode; icon: React.ReactNode; width?: number }> = ({ to, children, icon, width }) => (
  <Link
    to={to}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: 8,
      fontWeight: 600,
      fontSize: 18,
      textDecoration: 'none',
      boxShadow: '0 2px 8px #e3f2fd',
      border: 'none',
      cursor: 'pointer',
      transition: 'background 0.2s',
      margin: 8,
      minWidth: 220,
      justifyContent: 'center',
      width,
    }}
  >
    {icon}
    {children}
  </Link>
);

export const HomePage: React.FC = () => (
  <div style={{ maxWidth: 700, margin: '60px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #e3f2fd', padding: 32, textAlign: 'center' }}>
    <h2 style={{ color: '#1976d2', marginBottom: 16 }}>Welcome Home!</h2>
    <p style={{ color: '#555', marginBottom: 32 }}>
      Upload and view Japanese postal code CSV data easily.<br />
      Explore more utilities below.
    </p>
    <div style={{ display: 'flex', gap: 0 }}>
      <div>
      <ButtonLink to="/upload-csv" icon={<UploadIcon />} width={300}>Upload CSV</ButtonLink>
      <ButtonLink to="#" icon={<SearchIcon />} width={300}>Postal Code Search</ButtonLink>
      <ButtonLink to="#" icon={<NormalizeIcon />} width={300}>Address Normalizer</ButtonLink>
      </div>
      <div>
      <ButtonLink to="/import-csv" icon={<MergeIcon />} width={300}>CSV Import</ButtonLink>
      <ButtonLink to="#" icon={<BatchIcon />} width={300}>Batch Validator</ButtonLink>
      <ButtonLink to="#" icon={<ExportIcon />} width={300}>Export Formatter</ButtonLink>
      </div>
    </div>
  </div>
);
