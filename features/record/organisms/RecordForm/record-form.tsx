'use client';

import { TextField } from '@/components/molecules';
import { css } from '@/styled-system/css';

import {
  PoolSearchBottomSheet,
  RailLengthBottomSheet,
  TimeBottomSheet,
  UseEndTimeBottomSheet,
  UsePoolSearchBottomSheet,
  UseRailLengthBottomSheet,
  UseStartTimeBottomSheet,
} from '../RecordBottomSheet';
import {
  RecordDistancePageModal,
  UseRecordDistancePageModal,
} from '../RecordDistancePageModal';
import { railLengthOptions } from './options';
import { UseRecordForm } from './useRecordForm';

export function RecordForm() {
  //달력 클릭하면 날짜 넘어오는 형식에 맞게 함수에 전달 값 수정
  const { recordInfo, handlers } = UseRecordForm('2024년 7월 -일');
  const {
    isOpen: isStartTimeBottomSheetOpen,
    handlers: startTimeBottomSheetHandlers,
  } = UseStartTimeBottomSheet();
  const {
    isOpen: isEndTimeBottomSheetOpen,
    handlers: endTimeBottomSheetHandlers,
  } = UseEndTimeBottomSheet();
  const {
    isOpen: isPoolSearchBottomSheetOpen,
    handlers: poolSearchBottomSheetHandlers,
  } = UsePoolSearchBottomSheet();
  const {
    isOpen: isRailLengthBottomSheetOpen,
    handlers: railLengthBottomSheetHandlers,
  } = UseRailLengthBottomSheet();
  const {
    isOpen: isRecordDistancePageModalOpen,
    jumpDirection,
    handlers: recordDistancePageModalHandlers,
  } = UseRecordDistancePageModal();
  return (
    <>
      <form className={css(formStyles)}>
        <TextField
          variant="select"
          isRequired
          placeholder={recordInfo.recordAt}
          label="수영 날짜"
          addWrapperStyles={css.raw({ marginBottom: '24px' })}
        />
        <div className={css(timeTextFieldLayoutStyles)}>
          <TextField
            variant="select"
            isRequired
            value={recordInfo.startTime}
            placeholder="00:00"
            label="수영 시간"
            addWrapperStyles={timeTextFieldStyles}
            onClick={startTimeBottomSheetHandlers.openBottomSheet}
          />
          <span className={css({ fontSize: '30px' })}>-</span>
          <TextField
            variant="select"
            isRequired
            value={recordInfo.endTime}
            label="수영 시간"
            placeholder="00:00"
            addWrapperStyles={timeTextFieldStyles}
            onClick={endTimeBottomSheetHandlers.openBottomSheet}
          />
        </div>
        <TextField
          variant="select"
          value={''}
          placeholder="(선택)"
          label="수영장"
          addWrapperStyles={css.raw({ marginBottom: '24px' })}
          onClick={poolSearchBottomSheetHandlers.openBottomSheet}
        />
        <TextField
          variant="select"
          value={String(recordInfo.lane) + 'm'}
          label="레일 길이"
          addWrapperStyles={css.raw({ marginBottom: '24px' })}
          onClick={railLengthBottomSheetHandlers.openBottomSheet}
        />
        <TextField
          value={''}
          placeholder="거리입력(선택)"
          label="수영 거리"
          addWrapperStyles={css.raw({ marginBottom: '24px' })}
          onClick={recordDistancePageModalHandlers.openPageModal}
        />
      </form>
      {/* BottomSheet 관리 어떻게 할지 리팩토링 필요 */}
      <RailLengthBottomSheet
        title="레인 길이를 선택해주세요"
        value={
          recordInfo.lane === Number(railLengthOptions[0].label.slice(0, -1))
            ? 0
            : 1
        }
        isOpen={isRailLengthBottomSheetOpen}
        modifyValue={handlers.changeRailLength}
        closeBottomSheet={railLengthBottomSheetHandlers.closeBottomSheet}
      />
      <PoolSearchBottomSheet
        isOpen={isPoolSearchBottomSheetOpen}
        title="어디서 수영을 했나요?"
        placeholder="수영장 검색"
        modifyValue={handlers.changePool}
        closeBottomSheet={poolSearchBottomSheetHandlers.closeBottomSheet}
      />
      <TimeBottomSheet
        isOpen={isStartTimeBottomSheetOpen}
        modifyValue={handlers.changeStartTime}
        closeBottomSheet={startTimeBottomSheetHandlers.closeBottomSheet}
      />
      <TimeBottomSheet
        isOpen={isEndTimeBottomSheetOpen}
        modifyValue={handlers.changeEndTime}
        closeBottomSheet={endTimeBottomSheetHandlers.closeBottomSheet}
      />
      <RecordDistancePageModal
        isOpen={isRecordDistancePageModalOpen}
        jumpDirection={jumpDirection}
        closePageModal={recordDistancePageModalHandlers.closePageModal}
      />
      {/* BottomSheet 관리 어떻게 할지 리팩토링 필요 */}
    </>
  );
}

const formStyles = css.raw({
  width: '100%',
  padding: '0px 20px',
});

const timeTextFieldLayoutStyles = css.raw({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const timeTextFieldStyles = css.raw({
  width: '42%',
  marginBottom: '24px',
});
