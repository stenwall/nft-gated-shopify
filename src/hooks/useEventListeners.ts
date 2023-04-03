import { useCallback, useEffect, useState } from 'react';

interface HookProps {
  owned: boolean;
  address: string | undefined;
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

const useEventListener = ({ owned, address }: HookProps) => {
  const [open, setOpen] = useState(false);
  const handleDisableEvents = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleAddToCart = useCallback((e: Event) => {
    if (!owned) {
      handleDisableEvents(e);
      setOpen(true);
    }
  }, []);

  const addListener = (
    events: string[],
    element: HTMLElement,
    callbackFn: (e: Event) => void
  ) => {
    events.forEach(event => {
      element.addEventListener(event, callbackFn);
    });
  };

  const removeListener = (
    events: string[],
    element: HTMLElement,
    callbackFn: (e: Event) => void
  ) => {
    events.forEach(event => {
      element.removeEventListener(event, callbackFn);
    });
  };

  useEffect(() => {
    const root = document.querySelector('#MainContent') as HTMLElement;

    // `buy it now` container el on product page
    const quickBuyBtn = document.querySelector(
      '.shopify-payment-button'
    ) as HTMLElement;

    // `buy it now` button el on product page
    const buyBtn = document.querySelector(
      '.shopify-payment-button__button'
    ) as HTMLElement;

    // quick but w eg pay pal from product page
    const buyOptionsBtn = document.querySelector(
      '.shopify-payment-button__more-options'
    ) as HTMLElement;

    // add to cart when not on product page
    const quickAddBtns = document.querySelectorAll(
      '.quick-add__submit'
    ) as NodeListOf<HTMLElement>;

    // add to cart on product page
    const productFormBtn = document.querySelector(
      '.product-form__submit'
    ) as HTMLElement;

    // buy/checkout button on cart-page
    const cartCheckoutBtn = document.querySelector(
      '.cart__checkout-button'
    ) as HTMLElement;

    // container for pay pal etc
    const dynamicCheckoutBtn = document.querySelector(
      '.cart__dynamic-checkout-buttons'
    ) as HTMLElement;

    if (quickBuyBtn) {
      quickBuyBtn.style.display = 'none';
    }

    if (dynamicCheckoutBtn) {
      dynamicCheckoutBtn.style.display = 'none';
    }

    // add event listeners for all buttons
    buyBtn && addListener(clickEvents, buyBtn, handleAddToCart);
    buyOptionsBtn && addListener(clickEvents, buyBtn, handleAddToCart);
    quickAddBtns &&
      quickAddBtns.forEach(btn => {
        addListener(clickEvents, btn, handleAddToCart);
      });
    productFormBtn && addListener(clickEvents, productFormBtn, handleAddToCart);
    cartCheckoutBtn &&
      addListener(clickEvents, cartCheckoutBtn, handleAddToCart);

    if (open) {
      root && addListener(allEvents, root, handleDisableEvents);
    }

    if (owned) {
      if (quickBuyBtn) {
        quickBuyBtn.style.display = 'block';
      }

      if (dynamicCheckoutBtn) {
        dynamicCheckoutBtn.style.display = 'block';
      }

      // remove all event listeners
      buyBtn && removeListener(clickEvents, buyBtn, handleAddToCart);
      buyOptionsBtn && removeListener(clickEvents, buyBtn, handleAddToCart);
      quickAddBtns &&
        quickAddBtns.forEach(btn => {
          removeListener(clickEvents, btn, handleAddToCart);
        });
      productFormBtn &&
        removeListener(clickEvents, productFormBtn, handleAddToCart);
      cartCheckoutBtn &&
        removeListener(clickEvents, cartCheckoutBtn, handleAddToCart);
      root && removeListener(allEvents, root, handleDisableEvents);
    }
  }, [owned, address]);

  return open;
};

export default useEventListener;
