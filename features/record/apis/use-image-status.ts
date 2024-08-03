import { useMutation } from '@tanstack/react-query';

async function imageStatus(body: number[]) {
  const res = await fetch('', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}

export function useImageStatus() {
  return useMutation({
    mutationFn: imageStatus,
  });
}
