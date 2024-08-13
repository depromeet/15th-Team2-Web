import { css, cva } from '@/styled-system/css';

import { DetailCheerItem } from '../types';

type CheerItem = {
  isSelected?: boolean;
  onClick?: () => void;
  nickname?: string;
  size?: 'small' | 'medium';
} & DetailCheerItem;

// TODO: 로직 구현에 맞춰 props 수정
export const CheerItem = ({
  isSelected,
  onClick,
  nickname,
  size = 'medium',
  ...item
}: CheerItem) => {
  if (!item?.emoji?.length && !item?.comment?.length) return null;
  return (
    // NOTE: isSelected undefined 대응하여 Boolean 사용
    <button
      className={containerStyle({ isSelected: Boolean(isSelected), size })}
      onClick={onClick}
    >
      {item?.emoji?.length && <div>{item.emoji}</div>}
      {item?.comment?.length && <p>{item.comment}</p>}
      {nickname?.length && <p className={nicknameStyle}>{nickname}</p>}
    </button>
  );
};

const containerStyle = cva({
  base: {
    width: 'fit-content',
    display: 'flex',
    gap: '8px',
    color: 'text.normal',
    fontWeight: 'medium',
    border: '1px solid',
    rounded: '8px',
    cursor: 'pointer',
    flexShrink: 0,
  },
  variants: {
    isSelected: {
      true: {
        color: 'blue.45',
        borderColor: 'blue.90',
        backgroundColor: 'blue.95',
      },
      false: {
        color: 'text.normal',
        borderColor: 'line.neutral',
        backgroundColor: 'white',
      },
    },
    size: {
      small: {
        p: '7px 12px',
        textStyle: 'label1.normal',
      },
      medium: {
        p: '8px 14px',
        textStyle: 'body1.normal',
      },
    },
  },
});

const nicknameStyle = css({
  ml: '4px',
  textStyle: 'label1.normal',
  color: 'text.alternative',
  fontWeight: 'medium',
});
