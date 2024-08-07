import { flex } from '@/styled-system/patterns';

type Mypage = {
  params: { id: string };
};
export default function Profile({ params }: Mypage) {
  return (
    <article className={containerStyle}>
      <p>{params.id}의 profile 입니다.</p>
    </article>
  );
}

const containerStyle = flex({
  direction: 'column',
  gap: '12px',
});
