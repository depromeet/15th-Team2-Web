'use client';

import { useEffect, useState } from 'react';

import useGetBrowserWidth from './use-get-browser-width';

export function useTimeBottomSheet(isBottomSheetOpen: boolean) {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const width = useGetBrowserWidth();

  useEffect(() => {
    let timer: number | undefined;

    if (isBottomSheetOpen) {
      timer = window.setTimeout(() => {
        setShowTimePicker(true);
      }, 150);
    } else {
      setShowTimePicker(false);
    }

    return () => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    };
  }, [isBottomSheetOpen]);

  return { width, showTimePicker };
}
