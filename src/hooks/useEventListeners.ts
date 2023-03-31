import { useEffect, useState } from 'react';

// Prevent all interacting with the page while the modal is open, even if the modal is deleted from the DOM.

interface HookProps {
  owned: boolean;
  address: string | undefined;
}

interface ListenerProps {
  events: string[];
  element: HTMLElement;
  callbackFn: (e: Event) => void;
}

const listenerEvents = [
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

const useEventListener = ({ owned, address }: HookProps) => {
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

  useEffect(() => {
    const checkoutBtn = document.querySelector(
      '.shopify-payment-button'
    ) as HTMLElement;

    const quickAddBtn = document.querySelector(
      '.quick-add__submit'
    ) as HTMLElement;

    const handleDisableEvents = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleQuickAdd = (e: Event) => {
      handleDisableEvents(e);
      setOpen(true);
    };

    quickAddBtn &&
      addListener({
        events: listenerEvents,
        element: quickAddBtn,
        callbackFn: handleQuickAdd
      });

    if (
      window.location.pathname.includes('/figurine') ||
      window.location.pathname.includes('/t-shirt') ||
      window.location.pathname.includes('/checkouts') ||
      window.location.pathname.includes('/cart')
    ) {
      if (!address || !owned) {
        setOpen(true);
        if (checkoutBtn) {
          checkoutBtn.style.display = 'none';
        }
        root &&
          addListener({
            events: listenerEvents,
            element: root,
            callbackFn: handleDisableEvents
          });
        return;
      } else if (owned) {
        setOpen(false);
        if (checkoutBtn) {
          checkoutBtn.style.display = 'block';
        }
        root &&
          removeListener({
            events: listenerEvents,
            element: root,
            callbackFn: handleDisableEvents
          });
      }
    } else {
      root &&
        removeListener({
          events: listenerEvents,
          element: root,
          callbackFn: handleDisableEvents
        });
    }

    return () => {
      root &&
        removeListener({
          events: listenerEvents,
          element: root,
          callbackFn: handleDisableEvents
        });
      if (checkoutBtn) {
        checkoutBtn.style.display = 'block';
      }
    };
  }, [root, owned, address]);

  return open;
};

export default useEventListener;
