import Link from 'next/link';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import { SwimmerIcon } from '@/components/atoms/icons/swimmer-icon';
import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';
import { getFormatDate, isTodayDate } from '@/utils';

import { TimeLineContent } from '../types';
import { SwimRecordChart } from './swim-record-chart';

interface TimeLineCardLayoutProps {
  date: string;
}

interface TimeLineCardProps {
  content: TimeLineContent;
}

export const TimeLineCard = ({ content }: TimeLineCardProps) => {
  const { recordAt } = content;
  return (
    <TimeLineCardLayout date={recordAt}>
      <TimeLineCardBody {...content} />
    </TimeLineCardLayout>
  );
};

const TimeLineCardLayout = ({
  children,
  date,
}: PropsWithChildren<TimeLineCardLayoutProps>) => {
  const { month, day, weekday } = getFormatDate({ dateStr: date });
  return (
    <li className={flex({ direction: 'column', gap: '10px' })}>
      <p className={dateStyles}>
        {`${month}월 ${day}일 ${weekday}`}
        {isTodayDate(date) ? <span className={todayStyles}>Today</span> : ''}
      </p>
      {children}
    </li>
  );
};

const TimeLineCardBody = ({
  type,
  startTime,
  endTime,
  diary,
  totalDistance,
  memoryDetailId,
  kcal,
  strokes,
  isAchieved,
}: TimeLineContent) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [currentWidth, setCurrentWidth] = useState<number>(0);

  useEffect(() => {
    if (ref.current) setCurrentWidth(ref.current.offsetWidth);
  }, []);

  return (
    <Link
      href={`/record-detail/${memoryDetailId}`}
      className={cardWrapperStyles}
    >
      <div className={flex()} ref={ref}>
        <div className={titleStyles}>
          {type !== 'NORMAL' && totalDistance ? (
            <p>{formatMeters(totalDistance)}m</p>
          ) : (
            <div className={completeStyles}>
              <p>수영 완료</p>
              <SwimmerIcon width={36} height={36} />
            </div>
          )}
          <div className={descriptionStyles}>
            {startTime && endTime && <p>{`${startTime} ~ ${endTime}`}</p>}
            {kcal && <p>{kcal}kcal</p>}
          </div>
        </div>
      </div>
      {strokes && totalDistance && isAchieved !== undefined && (
        <SwimRecordChart
          width={currentWidth}
          isAchieved={isAchieved}
          totalDistance={totalDistance}
          strokes={strokes}
        />
      )}
      {diary && (
        <p className={diaryStyles} style={{ WebkitBoxOrient: 'vertical' }}>
          {diary}
        </p>
      )}
    </Link>
  );
};

const formatMeters = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const dateStyles = css({ textStyle: 'label1.normal', fontWeight: 'bold' });

const todayStyles = css({ paddingLeft: '6px', color: 'blue.60' });

const cardWrapperStyles = flex({
  padding: '20px',
  direction: 'column',
  gap: '12px',
  justifyContent: 'center',
  backgroundColor: 'background.gray',
  borderRadius: '6px',
});

const titleStyles = flex({
  direction: 'column',
  '& > p': { textStyle: 'heading1', fontWeight: 'bold' },
});

const completeStyles = flex({
  gap: '8px',
  textStyle: 'heading2',
  fontWeight: 'bold',
  alignItems: 'center',
});

const descriptionStyles = flex({
  gap: '14px',
  textStyle: 'label1.normal',
  fontWeight: 'medium',
  color: 'neutral.70',
});

const diaryStyles = css({
  maxHeight: '2.5rem',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  wordBreak: 'break-word',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  textStyle: 'label1.normal',
  fontWeight: 'medium',
  color: 'neutral.70',
});

/*
text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
*/
