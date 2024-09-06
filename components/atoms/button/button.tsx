import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

import { LoadingButtonIcon } from '../icons/loading-button-icon';
import { ButtonProps } from './type';

export const Button = ({
  size = 'medium',
  disabled = false,
  leftIconSrc,
  rightIconSrc,
  label,
  variant,
  buttonType,
  interaction = 'normal',
  type,
  onClick,
  className,
  isLoading,
}: ButtonProps) => {
  const baseStyles = flex({
    alignItems: 'center',
    justifyContent: leftIconSrc && rightIconSrc ? 'space-between' : 'center',
    position: 'relative',
    cursor: disabled ? 'not-allowed' : 'pointer',
  });

  // TODO: 리팩토링 예정
  const sizeStylesMap = new Map([
    [
      'large',
      css({
        // height: '48px',
        padding: '12px 28px',
        borderRadius: '10px',
        textStyle: 'body1.normal',
        gap: '6px',
      }),
    ],
    [
      'medium',
      css({
        // height: '40px',
        padding: '9px 20px',
        borderRadius: '8px',
        textStyle: 'body2.normal',
        gap: '5px',
      }),
    ],
    [
      'small',
      css({
        // height: '32px',
        padding: '7px 14px',
        borderRadius: '6px',
        textStyle: 'label2',
        gap: '4px',
      }),
    ],
  ]);

  const variantStylesMap = new Map([
    [
      'solid',
      css({
        backgroundColor: disabled ? 'fill.disable' : 'blue.60',
        border: 'none',
      }),
    ],
    [
      'outlined',
      css({
        backgroundColor: 'white',
        border: '1px solid',
        borderColor: disabled
          ? 'line.normal'
          : buttonType === 'primary'
            ? '#3B87F4'
            : '#70737C38',
      }),
    ],
    [
      'text',
      css({ backgroundColor: 'white', border: 'none', padding: '4px 0px' }),
    ],
    [
      'negative',
      css({
        backgroundColor: disabled ? 'fill.disable' : 'status.negative',
        border: 'none',
      }),
    ],
  ]);

  const typeStylesMap = new Map([
    [
      'primary',
      css({
        color: disabled
          ? 'text.placeHolder'
          : variant === 'solid'
            ? 'white'
            : 'blue.60',
      }),
    ],
    [
      'secondary',
      css({
        color: disabled
          ? 'text.placeHolder'
          : variant === 'solid'
            ? 'white'
            : '#3B87F4',
      }),
    ],
    [
      'assistive',
      css({
        color: disabled
          ? 'text.placeHolder'
          : variant === 'solid'
            ? 'white'
            : variant === 'outlined'
              ? 'text.normal'
              : 'text.alternative',
      }),
    ],
    [
      'negative',
      css({
        color: variant === 'negative' ? 'white' : 'blue.60',
      }),
    ],
  ]);

  const interactionStylesMap = new Map([
    ['hovered', css({ '&:hover::after': { opacity: 0.075 } })],
    ['focused', css({ '&:focus::after': { opacity: 0.12 } })],
    ['pressed', css({ '&:active::after': { opacity: 0.18 } })],
  ]);

  const buttonStyles = cx(
    className,
    baseStyles,
    sizeStylesMap.get(size),
    variant && variantStylesMap.get(variant),
    buttonType && typeStylesMap.get(buttonType),
    interactionStylesMap.get(interaction),
    css({
      fontWeight: '600',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        backgroundColor:
          buttonType === 'primary' &&
          (variant === 'outlined' || variant === 'text')
            ? 'blue.60'
            : 'text.normal',
        opacity: 0,
      },
    }),
  );

  const iconSizeMap = {
    large: '24px',
    medium: '20px',
    small: '16px',
  };

  const iconSize = iconSizeMap[size];

  const iconWrapperStyles = flex({
    width: iconSize,
    height: iconSize,
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <button className={buttonStyles} onClick={onClick} type={type}>
      {(leftIconSrc || isLoading) && (
        <div className={iconWrapperStyles}>
          {isLoading && <LoadingButtonIcon />}
          {!isLoading && leftIconSrc}
        </div>
      )}
      {label}
      {rightIconSrc && <div className={iconWrapperStyles}>{rightIconSrc}</div>}
    </button>
  );
};
