import React, { useEffect, useState, useCallback } from 'react';

export const useDocumentVisibility = () => {
  const isClientSide = typeof document !== "undefined";
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(isClientSide ? !document.hidden : true);
  const [handlers, setHandlers] = useState<((isVisible: boolean) => void)[]>([]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setCount(prev => prev + 1);
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isClientSide]);

  useEffect(() => {
    const handleVisibility = () => {
      const isVisible = !document.hidden;
      handlers.forEach(handler => handler(isVisible));
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [handlers]);

  const onVisibilityChange = useCallback((handler: (isVisible: boolean) => void) => {
    setHandlers(prevHandlers => [...prevHandlers, handler]);

    return () => {
      setHandlers(prevHandlers => prevHandlers.filter(h => h !== handler));
    };
  }, []);

  return { count, visible, onVisibilityChange };
};
