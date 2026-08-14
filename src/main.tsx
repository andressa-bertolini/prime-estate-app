import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider } from './context/SearchContext';
import './styles/global.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SearchProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SearchProvider>
  </React.StrictMode>
);