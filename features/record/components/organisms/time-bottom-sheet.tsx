'use client';

import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Picker from 'react-mobile-picker';

import { Button } from '@/components/atoms';
import { BottomSheet } from '@/components/molecules';
import { usePreventBodyScroll } from '@/hooks';
import { css } from '@/styled-system/css';

import { defaultPickerValue, timeOptions } from '../../constants';
import { timeBottomSheetState } from '../../store';
import { AmpmType, HourType, MinuteType } from '../../types';
import {
  addMinutes,
  convertTo24HourFormat,
  convertToPickerValue,
  subtractMinutes,
} from '../../utils';

interface TimeBottomSheetProps {
  startTime: string;
  endTime: string;
}

export function TimeBottomSheet({ startTime, endTime }: TimeBottomSheetProps) {
  const { getValues, setValue } = useFormContext();
  const [timeBottmSheetState, setTimeBottmSheetState] =
    useAtom(timeBottomSheetState);
  const [pickerValue, setPickerValue] = useState<{
    ampm: AmpmType;
    hour: HourType;
    minute: MinuteType;
  }>(defaultPickerValue);

  usePreventBodyScroll({ isOpen: timeBottmSheetState.isOpen });

  useEffect(() => {
    if (Boolean(startTime) && timeBottmSheetState.variant === 'start')
      setPickerValue(convertToPickerValue(startTime));
    if (Boolean(endTime) && timeBottmSheetState.variant === 'end')
      setPickerValue(convertToPickerValue(endTime));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeBottmSheetState.variant]);

  const autoSetStartTime = () => {
    // 시작 시간이 아직 설정 안됨 or 시작 시간이 종료 시간보다 이후일 경우
    if (
      !getValues('startTime') ||
      getValues('startTime') >= getValues('endTime')
    )
      setValue('startTime', subtractMinutes(pickerValue, 50));
  };

  const autoSetEndTime = () => {
    // 끝 시간이 아직 설정 안됨 or 시작 시간이 종료 시간보다 이후일 경우
    if (!getValues('endTime') || getValues('startTime') >= getValues('endTime'))
      setValue('endTime', addMinutes(pickerValue, 50));
  };

  const handleDoneButtonClick = () => {
    if (timeBottmSheetState.variant === 'start') {
      setValue('startTime', convertTo24HourFormat(pickerValue));
      autoSetEndTime();
    } else if (timeBottmSheetState.variant === 'end') {
      setValue('endTime', convertTo24HourFormat(pickerValue));
      autoSetStartTime();
    }
    setTimeBottmSheetState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <BottomSheet
      isOpen={timeBottmSheetState.isOpen}
      onClose={() =>
        setTimeBottmSheetState((prev) => ({ ...prev, isOpen: false }))
      }
      header={{
        title:
          timeBottmSheetState.variant === 'start' ? '시작 시간' : '종료 시간',
      }}
      isRenderHandlebar
    >
      <div className={css({ padding: '0 20px' })}>
        <Picker
          value={pickerValue}
          onChange={setPickerValue}
          wheelMode="natural"
          height={120}
          itemHeight={34}
          className={layoutStyles.picker}
        >
          {Object.keys(timeOptions).map((name) => (
            <Picker.Column key={name} name={name}>
              {timeOptions[name as keyof typeof timeOptions].map((option) => (
                <Picker.Item key={option} value={option}>
                  {({ selected }) => (
                    <span
                      className={css({
                        color: selected ? 'text.normal' : 'text.alternative',
                      })}
                    >
                      {option}
                    </span>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          ))}
        </Picker>
      </div>

      <div className={layoutStyles.button}>
        <Button
          buttonType="primary"
          variant="solid"
          size="large"
          label="완료"
          interaction="normal"
          onClick={handleDoneButtonClick}
          className={css({ w: 'full' })}
        />
      </div>
    </BottomSheet>
  );
}

const layoutStyles = {
  button: css({
    w: 'full',
    position: 'absolute',
    bottom: '15px',
    left: 0,
    padding: '0 20px',
  }),
  picker: css({
    marginBottom: '50px',
    marginTop: '10px',
    textStyle: 'heading3',
    fontWeight: 500,
  }),
};
