import { Button, Image } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

type FollowListItem = {
  // TODO: Profile type 수정 (required)
  profile?: {
    id: string;
    nickname: string;
    summary: string;
  };
  isFollow: boolean;
  onClick?: () => void;
  onClickFollow?: () => void;
};
export const ProfileListItem = ({ isFollow }: FollowListItem) => {
  return (
    <div className={containerStyle}>
      <div className={profileImageStyle}>
        <Image
          src={''}
          alt="profile image"
          width={40}
          height={40}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={text.wrapperStyle}>
        <h1 className={text.nicknameStyle}>수영왕 정지영</h1>
        <p className={text.summaryStyle}>맞팔/좋아요/좋아요반사</p>
      </div>
      {isFollow ? (
        <Button
          size="small"
          label="팔로잉"
          variant="outlined"
          buttonType="assistive"
        />
      ) : (
        <Button size="small" label="팔로우" variant="outlined" />
      )}
    </div>
  );
};

const containerStyle = flex({
  py: '8px',
  gap: '16px',
  align: 'center',
  width: 'full',
});

const profileImageStyle = flex({
  width: '40px',
  height: '40px',
  align: 'center',
  rounded: 'full',
  overflow: 'hidden',
});

const text = {
  wrapperStyle: flex({
    gap: '2px',
    direction: 'column',
    grow: 1,
  }),

  nicknameStyle: css({
    textStyle: 'heading6',
    fontWeight: 'bold',
  }),

  summaryStyle: css({
    textStyle: 'body2.normal',
    fontWeight: 'regular',
    color: 'text.alternative',
  }),
};
