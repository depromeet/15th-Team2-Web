'use client';

import { useController, useFormContext } from 'react-hook-form';

import { DownArrowIcon } from '@/components/atoms';
import { css, cx } from '@/styled-system/css';

import {
  absoluteStyles,
  inputStyles,
  inputWrapperStyles,
  subTextStyles,
} from './style';
import { TextFieldWrapper } from './text-field-wrapper';
import { SelectTextFieldProps } from './type';

/**
 * text-field 컴포넌트.
 * @param label 라벨 이름
 * @param isRequired 필수 여부
 * @param subText 추가 설명 텍스트
 * @param placeholder placeholder 값
 * @param fieldName useController 훅의 field name
 * @param className input태그 추가 스타일
 * @param wrapperClassName text-field-wrapper 컴포넌트 추가 스타일 부여
 * @param absoluteClassName 화살표 icon 추가 스타일 부여
 * @param subTextClassName 추가 설명 텍스트 추가 스타일
 * @param onClick click 이벤트
 */
export function SelectTextField({
  label,
  isRequired = false,
  subText,
  placeholder,
  fieldName,
  className,
  wrapperClassName,
  absoluteClassName,
  subTextClassName,
  onClick,
}: SelectTextFieldProps) {
  const { control } = useFormContext();
  const { field } = useController({
    name: fieldName as string,
    control,
  });
  return (
    <TextFieldWrapper
      isRequired={isRequired}
      label={label}
      className={wrapperClassName}
    >
      <div className={cx(inputWrapperStyles)}>
        {
          <input
            {...field}
            readOnly
            placeholder={placeholder}
            className={cx(css(inputStyles), className)}
            onClick={onClick}
            onChange={field.onChange}
          />
        }

        {/* span태그 컴포넌트로 공통 생성 시 수정 */}
        <span className={cx(absoluteStyles, absoluteClassName)}>
          {<DownArrowIcon />}
        </span>
      </div>
      <span className={cx(subTextStyles, subTextClassName)}>{subText}</span>
    </TextFieldWrapper>
  );
}