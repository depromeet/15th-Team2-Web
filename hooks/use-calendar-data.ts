import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { CalendarResponse } from '@/features/main/calendar';
import { calendarDateAtom } from '@/store';

const getCalendarData = async (year: number, month: number) => {
  const res = await fetch(`/api/memory/calendar?year=${year}&month=${month}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
};

export const useCalendarData = () => {
  const { year, month } = useAtomValue(calendarDateAtom);

  return useQuery<CalendarResponse>({
    queryKey: ['calendarData', year, month],
    queryFn: () => getCalendarData(year, month),
    placeholderData: keepPreviousData,
  });
};
