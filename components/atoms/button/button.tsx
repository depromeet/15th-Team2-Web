import Image from 'next/image';

import { css, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

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
  className,
  type,
  onClick,
}: ButtonProps) => {
  const baseStyles = flex({
    alignItems: 'center',
    justifyContent: leftIconSrc && rightIconSrc ? 'space-between' : 'center',
    position: 'relative',
    cursor: disabled ? 'not-allowed' : 'pointer',
  });

  const sizeStylesMap = new Map([
    [
      'large',
      css({
        height: '48px',
        padding: '12px 28px',
        borderRadius: '10px',
        textStyle: 'body1.normal',
        gap: '6px',
      }),
    ],
    [
      'medium',
      css({
        height: '40px',
        padding: '9px 20px',
        borderRadius: '8px',
        textStyle: 'body2.normal',
        gap: '5px',
      }),
    ],
    [
      'small',
      css({
        height: '32px',
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

  const iconSize = size === 'large' ? 20 : size === 'medium' ? 18 : 16;

  const iconWrapperStyles = flex({
    width: `${iconSize}px`,
    height: `${iconSize}px`,
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <button className={buttonStyles} onClick={onClick} type={type}>
      {leftIconSrc && (
        <div className={iconWrapperStyles}>
          <Image
            src={leftIconSrc}
            alt="left icon"
            width={iconSize}
            height={iconSize}
          />
        </div>
      )}
      {label}
      {rightIconSrc && (
        <div className={iconWrapperStyles}>
          <Image
            src={rightIconSrc}
            alt="right icon"
            width={iconSize}
            height={iconSize}
          />
        </div>
      )}
    </button>
  );
};
