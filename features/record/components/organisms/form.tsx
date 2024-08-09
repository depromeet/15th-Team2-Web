/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useAtom, useSetAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/atoms';
import { Divider } from '@/components/atoms/divider';
import { TextField } from '@/components/molecules';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { formatDateToKorean, getToday } from '@/utils';

import {
  useGetImagePresignedUrl,
  useImagePresignUrl,
  useMemory,
} from '../../apis';
import { RecordRequestProps } from '../../apis/dto';
import { useEditMemory } from '../../apis/use-edit-memory';
import { useImageStatus } from '../../apis/use-image-status';
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

//Todo: watch의 성능 이슈 고민
//Todo: form.tsx 파일 내부 리팩토링
//Todo: 수정모드일 시, 기록 불러올 때 보여줄 로딩 UI 구현
export function Form() {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const isEditMode = Boolean(searchParams.get('memoryId'));
  const { data } = useEditMemory(Number(searchParams.get('memoryId')));
  const [formSubInfo, setFormSubInfo] = useAtom(formSubInfoState);
  const methods = useForm<RecordRequestProps>({
    defaultValues: {
      recordAt: date ? date : getToday(),
      startTime: '',
      endTime: '',
      lane: 25,
      strokes: [],
      imageIdList: [],
    },
  });

  useEffect(() => {
    if (data) {
      const prevData = data.data;
      methods.reset({
        recordAt: prevData.recordAt,
        startTime: prevData.startTime,
        endTime: prevData.endTime,
        lane: prevData.lane,
        poolId: prevData.pool ? prevData.pool.id : undefined,
        diary: prevData.diary ? prevData.diary : undefined,
        heartRate: prevData.memoryDetail.heartRate
          ? prevData.memoryDetail.heartRate
          : undefined,
        paceMinutes: prevData.memoryDetail.paceMinutes
          ? prevData.memoryDetail.paceMinutes
          : undefined,
        paceSeconds: prevData.memoryDetail.paceSeconds
          ? prevData.memoryDetail.paceSeconds
          : undefined,
        kcal: prevData.memoryDetail.kcal
          ? prevData.memoryDetail.kcal
          : undefined,
        strokes: prevData.strokes ? prevData.strokes : undefined,
      });
      setFormSubInfo({
        imageFiles: [],
        poolName: prevData.pool ? prevData.pool.name : undefined,
        totalDistance: prevData.totalMeter ? prevData.totalMeter : undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const router = useRouter();
  const setIsLaneLengthBottomSheetOpen = useSetAtom(
    isLaneLengthBottomSheetOpen,
  );

  const { mutateAsync: getImagePresignedUrl } = useGetImagePresignedUrl();
  const { mutateAsync: memory } = useMemory();
  const { mutateAsync: imagePresign } = useImagePresignUrl();
  const { mutateAsync: imageStatus } = useImageStatus();

  const setIsPoolSearchPageModalOpen = useSetAtom(isPoolSearchPageModalOpen);
  const setIsDistancePageModalOpen = useSetAtom(isDistancePageModalOpen);
  const setTimeBottomSheetState = useSetAtom(timeBottomSheetState);

  const startTime = methods.watch('startTime');
  const endTime = methods.watch('endTime');
  const diary = methods.watch('diary');

  const isRecordAbled = startTime && endTime;

  const getBlobData = (file: File) => {
    const blobData = new Blob([file]);
    return blobData;
  };

  const onSubmit: SubmitHandler<RecordRequestProps> = async (data) => {
    //기록에 사진이 있을 시
    //Todo: 기록 에러 발생 시 처리
    if (formSubInfo.imageFiles.length > 0) {
      const getImagePresignedUrlRes = await getImagePresignedUrl([
        formSubInfo.imageFiles[0].name,
      ]);
      await imagePresign({
        presignedUrl: getImagePresignedUrlRes.data[0].presignedUrl,
        file: getBlobData(formSubInfo.imageFiles[0]),
      });
      await imageStatus([getImagePresignedUrlRes.data[0].imageId]);
      const memoryRes = await memory({
        ...data,
        imageIdList: [getImagePresignedUrlRes.data[0].imageId],
      });
      if (memoryRes.status === 200)
        router.push(
          `/record/success?rank=${memoryRes.data.rank}&memoryId=${memoryRes.data.memoryId}&month=${memoryRes.data.month}`,
        );
    }
    //기록에 사진이 없을 시
    else {
      const memoryRes = await memory(data);
      if (memoryRes.status === 200)
        router.push(
          `/record/success?rank=${memoryRes.data.rank}&memoryId=${memoryRes.data.memoryId}&month=${memoryRes.data.month}`,
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
            value={formatDateToKorean(methods.getValues('recordAt'))}
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
              label={isEditMode ? '수정하기' : '기록하기'}
              size="large"
              className={buttonStyles.content}
              disabled={!isRecordAbled}
            />
          </div>
        </div>
        <Divider variant="thick" />
        <PhotoSection
          title="오늘의 사진"
          defaultImage={
            data && data.data.images.length > 0
              ? data?.data.images[0].url
              : undefined
          }
        />
        <Divider variant="thick" />
        <DiarySection title="일기" value={diary || ''} />
        <Divider variant="thick" />
        <EquipmentSection
          title="장비"
          defaultEquipment={data?.data.memoryDetail.item}
        />
        <Divider variant="thick" />
        <SubInfoSection title="심박수 · 페이스 · 칼로리" />
        <div className={blockStyles} />
      </form>
      <LaneLengthBottomSheet title="레인 길이를 선택해주세요" />
      <PoolSearchPageModal title="어디서 수영했나요?" />
      <DistancePageModal
        defaultStrokes={data?.data.strokes}
        defaultTotalMeter={data?.data.totalMeter}
        defaultTotalLap={data?.data.totalLap}
      />
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
    bottom: 0,
    left: 0,
    padding: '16px 20px 32px 20px',
    zIndex: 10,
    backgroundColor: 'white',
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
