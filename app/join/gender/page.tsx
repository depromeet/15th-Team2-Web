/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/atoms';
import { HeaderBar } from '@/components/molecules';
import { css, cva } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export interface GenderData {
  gender: string;
}

export interface GenderResponse {
  status: number;
  code: string;
  message: string;
  data: {
    id: number;
    gender: string;
    email: string;
  };
}

export default function JoinPage() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<string>('');

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
  };

  const onSubmit = async () => {
    if (!selectedGender) return;

    const data: GenderData = { gender: selectedGender };

    try {
      const response = await fetch('/api/join/gender', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error('Failed to update gender');
        return;
      }

      const responseData = (await response.json()) as GenderResponse;

      if (responseData.status === 200) {
        router.push('/');
      } else {
        console.error('Unexpected response status:', responseData.status);
      }
    } catch (error) {
      console.error('Error updating gender:', error);
    }
  };

  return (
    <div>
      <HeaderBar className={css({ marginBottom: '24px' })} />
      <div
        className={flex({
          direction: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '20px',
        })}
      >
        <div>
          <div className={css({ textStyle: 'heading4', fontWeight: 'bold' })}>
            성별을 입력해주세요
          </div>
          <div
            className={css({ textStyle: 'label2', color: 'text.placeHolder' })}
          >
            맞춤형 기록을 도와드려요!
          </div>
        </div>
        <div
          className={css({
            display: 'flex',
            width: 'full',
            gap: '10px',
            height: '140px',
            margin: '28px 0px',
          })}
        >
          <Button
            className={buttonStyles({
              gender: selectedGender === 'W' ? 'W' : 'default',
            })}
            label="여자"
            size="large"
            onClick={() => handleGenderSelect('W')}
          />
          <Button
            className={buttonStyles({
              gender: selectedGender === 'M' ? 'M' : 'default',
            })}
            label="남자"
            size="large"
            onClick={() => handleGenderSelect('M')}
          />
        </div>
        <Button
          buttonType="primary"
          variant="solid"
          label="다음"
          size="large"
          disabled={!selectedGender}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
}

const buttonStyles = cva({
  base: {
    width: 'full',
    height: '140px',
    textStyle: 'heading3',
  },
  variants: {
    gender: {
      W: {
        backgroundColor: 'blue.90',
        color: 'blue.40',
      },
      M: {
        backgroundColor: 'blue.90',
        color: 'blue.40',
      },
      default: {
        backgroundColor: 'fill.normal',
        color: 'text.placeHolder',
      },
    },
  },
});
