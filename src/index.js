import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';
import './styles/globals.css';

// This is the chainId your dApp will work on.
const activeChain =
  parseInt(document.currentScript?.getAttribute('data-desired-chain-id')) ||
  ChainId.Etherium;

const elementId = 'smircs-token-gating-app';
const container = document.createElement('div');
container.setAttribute('id', elementId);
document.body.appendChild(container);

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
