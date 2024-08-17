'use client';

import { useState } from 'react';

import { useBottomSheet, useDragScroll, useModal } from '@/hooks';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { CheerBottomSheet, CheerItem, CheerModal } from '../components';
import { RecordDetailType } from '../types';

const initialCheerList = [
  {
    emoji: '🔥',
    comment: '오늘도 힘내요!',
    isSelected: false,
  },
  {
    emoji: '🦭',
    comment: '물개세요?',
    isSelected: false,
  },
  {
    emoji: '🏊',
    isSelected: false,
  },
  {
    emoji: '👏',
    isSelected: false,
  },
  {
    emoji: '🏊‍♂️',
    comment: '진정한 수영인으로 인정합니다',
    isSelected: false,
  },
  {
    emoji: '🏊‍♂️',
    comment: '다음에 같이 수영해요',
    isSelected: false,
  },
  {
    emoji: '😲',
    comment: '대단해요!',
    isSelected: false,
  },
];

export const DetailCheer = ({ data }: { data: RecordDetailType }) => {
  const [cheerList, setCheerList] = useState(initialCheerList);
  const {
    isOpen: isOpenBottomSheet,
    open: openBottomSheet,
    close: closeBottomSheet,
  } = useBottomSheet();
  const {
    isOpen: isOpenModal,
    open: openModal,
    close: closeModal,
  } = useModal();

  const { sliderRef } = useDragScroll();

  const handleClickCheerItem = (index: number) => {
    setCheerList((prev) =>
      prev.map((item, idx) =>
        idx === index
          ? { ...item, isSelected: !item.isSelected }
          : { ...item, isSelected: false },
      ),
    );
  };

  const handleClickSendCheer = () => {
    const selectedCheerList = cheerList.filter(({ isSelected }) => isSelected);
    if (!selectedCheerList.length) {
      alert('응원 문구를 선택해주세요.');
      return;
    }

    // TODO: 응원 보내기 api 연동
    console.log('send!', selectedCheerList);
  };

  return (
    <>
      {/* TODO: 응원 조회 api 연동 및 모달 open 기능 구현 */}
      {/* NOTE: 칭찬 미리보기 목록 */}
      <div className={slider.containerStyle} ref={sliderRef}>
        <div className={slider.wrapperStyle}>
          <CheerItem
            emoji="🖤"
            comment="너무 멋져요"
            nickname="수영왕지영"
            size="small"
          />
          <CheerItem
            emoji="🖤"
            comment="너무 멋져요"
            nickname="수영왕지영"
            size="small"
          />
          <CheerItem
            emoji="🖤"
            comment="너무 멋져요"
            nickname="수영왕지영"
            size="small"
          />
          <CheerItem
            emoji="🖤"
            comment="너무 멋져요"
            nickname="수영왕지영"
            size="small"
          />
          <CheerItem
            emoji="🖤"
            comment="너무 멋져요"
            nickname="수영왕지영"
            size="small"
          />
          <CheerItem
            emoji="🖤"
            comment="너무 멋져요"
            nickname="수영왕지영"
            size="small"
          />
          <button className={slider.entireCheerButton} onClick={openModal}>
            응원 전체보기
          </button>
        </div>
      </div>

      {/* NOTE: 칭찬 FAB Button */}
      <button className={cheerButtonWrapperStyle} onClick={openBottomSheet}>
        {data.member?.name}님에게 응원 보내기 👏
      </button>

      {/* NOTE: 칭찬 모달 */}
      <CheerModal
        isOpen={isOpenModal}
        onClose={closeModal}
        title="8월 16일의 응원"
        description="5"
      />

      {/* NOTE: 칭찬 바텀시트 */}
      <CheerBottomSheet
        header={{ title: '응원 보내기' }}
        isOpen={isOpenBottomSheet}
        onClose={closeBottomSheet}
        cheerList={cheerList}
        onClickCheerItem={handleClickCheerItem}
        onClickSendCheer={handleClickSendCheer}
      />
    </>
  );
};

const slider = {
  containerStyle: css({
    overflowX: 'scroll',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }),

  wrapperStyle: flex({
    gap: '10px',
    width: 'max-content',
    backgroundColor: 'white',
    p: '20px 20px 0px',
  }),

  entireCheerButton: css({
    textStyle: 'label1.normal',
    fontWeight: 'medium',
    color: 'background.white',
    backgroundColor: 'text.neutral',
    rounded: '7px',
    p: '7px 12px',
  }),
};

const cheerButtonWrapperStyle = css({
  position: 'fixed',
  right: '20px',
  bottom: '35px',
  p: '10px 20px',
  backgroundColor: 'primary.swim.총거리.default',
  color: 'white',
  textStyle: 'body2.normal',
  fontWeight: 'bold',
  rounded: 'full',
  cursor: 'pointer',
  shadow: 'emphasize',
  zIndex: 100,

  '@media (min-width: 600px)': {
    right: 'calc(50% - 300px + 20px);',
  },
});
