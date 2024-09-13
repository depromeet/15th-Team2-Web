import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/atoms';
import { ProfileImage } from '@/components/molecules';
import { useMemberFollowingState } from '@/hooks';
import { css, cva } from '@/styled-system/css';
import { convertTimeToElapsedTime } from '@/utils';

import { layoutStyles, textStyles } from '../../styles';
import { FollowNotificationProps } from '../../types';

export function FollowNotification({
  memberId,
  type,
  hasRead,
  profileImageUrl,
  nickname,
  createdAt,
}: FollowNotificationProps) {
  const { useMemberIsFollowing, toggleFollow } = useMemberFollowingState();
  const { isFollowing } = useMemberIsFollowing(memberId);

  const handleFollowButtonClick = () => {
    void toggleFollow(memberId);
  };

  return (
    <li className={css(layoutStyles.total.raw({ hasRead }))}>
      <Link href={`/profile/${memberId}`} className={css({ display: 'flex' })}>
        <div className={profileImageStyles}>
          <ProfileImage
            alt="프로필 사진"
            src={profileImageUrl ?? ''}
            fill
            sizes="20vw"
            className={css({ borderRadius: 'full', objectFit: 'cover' })}
          />
        </div>
        <div className={css(layoutStyles.text.raw({ type }))}>
          {type === 'FRIEND' && (
            <p className={textStyles.main}>
              <span className={textStyles.userName}>{nickname}</span>님과 친구가
              되었어요!
            </p>
          )}
          {type === 'FOLLOW' && (
            <p className={textStyles.main}>
              <span className={textStyles.userName}>{nickname}</span>님을
              아시나요? <span className={textStyles.userName}>{nickname}</span>
              님이 나를 팔로우했어요.
            </p>
          )}
          <span className={textStyles.time}>
            {convertTimeToElapsedTime(createdAt)}
          </span>
        </div>
      </Link>

      {type === 'FOLLOW' &&
        (isFollowing ? (
          <Button
            size="small"
            label="팔로잉"
            variant="outlined"
            buttonType="assistive"
            className={css(followButtonStyles.raw({ isFollowing }))}
            onClick={handleFollowButtonClick}
          />
        ) : (
          <Button
            size="small"
            label="팔로우"
            variant="outlined"
            buttonType="primary"
            className={css(followButtonStyles.raw({ isFollowing }))}
            onClick={handleFollowButtonClick}
          />
        ))}
    </li>
  );
}

const followButtonStyles = cva({
  base: {
    position: 'absolute',
    top: '16px',
    right: '20px',
    backgroundColor: 'transparent',
  },
  variants: {
    isFollowing: {
      true: {},
      false: {
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#3B87F4',
          opacity: 0.05,
        },
      },
    },
  },
});

const profileImageStyles = css({
  position: 'relative',
  width: '40px',
  height: '40px',
  flexShrink: 0,
});
