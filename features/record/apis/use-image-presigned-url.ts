import { useMutation } from '@tanstack/react-query';

async function imagePresignedUrl(data: { url: string; file: Blob }) {
  const res = await fetch(data.url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.file),
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json();
}

export function useImagePresignedUrl() {
  return useMutation({
    mutationFn: imagePresignedUrl,
  });
}
