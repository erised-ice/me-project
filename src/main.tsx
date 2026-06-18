import { StrictMode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@/shared/store/store.ts';
import { App } from './App.tsx';
import '@mantine/core/styles.layer.css';
import '@mantine/notifications/styles.layer.css';
import '@/styles/global.scss';

import '@/shared/i18n/config.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MantineProvider>
          <Notifications />
          <App />
        </MantineProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
