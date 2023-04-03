import { useEffect, useState } from 'react';
import { useAddress, ConnectWallet, useContract } from '@thirdweb-dev/react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CircularProgress from '@mui/material/CircularProgress';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './styles/theme';
import './styles/styles.css';
import useEventListener from './hooks/useEventListeners';

const title =
  document.currentScript?.getAttribute('data-title') ||
  import.meta.env.VITE_TITLE;
const description =
  document.currentScript?.getAttribute('data-description') ||
  import.meta.env.VITE_DESCRIPTION;
const image =
  document.currentScript?.getAttribute('data-image') ||
  import.meta.env.VITE_IMAGE;
const contractAddress =
  document.currentScript?.getAttribute('data-contract-address') ||
  import.meta.env.VITE_CONTRACT;

export default function App() {
  const address = useAddress();
  const { contract } = useContract(contractAddress, 'nft-drop');
  const [owned, setOwned] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = window.location.href;
  const open = useEventListener({ owned, address, location });

  useEffect(() => {
    if (address && contract) {
      setLoading(true);
      contract
        .getOwned(address)
        .then(owned => {
          if (owned.length) {
            setOwned(true);
          }
        })
        .catch((err: Error) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [address, contract]);

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={() => {}}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {loading ? (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <CircularProgress size="4rem" />
          </Box>
        ) : (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              maxWidth: '90vw',
              bgcolor: '#0f0e12',
              border: '1px solid #c3c0bb',
              p: 1
            }}
          >
            <Card>
              <CardMedia
                component="img"
                image={image}
                alt={import.meta.env.VITE_TITLE}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h3"
                  component="h2"
                  id="modal-title"
                >
                  {title}
                </Typography>
                <Typography variant="body1" id="modal-description">
                  {description}
                </Typography>
              </CardContent>
              <CardActions>
                <ConnectWallet className="wallet-btn" />
              </CardActions>
            </Card>
          </Box>
        )}
      </Modal>
    </ThemeProvider>
  );
}
