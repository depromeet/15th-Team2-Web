import { ProfileListItem } from '@/components/molecules';
import { flex } from '@/styled-system/patterns';

export default function ProfileFollow() {
  return (
    <article className={containerStyle}>
      <p>팔로우 목록입니다.</p>
      <ProfileListItem isFollow={false} />
      <ProfileListItem isFollow={false} />
      <ProfileListItem isFollow={false} />
      <ProfileListItem isFollow={true} />
      <ProfileListItem isFollow={true} />
      <ProfileListItem isFollow={false} />
      <ProfileListItem isFollow={false} />
      <ProfileListItem isFollow={false} />
    </article>
  );
}

const containerStyle = flex({
  direction: 'column',
  gap: '12px',
});
