import React, {useEffect, useState, useCallback} from 'react';

export const useDocumentVisibility = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(!document.hidden);

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
  }, []);

  const onVisibilityChange = useCallback((handler: (isVisible: boolean) => void) => {
    const handleVisibility = () => {
      handler(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return {count, visible, onVisibilityChange};
};
