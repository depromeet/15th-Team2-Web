'use client';

import { Virtuoso } from 'react-virtuoso';

import { Modal, ModalProps } from '@/components/molecules';
import { css } from '@/styled-system/css';

import { useCheerList } from '../apis';
import { CheerModalItem } from './cheer-modal-item';

// TODO: data 연동 및 props 수정
type CheerModal = {
  memoryId: number;
  isMyMemory: boolean;
  initialItemIndex?: number;
} & ModalProps;
export const CheerModal = ({
  memoryId,
  isMyMemory,
  initialItemIndex,
  isOpen,
  onClose,
  title,
}: CheerModal) => {
  const {
    flattenData,
    totalCount,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useCheerList(memoryId);

  const fetchNextData = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  const handleRangeChanged = (range: { endIndex: number }) => {
    const currentContentsLastIndex = flattenData.length - 1;
    if (range.endIndex >= currentContentsLastIndex - 3) {
      void fetchNextData();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={String(totalCount ?? '')}
      button={{
        text: '닫기',
        onClick: onClose,
      }}
      isBodyFadeOut={true}
    >
      <Virtuoso
        data={flattenData}
        overscan={200}
        initialTopMostItemIndex={initialItemIndex}
        rangeChanged={handleRangeChanged}
        className={contentWrapper}
        itemContent={(_, item) => (
          <CheerModalItem
            key={item.reactionId}
            isMyMemory={isMyMemory}
            {...item}
          />
        )}
        style={{
          width: '100%',
          height: '332px',
          overflowY: 'scroll',
          paddingBottom: '40px',
        }}
        components={{
          Footer: () => <div style={{ height: '40px' }} />,
        }}
      />
    </Modal>
  );
};

const contentWrapper = css({
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});
