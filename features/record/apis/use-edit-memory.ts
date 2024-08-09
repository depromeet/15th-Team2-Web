'use client';

import { useQuery } from '@tanstack/react-query';

import { MemoryPullResponse } from './dto/memory';

async function pullEditMemory(memoryId: number) {
  const res = await fetch(`/api/memory/${memoryId}/edit-data`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
}

export function useEditMemory(memoryId: number) {
  return useQuery<MemoryPullResponse>({
    queryKey: ['usePullMemory', memoryId],
    queryFn: () => pullEditMemory(memoryId),
    retry: 1,
    enabled: !!memoryId,
  });
}
