import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { GenderData, GenderResponse } from '@/app/join/gender/page';

export async function PATCH(request: NextRequest) {
  try {
    const { gender } = (await request.json()) as GenderData;

    const data = await fetchData<GenderResponse>('/member/gender', 'PATCH', {
      gender,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating gender:', error);
    return NextResponse.error();
  }
}
