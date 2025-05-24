import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import setupLocatorUI from "@locator/runtime";

const rootElement = document.getElementById('root')!;

if (process.env.NODE_ENV === "development") setupLocatorUI();

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
