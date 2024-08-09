import { error } from 'console';
import { NextRequest, NextResponse } from 'next/server';

import { setAuthCookies } from '@/apis/server-cookie';
import { LoginResponse } from '@/types/authType';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: '코드가 누락되었습니다.' },
      { status: 400 },
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/login/google`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: `${process.env.NEXT_PUBLIC_LOGIN_URL}`,
      },
      body: JSON.stringify({ code }),
    },
  );

  console.log(code);
  console.log(res);

  if (!res.ok) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: '토큰을 확인해주세요.' },
      { status: res.status },
    );
  }

  const data = (await res.json()) as LoginResponse;

  // 쿠키 설정
  setAuthCookies(data.data);

  return NextResponse.json({ data }, { status: res.status });
}
