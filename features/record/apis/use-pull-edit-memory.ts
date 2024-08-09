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

export function usePullEditMemory(memoryId: number) {
  return useQuery<MemoryPullResponse>({
    queryKey: ['usePullEditMemory', memoryId],
    queryFn: () => pullEditMemory(memoryId),
    retry: 1,
    enabled: !!memoryId,
  });
}
