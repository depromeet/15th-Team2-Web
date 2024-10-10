/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';

import { useImagePresignUrl } from '@/apis';
import { Button } from '@/components/atoms';
import { Divider } from '@/components/atoms/divider';
import { SelectTextField } from '@/components/molecules/text-field/select-text-field';
import { LoginLoading } from '@/features/login';
import { useToast } from '@/hooks';
import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { formatDateToKorean, getBlobData, getToday } from '@/utils';

import {
  RecordRequestProps,
  useGetImagePresignedUrl,
  useImageDelete,
  useImageEdit,
  useImageStatus,
  useMemory,
  useMemoryEdit,
  usePullEditMemory,
} from '../../apis';
import { useRecordForm } from '../../hooks';
import { saveSwimTime } from '../../server-actions';
import { formSubInfoState } from '../../store/form-sub-info';
import { formSectionStyles } from '../../styles/form-section';
import { compareTime, isFuture } from '../../utils';
import { DiarySection } from './diary-section';
import { DistancePageModal } from './distance-page-modal';
import { EquipmentSection } from './equipment-section';
import { LaneLengthBottomSheet } from './lane-length-bottom-sheet';
import { PhotoSection } from './photo-section';
import { PoolSearchPageModal } from './pool-search-page-modal';
import { SubInfoSection } from './sub-info-section';
import { TimeBottomSheet } from './time-bottom-sheet';

interface FormProps {
  prevSwimStartTime?: string;
  prevSwimEndTime?: string;
}

