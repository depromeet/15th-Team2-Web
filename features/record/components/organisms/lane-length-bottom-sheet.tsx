'use client';

import { useAtom } from 'jotai';
import { useFormContext } from 'react-hook-form';

import { BottomSheet } from '@/components/molecules';
import { flex } from '@/styled-system/patterns';

import { isLaneLengthBottomSheetOpen } from '../../store';
import { SelectList } from '../molecules';

interface LaneLengthBottomSheetProps {
  title: string;
}

/**
 * @param title 레인 길이 선택 bottom-sheet 제목
 */
export function LaneLengthBottomSheet({ title }: LaneLengthBottomSheetProps) {
  const laneOptions = [
    {
      index: 0,
      label: '25m',
    },
    { index: 1, label: '50m' },
  ];
  const { getValues, setValue } = useFormContext();
  const [isOpen, setIsOpen] = useAtom(isLaneLengthBottomSheetOpen);

  const handleSelectLaneLength = (value: string) => {
    setValue('lane', Number(value.slice(0, -1)));
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      header={{ title }}
      isRenderHandlebar
    >
      <div className={layout.bottomSheetStyles}>
        {/* Title 컴포넌트로 대체 */}
        <SelectList
          value={getValues('lane') + 'm'}
          options={laneOptions}
          onCloseWrapper={() => setIsOpen(false)}
          listElementClassName={layout.listElement}
          onChangeValue={handleSelectLaneLength}
        />
      </div>
    </BottomSheet>
  );
}

const layout = {
  bottomSheetStyles: flex({
    w: 'full',
    direction: 'column',
    padding: '24px 20px',
  }),
  listElement: flex({
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    marginBottom: '8px',
  }),
};
