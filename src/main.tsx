import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider } from './context/SearchContext';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const queryClient = new QueryClient();

async function enableMocking() {
  if (import.meta.env.VITE_USE_MSW !== 'true') {
    return;
  }

  const { worker } = await import("./mocks/browser");

  await worker.start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <SearchProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </SearchProvider>
    </React.StrictMode>
  );
});