//Todo: 코드 개선
//Todo: 수정모드일 시, 불러온 기록 데이터에서 차이가 없을 때는 버튼 disabled
export function Form({ prevSwimStartTime, prevSwimEndTime }: FormProps) {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const memoryId = searchParams.get('memoryId');
  const isEditMode = Boolean(memoryId);
  const { data, isLoading: isLoadingPreviousMemory } = usePullEditMemory(
    Number(memoryId),
  );

  const [formSubInfo, setFormSubInfo] = useAtom(formSubInfoState);

  const { toast } = useToast();

  const methods = useForm<RecordRequestProps>({
    defaultValues: {
      recordAt: date ? formatDateToKorean(date) : getToday(),
      startTime: prevSwimStartTime ? prevSwimStartTime : '',
      endTime: prevSwimEndTime ? prevSwimEndTime : '',
      poolName: '',
      laneMeter: '25m',
      lane: 25,
      totalDistance: '',
      strokes: [],
      imageIdList: [],
    },
  });

  useEffect(() => {
    if (date && isFuture(date)) {
      router.replace('/');
      toast('미래 날짜에는 기록할 수 없어요.', { type: 'warning' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    if (data) {
      const prevData = data.data;
      methods.reset({
        recordAt: formatDateToKorean(prevData.recordAt),
        startTime: prevData.startTime,
        endTime: prevData.endTime,
        lane: prevData.lane,
        laneMeter: prevData.lane + 'm',
        poolId: prevData?.pool?.id ? prevData.pool.id : undefined,
        poolName: prevData?.pool?.name ? prevData.pool.name : '',
        diary: prevData.diary ? prevData.diary : undefined,
        item: prevData.memoryDetail?.item
          ? prevData.memoryDetail.item
          : undefined,
        heartRate: prevData.memoryDetail?.heartRate
          ? prevData.memoryDetail.heartRate
          : undefined,
        paceMinutes: prevData.memoryDetail?.paceMinutes
          ? prevData.memoryDetail.paceMinutes
          : undefined,
        paceSeconds: prevData.memoryDetail?.paceSeconds
          ? prevData.memoryDetail.paceSeconds
          : undefined,
        kcal: prevData.memoryDetail?.kcal
          ? prevData.memoryDetail.kcal
          : undefined,
        strokes: prevData.strokes ? prevData.strokes : undefined,
        totalDistance: prevData.totalMeter
          ? prevData.totalMeter.toLocaleString() + 'm'
          : '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const router = useRouter();

  const { mutateAsync: getImagePresignedUrl } = useGetImagePresignedUrl();
  const { mutateAsync: memory } = useMemory();
  const { mutateAsync: memoryEdit } = useMemoryEdit(memoryId);
  const { mutateAsync: imagePresign } = useImagePresignUrl();
  const { mutateAsync: imageStatus } = useImageStatus();
  const { mutateAsync: imageEdit } = useImageEdit();
  const { mutateAsync: imageDelete } = useImageDelete();

  const startTime = useWatch({
    control: methods.control,
    name: 'startTime',
  });
  const endTime = useWatch({
    control: methods.control,
    name: 'endTime',
  });
  const strokes = useWatch({
    control: methods.control,
    name: 'strokes',
  });
  const lane = useWatch({
    control: methods.control,
    name: 'lane',
  });

  const { isLoading, modifySubmitData, modifyStrokesData, handlers } =
    useRecordForm(lane, isEditMode, prevSwimStartTime);

  const handleRecordEditSuccess = () => {
    handlers.onChangeIsLoading(false);
    router.replace(`/record-detail/${Number(memoryId)}`);
    toast('기록 수정이 완료되었어요.', { type: 'success' });
    setFormSubInfo({
      imageFiles: [],
      isDistanceLapModified: false,
      isPrevImageFileDeleted: false,
    });
  };

  const handleRecordMakeSuccess = (memoryRes: {
    rank: number;
    memoryId: number;
    month: number;
  }) => {
    handlers.onChangeIsLoading(false);
    router.replace(
      `/record/success?rank=${memoryRes.rank}&memoryId=${memoryRes.memoryId}&month=${memoryRes.month}`,
    );
    setFormSubInfo({
      imageFiles: [],
      isDistanceLapModified: false,
      isPrevImageFileDeleted: false,
    });
  };

  //Todo: 기록 에러 발생 시 처리
  const onSubmit: SubmitHandler<RecordRequestProps> = async (data) => {
    if (isLoading || !startTime || !endTime) return;

    //하루가 넘어갈 때
    if (!compareTime(startTime, endTime)) {
      toast('시간을 해당 기록 날짜 내로 설정해주세요', { type: 'warning' });
      return;
    }
    //기록 수정 모드일 때
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { poolName, laneMeter, totalDistance, ...restData } = data;
    const submitData = modifySubmitData(restData);
    handlers.onChangeIsLoading(true);
    if (isEditMode) {
      //이미지가 수정 되었을 때
      if (formSubInfo.imageFiles.length > 0) {
        const getImagePresignedUrlRes = await imageEdit({
          imageNames: [formSubInfo.imageFiles[0].name],
          memoryId: Number(memoryId),
        });
        await imagePresign({
          presignedUrl: getImagePresignedUrlRes.data[0].presignedUrl,
          file: getBlobData(formSubInfo.imageFiles[0]),
        });
        await imageStatus([getImagePresignedUrlRes.data[0].imageId]);
        const memoryRes = await memoryEdit({
          formData: {
            ...submitData,
            imageIdList: [getImagePresignedUrlRes.data[0].imageId],
          },
          memoryId: Number(memoryId),
        });
        if (memoryRes.status === 200) {
          handleRecordEditSuccess();
        }
      }
      //이미지가 수정되지 않았을 때
      else {
        const runMemoryEdit = async () => {
          const memoryEditRes = await memoryEdit({
            formData: submitData,
            memoryId: Number(memoryId),
          });
          if (memoryEditRes.status === 200) {
            handleRecordEditSuccess();
          }
        };
        //이전 이미지가 그대로 있을 때
        if (!formSubInfo.isPrevImageFileDeleted) {
          void runMemoryEdit();
        }
        //이전 이미지를 삭제했을 때
        else {
          await imageDelete(Number(memoryId));
          void runMemoryEdit();
        }
      }
    }
    //기록 생성 모드일 때
    else {
      saveSwimTime(submitData.startTime, submitData.endTime);
      //기록에서 이미지가 포함되었을 때
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
          ...submitData,
          imageIdList: [getImagePresignedUrlRes.data[0].imageId],
        });
        if (memoryRes.status === 200) {
          handleRecordMakeSuccess(memoryRes.data);
        }
      }
      //기록에서 이미지가 포함되지 않았을 때
      else {
        const memoryRes = await memory(submitData);
        if (memoryRes.status === 200) {
          handleRecordMakeSuccess(memoryRes.data);
        }
      }
    }
  };

  //Todo: Dim Loading 상태 공통 코드로 분리
  if (isLoadingPreviousMemory) return <LoginLoading />;
  return (
    //react-hook-form 전역적으로 사용
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className={cx(formSectionStyles)}>
          <SelectTextField
            showArrow={false}
            fieldName="recordAt"
            isRequired
            label="수영 날짜"
            wrapperClassName={css({ marginBottom: '24px' })}
          />
          <div className={timeStyles.layout}>
            <SelectTextField
              fieldName="startTime"
              isRequired
              placeholder="00:00"
              label="수영 시간"
              wrapperClassName={timeStyles.field}
              onClick={() => handlers.openStartTimeBottomSheet()}
            />
            <span className={css({ fontSize: '30px' })}>-</span>
            <SelectTextField
              fieldName="endTime"
              placeholder="00:00"
              onClick={() => handlers.openEndTimeBottomSheet()}
              wrapperClassName={cx(
                timeStyles.field,
                css({ marginTop: '24px' }),
              )}
            />
          </div>
          <SelectTextField
            fieldName="poolName"
            placeholder="(선택)"
            label="수영장"
            wrapperClassName={css({ marginBottom: '24px' })}
            onClick={() => {
              window.history.pushState(null, '', '#pool-page-modal');
              handlers.openPoolSearchPageModal();
            }}
          />
          <SelectTextField
            fieldName="laneMeter"
            label="레인 길이"
            wrapperClassName={css({ marginBottom: '24px' })}
            onClick={() => handlers.openLaneLengthBottomSheet()}
          />
          <SelectTextField
            fieldName="totalDistance"
            placeholder="거리입력(선택)"
            label="수영 거리"
            subText={modifyStrokesData(strokes)}
            onClick={() => {
              window.history.pushState(null, '', '#distance-page-modal');
              handlers.openDistancePageModal();
            }}
          />
          <div className={buttonStyles.layout}>
            <Button
              isLoading={isLoading}
              buttonType="primary"
              variant="solid"
              label={isEditMode ? '수정하기' : '기록하기'}
              size="large"
              className={buttonStyles.content}
              disabled={!startTime || !endTime}
            />
          </div>
        </div>
        <Divider variant="thick" />
        <PhotoSection
          title="오늘의 사진"
          isEditMode={isEditMode}
          defaultImage={
            data && data.data.images.length > 0
              ? data?.data.images[0].url
              : undefined
          }
        />
        <Divider variant="thick" />
        <DiarySection title="일기" />
        <Divider variant="thick" />
        <EquipmentSection
          title="장비"
          defaultEquipment={data?.data.memoryDetail?.item}
        />
        <Divider variant="thick" />
        <SubInfoSection title="심박수 · 페이스 · 칼로리" />
        <div className={blockStyles} />
      </form>
      <LaneLengthBottomSheet title="레인 길이를 선택해주세요" />
      <PoolSearchPageModal title="어디서 수영했나요?" />
      <DistancePageModal
        defaultStrokes={data?.data.strokes}
        defaultTotalLap={data?.data.totalLap}
        defaultTotalMeter={data?.data.totalMeter}
      />
      <TimeBottomSheet startTime={startTime} endTime={endTime} />
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
