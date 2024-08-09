/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/atoms';
import { HeaderBar } from '@/components/molecules';
import { AuthInfoAtom } from '@/store/auth';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export interface NicknameData {
  nickname: string;
}

export interface NicknameResponse {
  status: number;
  code: string;
  message: string;
  data: {
    id: number;
    nickname: string;
    email: string;
  };
}

export default function JoinPage() {
  const router = useRouter();
  const authInfo = useAtomValue(AuthInfoAtom);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      nickname: authInfo.nickname || '',
    },
  });

  const nickname = watch('nickname');

  const onSubmit = async (data: NicknameData) => {
    const trimmedNickname = data.nickname.trim();

    if (trimmedNickname.length === 0) {
      return;
    }

    try {
      const response = await fetch('/api/join/nickname', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname: trimmedNickname }),
      });

      if (!response.ok) {
        console.error('Failed to update nickname');
        return;
      }

      const responseData = (await response.json()) as NicknameResponse;

      if (responseData.status === 200) {
        router.push('/join/gender');
      } else {
        console.error('Unexpected response status:', responseData.status);
      }
    } catch (error) {
      console.error('Error updating nickname:', error);
    }
  };

  return (
    <div>
      <HeaderBar className={css({ marginBottom: '24px' })} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={flex({
            direction: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px',
          })}
        >
          <div className={css({ textStyle: 'heading4', fontWeight: 'bold' })}>
            반가워요!<p></p>닉네임을 입력해주세요
          </div>

          <input
            type="text"
            placeholder="김스위미"
            maxLength={14}
            {...register('nickname', {
              required: true,
              minLength: 1,
              maxLength: 14,
            })}
            className={css({
              textAlign: 'center',
              textStyle: 'heading1',
              fontWeight: 'bold',
              margin: '80px 0px',
            })}
          />

          <Button
            buttonType="primary"
            variant="solid"
            label="다음"
            size="large"
            disabled={nickname.trim().length === 0}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
