'use client';

import '@mobiscroll/react/dist/css/mobiscroll.min.css';

import { SelectTextField } from '@/components/molecules';
import { css } from '@/styled-system/css';

import {
  PoolSearchBottomSheet,
  RailLengthBottomSheet,
  UseEndTimeBottomSheet,
  UsePoolSearchBottomSheet,
  UseRailLengthBottomSheet,
  UseStartTimeBottomSheet,
} from '../RecordBottomSheet';
import { TimeBottomSheet } from '../RecordBottomSheet/time-bottom-sheet';
import { railLengthOptions } from './options';
import { RecordFormProps } from './type';
import { UseRecordForm } from './useRecordForm';

export function RecordForm({ addStyles }: RecordFormProps) {
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

  return (
    <form className={css(formStyles, addStyles)}>
      <SelectTextField
        isRequired
        value={recordInfo.date}
        label="수영 날짜"
        hasDownArrow={false}
        addWrapperStyles={css.raw({ marginBottom: '24px' })}
      />
      <div className={css(timeTextFieldLayoutStyles)}>
        <SelectTextField
          isRequired
          value={recordInfo.startTime}
          label="수영 시간"
          addWrapperStyles={timeTextFieldStyles}
          onClick={startTimeBottomSheetHandlers.openBottomSheet}
        />
        <span className={css({ fontSize: '30px' })}>-</span>
        <SelectTextField
          isRequired
          value={recordInfo.endTime}
          label="수영 시간"
          addWrapperStyles={timeTextFieldStyles}
          onClick={endTimeBottomSheetHandlers.openBottomSheet}
        />
      </div>
      <SelectTextField
        value={recordInfo.pool}
        placeholder="(선택)"
        label="수영장"
        addWrapperStyles={css.raw({ marginBottom: '24px' })}
        onClick={poolSearchBottomSheetHandlers.openBottomSheet}
      />
      <SelectTextField
        value={railLengthOptions[recordInfo.railLengthOption].label}
        label="레일 길이"
        addWrapperStyles={css.raw({ marginBottom: '24px' })}
        onClick={railLengthBottomSheetHandlers.openBottomSheet}
      />
      <SelectTextField
        value={recordInfo.distance}
        placeholder="거리입력(선택)"
        label="수영 거리"
        hasDownArrow={false}
        addWrapperStyles={css.raw({ marginBottom: '24px' })}
      />
      {/* BottomSheet 관리 -> 전역 상태 관리 도입 고민 필요 */}
      <RailLengthBottomSheet
        value={recordInfo.railLengthOption}
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
    </form>
  );
}

const formStyles = css.raw({
  width: '100%',
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
