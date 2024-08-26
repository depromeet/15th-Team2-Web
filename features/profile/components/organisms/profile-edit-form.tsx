'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { useImagePresignUrl } from '@/apis';
import { Button } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { getBlobData } from '@/utils';

import {
  useGetProfileImagePresignedUrl,
  useProfileImageUrlDone,
} from '../../apis';
import { useProfileEditForm } from '../../hooks';
import { ProfileEditImageSection } from './profile-edit-image-section';
import { ProfileEditTextInfoSection } from './profile-edit-text-info-section';

interface ProfileEditFormProps {
  nickname?: string;
  introduce?: string;
}

//Todo: 한줄 소개 현재 글자 수 세는 UI 추가
export function ProfileEditForm() {
  const methods = useForm<ProfileEditFormProps>({
    defaultValues: {},
  });

  const { imageFile, defaultProfileIndex, handlers } = useProfileEditForm();
  const { mutateAsync: getProfileImagePresignedUrl } =
    useGetProfileImagePresignedUrl();
  const { mutateAsync: imagePresign } = useImagePresignUrl();
  const { mutateAsync: profileImageUrlDone } = useProfileImageUrlDone();

  //Todo: 닉네임 & 소개 수정 api 연결
  //Todo: 각 상황에 맞는 이미지 api 연결(디폴트 캐릭터 프로필 & 직접 선택 프로필)
  //Todo: 에러 처리
  //Todo: 헤더의 저장버튼 클릭 시에도 수정 로직 수행
  const onSubmit: SubmitHandler<ProfileEditFormProps> = async (data) => {
    console.log(data);
    if (imageFile) {
      const { data } = await getProfileImagePresignedUrl(imageFile.name);
      await imagePresign({
        presignedUrl: data.presignedUrl,
        file: getBlobData(imageFile),
      });
      await profileImageUrlDone(data.imageName);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={methods.handleSubmit(onSubmit)}
        className={layoutStyles.form}
      >
        <ProfileEditImageSection
          defaultProfileIndex={defaultProfileIndex}
          onChangeDefaultProfileIndex={handlers.onChangeDefaultProfileIndex}
          onChangeFile={handlers.onChangeImageFile}
        />
        <ProfileEditTextInfoSection
          nickNameLabel="닉네임"
          nickNameSubText="14자까지 입력할 수 있어요"
          introducePlaceholder="한 줄 소개를 입력해주세요 (수린이 1년차 / 접영 드릴 연습중)"
        />
        <div className={buttonStyles.layout}>
          <Button
            buttonType="primary"
            variant="solid"
            label="저장하기"
            size="large"
            className={buttonStyles.content}
          />
        </div>
      </form>
    </FormProvider>
  );
}

const layoutStyles = {
  form: css({
    padding: '0 20px',
  }),
  imageEdit: flex({
    justifyContent: 'center',
    padding: '40px 0 0 0',
    marginBottom: '24px',
  }),
  imageEditIcon: flex({
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '120px',
    height: '120px',
    marginBottom: '14px',
  }),
  defaultImageIcon: flex({
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '6px',
    right: '6px',
    borderRadius: 'full',
    width: '32px',
    height: '32px',
    backgroundColor: 'background.white',
    border: '1px solid',
    borderColor: 'line.solid.normal',
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
