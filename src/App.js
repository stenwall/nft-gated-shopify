import React, { useEffect, useState } from 'react';
import {
  useAddress,
  ConnectWallet,
  useContract,
  useContractRead
} from '@thirdweb-dev/react';
import {
  Modal,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme.ts';
import './styles/styles.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxWidth: '90vw',
  bgcolor: '#0f0e12',
  border: '1px solid #c3c0bb',
  p: 1
};

const title =
  document.currentScript?.getAttribute('data-title') || 'Smircs - The Legacy';
const description =
  document.currentScript?.getAttribute('data-description') ||
  'This product is gated by an NFT. You must own this NFT to pass the gate. Connect your wallet to prove ownership.';
const image =
  document.currentScript?.getAttribute('data-image') ||
  'https://i.seadn.io/gae/6hwdC3WxMBsmKT6R4_4RCP44MYnMAhYAmtIygmxUMV7_ab7vLmicsmAv5TX2P43NhBtSQeBvUx5v5twbfow4zGBz9dp5cAEFNbVp?auto=format&w=3840';
const contractAddress =
  document.currentScript?.getAttribute('data-contract-address') ||
  '0x15fd0f20218967725e6b34a2881dc260d7e9d860';

export default function App() {
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const { data: balanceOf } = useContractRead(contract, 'balanceOf', address);
  const balance = balanceOf?.toNumber?.() || 0;

  const [open, setOpen] = useState(
    process.env.NODE_ENV === 'development' ||
      window.location.pathname.includes('/figurine') ||
      window.location.pathname.includes('/t-shirt')
  );

  useEffect(() => {
    if (!address || balance === 0) {
      setOpen(true);
      return;
    }

    // if (
    //   window.location.pathname.includes('/figurine') ||
    //   window.location.pathname.includes('/t-shirt')
    // ) {
    //   setOpen(false);
    //   return;
    // }

    setOpen(false);
  }, [address, balance]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Modal
        open={open}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card
            sx={{
              boxShadow: 0,
              borderRadius: 0
            }}
          >
            <CardMedia
              component="img"
              sx={{
                objectFit: 'contain',
                borderRadius: 0,
                width: '100%',
                height: '100%'
              }}
              image={image}
              alt="Smircs - The Legacy"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="h2">
                {title}
              </Typography>
              <Typography variant="body1">{description}</Typography>
            </CardContent>
            <CardActions>
              <ConnectWallet className="wallet-btn" />
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
