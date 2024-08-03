/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/atoms';
import { Divider } from '@/components/atoms/divider';
import { TextField } from '@/components/molecules';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import {
  useGetImagePresignedUrl,
  useImagePresignedUrl,
  useImageStatus,
  useMemory,
} from '../../apis';
import { RecordRequestProps } from '../../apis/dto';
import {
  isDistancePageModalOpen,
  isLaneLengthBottomSheetOpen,
  isPoolSearchPageModalOpen,
  timeBottomSheetState,
} from '../../store';
import { formSubInfoState } from '../../store/form-sub-info';
import { formSectionStyles } from '../../styles/form-section';
import { DiarySection } from './diary-section';
import { DistancePageModal } from './distance-page-modal';
import { EquipmentSection } from './equipment-section';
import { LaneLengthBottomSheet } from './lane-length-bottom-sheet';
import { PhotoSection } from './photo-section';
import { PoolSearchPageModal } from './pool-search-page-modal';
import { SubInfoSection } from './sub-info-section';
import { TimeBottomSheet } from './time-bottom-sheet';

//Todo: null 타입 제거
//Todo: watch의 성능 이슈 고민
export function Form() {
  const methods = useForm<RecordRequestProps>({
    defaultValues: {
      // 달력 클릭하면 넘어오는 날짜를 default로 추후 수정
      recordAt: '2024-05-10',
      startTime: '',
      endTime: '',
      lane: 25,
      strokes: [],
      imageIdList: [],
    },
  });
  const router = useRouter();
  const setIsLaneLengthBottomSheetOpen = useSetAtom(
    isLaneLengthBottomSheetOpen,
  );

  const { mutateAsync: getImagePresign } = useGetImagePresignedUrl();
  const { mutateAsync: memory } = useMemory();
  const { mutateAsync: imagePresign } = useImagePresignedUrl();
  const { mutateAsync: imageStatus } = useImageStatus();

  const setIsPoolSearchPageModalOpen = useSetAtom(isPoolSearchPageModalOpen);
  const setIsDistancePageModalOpen = useSetAtom(isDistancePageModalOpen);
  const setTimeBottomSheetState = useSetAtom(timeBottomSheetState);
  const formSubInfo = useAtomValue(formSubInfoState);

  const startTime = methods.watch('startTime');
  const endTime = methods.watch('endTime');
  const diary = methods.watch('diary');

  const isRecordAbled = startTime && endTime;

  const getBlobData = (file: File) => {
    const blobData = new Blob([file], { type: 'image/jpeg' });
    return blobData;
  };

  const onSubmit: SubmitHandler<RecordRequestProps> = async (data) => {
    if (formSubInfo.imageFiles.length > 0) {
      await getImagePresign([formSubInfo.imageFiles[0].name]).then(
        async (getImagePresignRes) => {
          await imagePresign({
            url: getImagePresignRes.data[0].presignedUrl,
            file: getBlobData(formSubInfo.imageFiles[0].fileData),
          }).then(async () => {
            await imageStatus([getImagePresignRes.data[0].imageId]).then(
              async () => {
                await memory(data).then((res) =>
                  router.push(
                    `/record/success?rank=${res.data.rank}&memoryId=${res.data.memoryId}&month=${res.data.month}`,
                  ),
                );
              },
            );
          });
        },
      );
    } else {
      await memory(data).then((res) =>
        router.push(
          `/record/success?rank=${res.data.rank}&memoryId=${res.data.memoryId}&month=${res.data.month}`,
        ),
      );
    }
  };

  return (
    //react-hook-form 전역적으로 사용
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={cx(formSectionStyles)}>
          <TextField
            variant="select"
            isRequired
            value="2024년 7월 25일"
            label="수영 날짜"
            wrapperClassName={css({ marginBottom: '24px' })}
          />
          <div className={timeStyles.layout}>
            <TextField
              variant="select"
              isRequired
              hasDownArrow
              value={startTime || ''}
              placeholder="00:00"
              label="수영 시간"
              wrapperClassName={timeStyles.field}
              onClick={() =>
                setTimeBottomSheetState((prev) => ({
                  ...prev,
                  variant: 'start',
                  isOpen: true,
                }))
              }
            />
            <span className={css({ fontSize: '30px' })}>-</span>
            <TextField
              variant="select"
              isRequired
              hasDownArrow
              value={endTime || ''}
              label="수영 시간"
              placeholder="00:00"
              wrapperClassName={timeStyles.field}
              onClick={() =>
                setTimeBottomSheetState((prev) => ({
                  ...prev,
                  variant: 'end',
                  isOpen: true,
                }))
              }
            />
          </div>
          <TextField
            variant="select"
            value={formSubInfo.poolName || ''}
            placeholder="(선택)"
            label="수영장"
            wrapperClassName={css({ marginBottom: '24px' })}
            onClick={() =>
              setIsPoolSearchPageModalOpen({
                isOpen: true,
                jumpDirection: 'forward',
              })
            }
          />
          <TextField
            variant="select"
            value={methods.watch('lane') + 'm'}
            label="레인 길이"
            hasDownArrow
            wrapperClassName={css({ marginBottom: '24px' })}
            onClick={() => setIsLaneLengthBottomSheetOpen(true)}
          />
          <TextField
            variant="select"
            value={
              formSubInfo.totalDistance ? formSubInfo.totalDistance + 'm' : ''
            }
            placeholder="거리입력(선택)"
            label="수영 거리"
            onClick={() =>
              setIsDistancePageModalOpen({
                isOpen: true,
                jumpDirection: 'forward',
              })
            }
          />
          <div className={buttonStyles.layout}>
            <Button
              label="기록하기"
              size="large"
              className={buttonStyles.content}
              disabled={!isRecordAbled}
            />
          </div>
        </div>
        <Divider variant="thick" />
        <PhotoSection title="오늘의 사진" />
        <Divider variant="thick" />
        <DiarySection title="일기" value={diary || ''} />
        <Divider variant="thick" />
        <EquipmentSection title="장비" />
        <Divider variant="thick" />
        <SubInfoSection title="심박수 · 페이스 · 칼로리" />
        <div className={blockStyles} />
      </form>
      <LaneLengthBottomSheet title="레인 길이를 선택해주세요" />
      <PoolSearchPageModal title="어디서 수영했나요?" />
      <DistancePageModal />
      <TimeBottomSheet />
    </FormProvider>
  );
}

const timeStyles = {
  layout: flex({
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  field: css({
    width: '42%',
    marginBottom: '24px',
  }),
};

const buttonStyles = {
  layout: flex({
    justifyContent: 'center',
    position: 'fixed',
    width: '100%',
    bottom: '32px',
    left: 0,
    padding: '0 20px',
    zIndex: 10,
  }),

  content: css({
    width: '100%',
    maxWidth: '560px',
  }),
};

const blockStyles = css({
  height: '100px',
  backgroundColor: 'line.alternative',
});
