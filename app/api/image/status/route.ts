import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';

import { ImageStatusResponse } from '../../../../features/record/apis/dto/image-status';

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as Promise<{ imageIds: number[] }>;
  const data = await fetchData<ImageStatusResponse>(
    `/image/status`,
    'PATCH',
    body,
  );

  return NextResponse.json(data);
}
