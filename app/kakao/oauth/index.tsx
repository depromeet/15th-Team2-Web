'use client';

import { useSetAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { LoginLoading, LoginScreen } from '@/features/login';
import { AuthInfoAtom } from '@/store/auth';
import { AuthResponse } from '@/types/authType';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useSetAtom(AuthInfoAtom);

  useEffect(() => {
    const KAKAO_CODE = searchParams.get('code');

    const postCode = async () => {
      if (!KAKAO_CODE) {
        console.error('코드가 유효하지 않습니다.');
        return;
      }
      try {
        const response = await fetch(`/api/kakao/oauth?code=${KAKAO_CODE}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: KAKAO_CODE }),
        });

        if (response.status === 200) {
          const data = (await response.json()) as AuthResponse;

          setAuth({
            isLogined: true,
            nickname: data.data.data.nickname,
            userId: data.data.data.userId,
          });

          if (data.data.data.isSignUpComplete) {
            router.push('/');
          } else {
            router.push('/join/nickname');
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    postCode().catch((error) => {
      console.error('Error:', error);
    });
  }, [router, searchParams, setAuth]);

  return (
    <>
      <LoginLoading />
      <LoginScreen isAnimate={false} />
    </>
  );
};

export default Page;
