'use client';

import { useState } from 'react';

import { useBottomSheet, useDragScroll, useModal } from '@/hooks';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { useCheer, useCheerPreviewList } from '../apis';
import {
  CheerBottomSheet,
  CheerItem,
  CheerModal,
  CheerProgress,
} from '../components';
import { initialCheerList } from '../data';
import { DetailCheerItemSelected, RecordDetailType } from '../types';

export const DetailCheer = ({ data }: { data: RecordDetailType }) => {
  const { mutate: mutateCheer } = useCheer();
  const { data: cheerPreviewData, refetch: refetchCheer } = useCheerPreviewList(
    data.id,
  );

  const [cheerList, setCheerList] = useState(initialCheerList);
  const [selectedCheerItem, setSelectedCheerItem] =
    useState<DetailCheerItemSelected>();

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
    const selectedCheerItem = cheerList.find(({ isSelected }) => isSelected);
    if (!selectedCheerItem) return;

    mutateCheer(
      {
        emoji: selectedCheerItem.emoji,
        comment: selectedCheerItem.comment,
        memoryId: data.id,
      },
      {
        onSuccess: ({ status, code }) => {
          if (status === 400 || code === 'REACTION_2') {
            // TODO: api 에러 예외처리
            alert('자신의 게시물 || 3개의 응원 등록 예외처리');
            return;
          }

          void refetchCheer();
          setSelectedCheerItem(selectedCheerItem);
          closeBottomSheet();
        },
      },
    );
  };

  const handleChangeSelectedItem = (isOpen: boolean) => {
    if (isOpen) return;
    setSelectedCheerItem(undefined);
  };

  const { isMyMemory } = data;
  const reactions = cheerPreviewData?.reactions || [];
  return (
    <>
      {/* NOTE: 응원 미리보기 목록 */}
      {reactions && Boolean(reactions.length) && (
        <div className={slider.containerStyle} ref={sliderRef}>
          <div className={slider.wrapperStyle}>
            {reactions.map((item) => (
              <CheerItem
                {...item}
                key={item.reactionId}
                onClick={openModal}
                size="small"
              />
            ))}
            {reactions.length > 10 && (
              <button className={slider.entireCheerButton} onClick={openModal}>
                응원 전체보기
              </button>
            )}
          </div>
        </div>
      )}

      {/* NOTE: 응원 FAB Button */}
      {!isMyMemory && (
        <button className={cheerButtonWrapperStyle} onClick={openBottomSheet}>
          {data.member?.name}님에게 응원 보내기 👏
        </button>
      )}

      {/* NOTE: 응원 Progress 모달 */}
      <CheerProgress
        isOpen={Boolean(selectedCheerItem)}
        onChangeOpen={handleChangeSelectedItem}
        authorName={data.member?.name ?? ''}
        cheerItem={selectedCheerItem}
      />

      {/* NOTE: 응원 모달 */}
      <CheerModal
        isOpen={isOpenModal}
        onClose={closeModal}
        title="8월 16일의 응원"
        description="5"
      />

      {/* NOTE: 응원 바텀시트 */}
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
    backgroundColor: 'white',

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
  bottom: 'calc(35px + env(safe-area-inset-bottom))',
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
