'use client';

import { useEffect, useRef, useState } from 'react';

import { SwimmerIcon, Waves } from '@/components/atoms';
import { StrokeInfo } from '@/features/main';
import { css, cva, cx } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { createGradient, getSwimColor } from '@/utils';

interface RecordMarkProps {
  type: string;
  isAchieved?: boolean;
  totalDistance?: number;
  strokes?: Array<StrokeInfo>;
  renderType?: 'calendar' | 'detail';
  goal: number | undefined;
}

export const RecordMark = ({
  type,
  isAchieved,
  totalDistance,
  strokes,
  renderType = 'calendar',
  goal,
}: RecordMarkProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [contentSize, setContentSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const waves: Array<{ color: string; waveHeight: number }> = [];
  if (strokes && goal) {
    strokes.forEach(({ name, meter }) => {
      const color = getSwimColor(name);
      waves.push({ color, waveHeight: meter / goal });
    });
  }

  useEffect(() => {
    if (ref.current)
      setContentSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
  }, []);

  if (type === 'NORMAL')
    return (
      <div ref={ref} className={wrapperStyles}>
        <div className={cx(layoutStyles({ renderType }), normalStyles)}>
          <SwimmerIcon />
        </div>
      </div>
    );
  else if (type === 'SINGLE')
    return (
      <div ref={ref} className={wrapperStyles}>
        {isAchieved ? (
          <div
            className={cx(layoutStyles({ renderType }), singleAchievedStyles)}
          />
        ) : (
          <div className={layoutStyles({ renderType })}>
            {totalDistance && goal && (
              <Waves
                width={contentSize.width}
                height={contentSize.height}
                waves={[
                  {
                    color: '#3b82f6',
                    waveHeight: totalDistance / goal,
                  },
                ]}
              />
            )}
          </div>
        )}
      </div>
    );

  const gradientProps = createGradient(waves.map(({ color }) => color));

  return (
    <div ref={ref} className={wrapperStyles}>
      {isAchieved ? (
        <div
          style={{ backgroundImage: `linear-gradient(0deg, ${gradientProps})` }}
          className={layoutStyles({ renderType })}
        />
      ) : (
        <div className={layoutStyles({ renderType })}>
          {totalDistance && (
            <Waves
              width={contentSize.width}
              height={contentSize.height}
              waves={waves}
            />
          )}
        </div>
      )}
    </div>
  );
};

const wrapperStyles = flex({
  width: 'full',
  height: 'full',
  alignItems: 'center',
  justifyContent: 'center',
});

const layoutStyles = cva({
  base: {
    display: 'flex',
    aspectRatio: 'auto 3/4',
    alignItems: 'center',
    justifyContent: 'center',
    rounded: '2px',
    overflow: 'hidden',
    animation: 'dimFadeIn 0.2s',
  },
  variants: {
    renderType: {
      calendar: {
        width: '95%',
        aspectRatio: 'auto 3/4',
      },
      detail: {
        width: '100%',
        aspectRatio: 'auto 335 / 270',
      },
    },
  },
});

const normalStyles = css({ backgroundColor: 'blue.90' });
const singleAchievedStyles = css({
  backgroundColor: 'primary.swim.총거리.default',
});
