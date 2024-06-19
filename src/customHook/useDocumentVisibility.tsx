import React, {useEffect, useState, useCallback} from 'react';

export const useDocumentVisibility = () => {
  const isClientSide = typeof document !== "undefined";
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(isClientSide ? !document.hidden : true);

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

  const onVisibilityChange = useCallback((handler: (isVisible: boolean) => void) => {
    if(!isClientSide) return;
    const handleVisibility = () => {
      handler(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isClientSide]);

  return {count, visible, onVisibilityChange};
};
