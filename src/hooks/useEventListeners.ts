import { useCallback, useEffect, useState } from 'react';

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
  const handleDisableEvents = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleAddToCart = useCallback((e: Event) => {
    console.log('`owned` in `handleAddToCart`', owned);
    if (!owned) {
      handleDisableEvents(e);
      setOpen(true);
    }
  }, []);

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

    const quickBuyBtn = document.querySelector(
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

    const cartCheckoutBtn = document.querySelector(
      '.cart__checkout-button'
    ) as HTMLElement;

    const dynamicCheckoutBtn = document.querySelector(
      '.cart__dynamic-checkout-buttons'
    ) as HTMLElement;

    if (quickBuyBtn) {
      quickBuyBtn.style.display = 'none';
    }

    if (dynamicCheckoutBtn) {
      dynamicCheckoutBtn.style.display = 'none';
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

    cartCheckoutBtn &&
      addListener({
        events: clickEvents,
        element: cartCheckoutBtn,
        callbackFn: handleAddToCart
      });

    console.log('buyBtn', buyBtn);
    console.log('buyOptionsBtn', buyOptionsBtn);
    console.log('productFormBtn', productFormBtn);
    console.log('quickAddBtns', quickAddBtns);
    console.log('cartCheckoutBtn', cartCheckoutBtn);
    console.log('dynamicCheckoutBtn', dynamicCheckoutBtn);

    if (open) {
      root &&
        addListener({
          events: allEvents,
          element: root,
          callbackFn: handleDisableEvents
        });
    }

    if (owned) {
      console.log('`owned` in top of if-statement', owned);
      setOpen(false);

      if (quickBuyBtn) {
        quickBuyBtn.style.display = 'block';
      }

      if (dynamicCheckoutBtn) {
        dynamicCheckoutBtn.style.display = 'block';
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

      cartCheckoutBtn &&
        removeListener({
          events: clickEvents,
          element: cartCheckoutBtn,
          callbackFn: handleAddToCart
        });

      root &&
        removeListener({
          events: allEvents,
          element: root,
          callbackFn: handleDisableEvents
        });

      console.log('`owned` in bottom of if-statement', owned);
    }

    // return () => {
    //   if (owned) {
    //     console.log('`owned` in if-statement in return-fn', owned);
    //     setOpen(false);

    //     if (quickBuyBtn) {
    //       quickBuyBtn.style.display = 'block';
    //     }

    //     buyBtn &&
    //       removeListener({
    //         events: clickEvents,
    //         element: buyBtn,
    //         callbackFn: handleAddToCart
    //       });

    //     buyOptionsBtn &&
    //       removeListener({
    //         events: clickEvents,
    //         element: buyBtn,
    //         callbackFn: handleAddToCart
    //       });

    //     quickAddBtns &&
    //       quickAddBtns.forEach(btn => {
    //         removeListener({
    //           events: clickEvents,
    //           element: btn,
    //           callbackFn: handleAddToCart
    //         });
    //       });

    //     productFormBtn &&
    //       removeListener({
    //         events: clickEvents,
    //         element: productFormBtn,
    //         callbackFn: handleAddToCart
    //       });

    //     root &&
    //       removeListener({
    //         events: allEvents,
    //         element: root,
    //         callbackFn: handleDisableEvents
    //       });
    //   }
    // };
  }, [root, owned, address, location]);

  return open;
};

export default useEventListener;
