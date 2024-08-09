import Link from 'next/link';

import { Button, SuccessCheckIcon } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

interface RecordSuccessPageProps {
  searchParams: { [key: string]: string };
}

export default function RecordSuccessPage({
  searchParams,
}: RecordSuccessPageProps) {
  const isEditMode = Boolean(searchParams.editMode);
  return (
    <div className={layoutStyles.full}>
      <div className={layoutStyles.content}>
        <SuccessCheckIcon />
        <h3 className={textStyles.title}>
          {isEditMode ? '수정' : '기록'} 완료!
        </h3>
        {isEditMode ? (
          <p className={textStyles.paragraph}>
            기록 수정이 성공적으로 완료되었어요.
          </p>
        ) : (
          <p className={textStyles.paragraph}>
            {searchParams.month}월 달{' '}
            <span className={textStyles.sub}>{searchParams.rank}번째</span>{' '}
            기록이에요.
          </p>
        )}
      </div>
      <Link
        href={`/record-detail/${searchParams.memoryId}`}
        className={buttonStyles}
      >
        <Button label="확인" size="large" className={css({ width: 'full' })} />
      </Link>
    </div>
  );
}

const layoutStyles = {
  full: flex({
    justifyContent: 'center',
    alignItems: 'center',
    height: '65vh',
  }),
  content: flex({
    direction: 'column',
    alignItems: 'center',
  }),
};

const textStyles = {
  title: css({
    textStyle: 'heading3',
    fontWeight: 600,
    margin: '20px 0 8px 0',
  }),
  paragraph: css({
    textStyle: 'heading6',
    fontWeight: 500,
    color: 'text.alternative',
  }),
  sub: css({
    color: 'primary.swim.총거리.default',
  }),
};

const buttonStyles = css({
  position: 'fixed',
  bottom: '36px',
  width: 'full',
  maxWidth: 'maxWidth',
  padding: '0 20px',
});
