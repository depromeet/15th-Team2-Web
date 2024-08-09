'use client';

import { useSetAtom } from 'jotai';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Image } from '@/components/atoms';
import { css } from '@/styled-system/css';
import { resizeFile } from '@/utils';

import { formSubInfoState } from '../../store/form-sub-info';
import { formSectionStyles } from '../../styles/form-section';
import { FormSectionProps } from '../../types/form-section';
import { DeletePhotoIcon } from '../atoms/delete-photo-icon';
import { CameraBox } from '../molecules';

interface PhotoSectionProps extends FormSectionProps {
  defaultImage?: string;
}

/**
 * @param title 사진 section의 제목
 */
export function PhotoSection({ title, defaultImage }: PhotoSectionProps) {
  const [image, setImage] = useState<string[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const { setValue } = useFormContext();

  const setFormSubInfo = useSetAtom(formSubInfoState);

  //1차 MVP 에서는 이미지 업로드를 1장으로 제한
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadImage = async () => {
      try {
        if (e.target.files) {
          const targetFile = e.target.files[0];
          const resizedImage = await resizeFile(targetFile, 600, 600, 100);
          setFormSubInfo((prev) => ({
            ...prev,
            imageFiles: [...prev.imageFiles, resizedImage],
          }));
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              if (image.length === 1) {
                return;
              } else {
                setImage((prev: string[]) => {
                  return [...prev, reader.result as string];
                });
              }
            }
          };
          reader.readAsDataURL(resizedImage);
        }
      } catch (error) {
        console.error('이미지 업로드 중 오류가 발생하였습니다', error);
      }
    };
    uploadImage().catch((error) =>
      console.error('이미지 업로드 중 오류가 발생하였습니다', error),
    );
  };

  const handleAddImageClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  useEffect(() => {
    if (defaultImage) setImage([defaultImage]);
  }, [defaultImage]);

  const handleImageDeleteClick = () => {
    setValue('imageFiles', []);
    setImage([]);
  };

  return (
    <section className={formSectionStyles}>
      <h1 className={titleStyles}>{title}</h1>
      {image.length > 0 ? (
        <div className={imageStyles}>
          <Image
            src={image[0]}
            alt="오늘의 사진"
            fill
            sizes="100vw"
            className="rounded-[10px]"
          />
          <DeletePhotoIcon
            className={css({
              position: 'absolute',
              top: '16px',
              right: '16px',
            })}
            onClick={handleImageDeleteClick}
          />
        </div>
      ) : (
        <CameraBox onClick={handleAddImageClick} />
      )}
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className={css({ display: 'none' })}
        onChange={handleImageUpload}
      />
    </section>
  );
}

const imageStyles = css({
  position: 'relative',
  width: 'calc(100vw - 40px)',
  height: 'calc(100vw - 40px)',
  maxWidth: '600px',
  maxHeight: '600px',
});

const titleStyles = css({
  textStyle: 'heading4',
  fontWeight: '600',
  marginBottom: '24px',
});
