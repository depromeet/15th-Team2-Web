import { useMutation } from '@tanstack/react-query';

import { ImagePresignedResponse } from './dto';

async function imageEdit(data: {
  imageNames: string[];
  memoryId: number;
}): Promise<ImagePresignedResponse> {
  const res = await fetch(`/api/image/edit/${data.memoryId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageNames: data.imageNames }),
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}

export function useImageEdit() {
  return useMutation({
    mutationFn: imageEdit,
  });
}
