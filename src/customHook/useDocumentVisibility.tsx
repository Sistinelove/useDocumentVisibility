import React, {useCallback, useEffect, useState} from 'react';

export const useDocumentVisibility = () => {
  const [count, setCount] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    countAdd();
    return () => {
      document.removeEventListener("visibilitychange", countAdd)
    }
  }, [])

  function countAdd() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        setCount(prev => prev + 1);
        setVisible(false);
      } else {
        setVisible(true);
      }
    })
  }

  const onVisibilityChange = useCallback((handler: (isVisible: boolean) => void) => {
    const handleVisibility = () => {
      handler(!document.hidden);
    }
    return () => {
      document.removeEventListener("visibilitychange",handleVisibility);
    }
  }, [])

  return {count, visible, onVisibilityChange};
};
