import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { ImagePresignedResponse } from '@/features/record';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { memoryId: number } },
) {
  const body = (await request.json()) as Promise<{ imageNames: string[] }>;
  console.log(body);
  const data = await fetchData<ImagePresignedResponse>(
    `/image/memory/${params.memoryId}`,
    'PATCH',
    body,
  );

  return NextResponse.json(data);
}
