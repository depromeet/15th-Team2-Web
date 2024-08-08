'use client';

import { ConfigProvider, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/atoms';
import { BottomSheet } from '@/components/molecules';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import useGetBrowserWidth from '../../hooks/use-get-browser-width';
import { timeBottomSheetState } from '../../store';

export function TimeBottomSheet() {
  const { setValue } = useFormContext();
  const [timeBottmSheetState, setTimeBottmSheetState] =
    useAtom(timeBottomSheetState);
  const width = useGetBrowserWidth();

  const handleTimeChange = (date: dayjs.Dayjs) => {
    setTimeBottmSheetState((prev) => ({ ...prev, time: date.format('HH:mm') }));
  };
  const handleDoneButtonClick = () => {
    if (timeBottmSheetState.variant === 'start')
      setValue('startTime', timeBottmSheetState.time);
    else if (timeBottmSheetState.variant === 'end')
      setValue('endTime', timeBottmSheetState.time);
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
      <ConfigProvider
        theme={{
          components: {
            DatePicker: {
              timeCellHeight: 36,
              timeColumnWidth: Math.floor(width / 3),
              timeColumnHeight: 116,
            },
          },
          // token: {
          //   motion: false,
          // },
        }}
      >
        <div className={layout.bottomSheet}>
          <TimePicker
            placeholder="시간 설정"
            format="HH:mm"
            use12Hours
            suffixIcon={null}
            panelRender={(originPanel) => (
              <div
                className={css({
                  position: 'fixed',
                  bottom: '82px',
                  textStyle: 'heading3',
                  fontWeight: 400,
                })}
              >
                {originPanel}
              </div>
            )}
            open={timeBottmSheetState.isOpen}
            showNow={false}
            inputMode="none"
            size="large"
            placement="bottomRight"
            needConfirm={false}
            inputReadOnly
            onPickerValueChange={handleTimeChange}
            variant="borderless"
            className={css({
              width: '100%',
              '& input': { visibility: 'hidden' },
            })}
          />
        </div>
      </ConfigProvider>
      <div className={layout.button}>
        <Button
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

const layout = {
  bottomSheet: flex({
    position: 'relative',
    direction: 'column',
    alignItems: 'center',
    width: '100%',
    height: '128px',
    marginBottom: '32px',
  }),
  button: css({
    w: 'full',
    position: 'absolute',
    bottom: '15px',
    left: 0,
    padding: '0 20px',
  }),
};
