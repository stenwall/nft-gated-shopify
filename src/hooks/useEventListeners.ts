import { useEffect, useState } from 'react';

// Prevent all interacting with the page while the modal is open, even if the modal is deleted from the DOM.
interface HookProps {
  owned: boolean;
  address: string | undefined;
  location: string | undefined;
}

interface ListenerProps {
  events: string[];
  element: HTMLElement;
  callbackFn: (e: Event) => void;
}

const allEvents = [
  'click',
  'touchstart',
  'touchmove',
  'touchend',
  'touchcancel',
  'wheel',
  'mousewheel',
  'mousedown',
  'keydown',
  'keyup',
  'keypress',
  'submit',
  'mouseover'
];

const clickEvents = [
  'click',
  'mousedown',
  'keydown',
  'keyup',
  'keypress',
  'submit'
];

const useEventListener = ({ owned, address, location }: HookProps) => {
  const [open, setOpen] = useState(false);

  const root = document.querySelector('#MainContent') as HTMLElement;

  const addListener = ({ events, element, callbackFn }: ListenerProps) => {
    events.forEach(event => {
      element.addEventListener(event, callbackFn);
    });
  };

  const removeListener = ({ events, element, callbackFn }: ListenerProps) => {
    events.forEach(event => {
      element.removeEventListener(event, callbackFn);
    });
  };
  65;

  useEffect(() => {
    console.log('location: ', location);

    const checkoutBtn = document.querySelector(
      '.shopify-payment-button'
    ) as HTMLElement;

    const buyBtn = document.querySelector(
      '.shopify-payment-button__button'
    ) as HTMLElement;

    const buyOptionsBtn = document.querySelector(
      '.shopify-payment-button__more-options'
    ) as HTMLElement;

    const quickAddBtns = document.querySelectorAll(
      '.quick-add__submit'
    ) as NodeListOf<HTMLElement>;

    const productFormBtn = document.querySelector(
      '.product-form__submit'
    ) as HTMLElement;

    const handleDisableEvents = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleAddToCart = (e: Event) => {
      if (!owned) {
        handleDisableEvents(e);
        setOpen(true);
      }
    };

    if (checkoutBtn) {
      checkoutBtn.style.display = 'none';
    }

    buyBtn &&
      addListener({
        events: clickEvents,
        element: buyBtn,
        callbackFn: handleAddToCart
      });

    buyOptionsBtn &&
      addListener({
        events: clickEvents,
        element: buyBtn,
        callbackFn: handleAddToCart
      });

    quickAddBtns &&
      quickAddBtns.forEach(btn => {
        addListener({
          events: clickEvents,
          element: btn,
          callbackFn: handleAddToCart
        });
      });

    productFormBtn &&
      addListener({
        events: clickEvents,
        element: productFormBtn,
        callbackFn: handleAddToCart
      });

    console.log('buyBtn', buyBtn);
    console.log('buyOptionsBtn', buyOptionsBtn);
    console.log('productFormBtn', productFormBtn);
    console.log('quickAddBtns', quickAddBtns);

    if (open) {
      root &&
        addListener({
          events: allEvents,
          element: root,
          callbackFn: handleDisableEvents
        });
    }

    if (owned) {
      setOpen(false);

      if (checkoutBtn) {
        checkoutBtn.style.display = 'block';
      }

      buyBtn &&
        removeListener({
          events: clickEvents,
          element: buyBtn,
          callbackFn: handleAddToCart
        });

      buyOptionsBtn &&
        removeListener({
          events: clickEvents,
          element: buyBtn,
          callbackFn: handleAddToCart
        });

      quickAddBtns &&
        quickAddBtns.forEach(btn => {
          removeListener({
            events: clickEvents,
            element: btn,
            callbackFn: handleAddToCart
          });
        });

      productFormBtn &&
        removeListener({
          events: clickEvents,
          element: productFormBtn,
          callbackFn: handleAddToCart
        });

      root &&
        removeListener({
          events: allEvents,
          element: root,
          callbackFn: handleDisableEvents
        });
    }

    return () => {
      if (owned) {
        setOpen(false);

        if (checkoutBtn) {
          checkoutBtn.style.display = 'block';
        }

        buyBtn &&
          removeListener({
            events: clickEvents,
            element: buyBtn,
            callbackFn: handleAddToCart
          });

        buyOptionsBtn &&
          removeListener({
            events: clickEvents,
            element: buyBtn,
            callbackFn: handleAddToCart
          });

        quickAddBtns &&
          quickAddBtns.forEach(btn => {
            removeListener({
              events: clickEvents,
              element: btn,
              callbackFn: handleAddToCart
            });
          });

        productFormBtn &&
          removeListener({
            events: clickEvents,
            element: productFormBtn,
            callbackFn: handleAddToCart
          });

        root &&
          removeListener({
            events: allEvents,
            element: root,
            callbackFn: handleDisableEvents
          });
      }
    };
  }, [root, owned, address, location]);

  return open;
};

export default useEventListener;
