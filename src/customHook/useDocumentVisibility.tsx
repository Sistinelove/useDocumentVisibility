import {useEffect, useState, useCallback, useRef} from 'react';

type HandlerVisiblyChange = (isVisible: boolean) => void;

export const useDocumentVisibility = () => {
  const isClientSide = typeof document !== "undefined";
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(() => (
    isClientSide ? !document.hidden : true
  ));
  const handlersRef = useRef<HandlerVisiblyChange[]>([]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setVisible(!document.hidden);
      if (document.hidden) {
        setCount(prev => prev + 1);
      }
      handlersRef.current.forEach(handler => handler(!document.hidden));
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const onVisibilityChange = useCallback((handler: HandlerVisiblyChange) => {
    handlersRef.current.push(handler);

    return () => {
      handlersRef.current = handlersRef.current.filter(h => h !== handler);
    };
  }, []);

  return {count, visible, onVisibilityChange};
};
