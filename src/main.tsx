import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import App from './App';

// This is the chainId your dApp will work on.
// You can import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain =
  parseInt(
    document.currentScript?.getAttribute('data-desired-chain-id') as string
  ) || 'ethereum' as any;

const elementId = 'gated-modal';
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
