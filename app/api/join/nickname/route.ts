import { NextRequest, NextResponse } from 'next/server';

import { fetchData } from '@/apis/fetch-data';
import { NicknameData, NicknameResponse } from '@/app/join/nickname/page';

export async function PATCH(request: NextRequest) {
  try {
    const { nickname } = (await request.json()) as NicknameData;

    const data = await fetchData<NicknameResponse>(
      '/member/nickname',
      'PATCH',
      {
        nickname,
      },
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating nickname:', error);
    return NextResponse.error();
  }
}
