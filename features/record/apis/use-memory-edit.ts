import { useMutation } from '@tanstack/react-query';

import { MemoryPullResponse, RecordRequestProps } from './dto';

async function memoryEdit(data: {
  formData: RecordRequestProps;
  memoryId: number;
}): Promise<MemoryPullResponse> {
  const res = await fetch(
    `/api/memory/edit/${data.memoryId}
    `,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.formData),
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}

export function useMemoryEdit() {
  return useMutation({
    mutationFn: memoryEdit,
  });
}
