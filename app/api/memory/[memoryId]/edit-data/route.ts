import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { MemoryPullResponse } from '@/features/record';

export async function GET(
  request: NextRequest,
  { params }: { params: { memoryId: number } },
) {
  const data = await fetchData<MemoryPullResponse>(
    `/memory/${Number(params.memoryId)}/edit-data`,
    'GET',
  );

  return NextResponse.json(data);
}
