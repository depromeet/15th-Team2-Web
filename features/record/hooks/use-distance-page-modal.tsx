'use client';

import { useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import { strokeOptions } from '../constants';
import { isDistancePageModalOpen } from '../store';
import { StrokeProps } from '../types';

type tabIndex = 0 | 1;

//Todo: 상태들 리팩토링 & 각 로직들 리팩토링
export function useDistancePageModal<T>(
  lane: number,
  defaultStrokes?: StrokeProps[],
  defaultTotalMeter?: number,
  defaultTotalLap?: number,
) {
  const pageModalRef = useRef<T>(null);
  const setPageModalState = useSetAtom(isDistancePageModalOpen);
  const [secondaryTabIndex, setSecondaryTabIndex] = useState<tabIndex>(0);
  const [assistiveTabIndex, setAssistiveTabIndex] = useState<tabIndex>(0);
  const [totalMeter, setTotalMeter] = useState<string>('');
  const [totalLaps, setTotalLaps] = useState<string>('');
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [strokes, setStrokes] = useState<StrokeProps[]>(
    Array.from({ length: strokeOptions.length }, (_, i) => ({
      name: strokeOptions[i],
      laps: 0,
      meter: 0,
    })),
  );
  const [strokesMeterModified, setStrokesMeterModified] =
    useState<boolean>(false);
  const [strokesLapsModified, setStrokesLapsModified] =
    useState<boolean>(false);

  useEffect(() => {
    let sum = 0;
    if (secondaryTabIndex === 0) {
      return;
    }
    if (assistiveTabIndex === 0) {
      strokes.forEach((stroke) => {
        sum += stroke.meter;
      });
      setTotalDistance(sum);
    } else {
      strokes.forEach((stroke) => {
        sum += stroke.laps * lane;
      });
      setTotalDistance(sum);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokes, lane]);

  useEffect(() => {
    if (defaultStrokes) {
      if (defaultStrokes.length === 1 && defaultStrokes[0].name === '총거리') {
        setTotalMeter(String(defaultTotalMeter));
      } else if (
        defaultStrokes.length === 1 &&
        defaultStrokes[0].name === '총바퀴'
      ) {
        setTotalLaps(String(defaultTotalLap));
      } else {
        defaultStrokes.forEach((strokes) => {
          setStrokes((prev) => [
            ...prev,
            (prev[strokeOptions.indexOf(strokes.name)] = strokes),
          ]);
        });
      }
      setTotalDistance(defaultTotalMeter as number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultStrokes]);

  const onClosePageModal = () => {
    setPageModalState({ isOpen: false, jumpDirection: 'backward' });
  };

  const onChangeSecondaryTabIndex = (index: tabIndex) => {
    setSecondaryTabIndex(index);
  };

  const onChangeAssistiveTabIndex = (index: tabIndex) => {
    setAssistiveTabIndex(index);
  };

  //총거리를 m 입력했을 때, 다른 필드들에 값이 있다면 초기화
  const onChangeTotalMeter = (text: string) => {
    totalLaps && setTotalLaps('');
    setTotalMeter(text);
    resetStrokesMeter();
    resetStrokesLaps();
  };

  //총거리를 바퀴단위로 입력했을 때, 다른 필드들에 값이 있다면 초기화
  const onChangeTotalLaps = (text: string) => {
    totalMeter && setTotalMeter('');
    setTotalLaps(text);
    setTotalDistance(text ? Number(text) * lane : 0);
    resetStrokesMeter();
    resetStrokesLaps();
  };

  //영법별 거리 입력 시 로직 구현 function
  const onChangeStroke = (index: number, text: string) => {
    totalLaps && setTotalLaps('');
    totalMeter && setTotalMeter('');
    if (assistiveTabIndex === 0) {
      !strokesMeterModified && setStrokesMeterModified(true);
      resetStrokesLaps();
    } else if (assistiveTabIndex === 1) {
      !strokesLapsModified && setStrokesLapsModified(true);
      resetStrokesMeter();
    }
    setStrokes((prev) => {
      const copyStrokes = [...prev];
      assistiveTabIndex === 0
        ? (copyStrokes[index] = { ...copyStrokes[index], meter: Number(text) })
        : (copyStrokes[index] = { ...copyStrokes[index], laps: Number(text) });
      return copyStrokes;
    });
  };

  //영법별 거리 기록의 meter를 모두 초기화하는 function
  const resetStrokesMeter = () => {
    if (!strokesMeterModified) return;
    else {
      strokes.forEach((stroke, i) => {
        if (stroke.meter)
          setStrokes((prev) => {
            const copyStrokes = [...prev];
            copyStrokes[i] = { ...copyStrokes[i], meter: 0 };
            return copyStrokes;
          });
      });
      setStrokesMeterModified(false);
    }
  };

  //영법별 거리 기록의 laps를 모두 초기화하는 function
  const resetStrokesLaps = () => {
    if (!strokesLapsModified) return;
    else {
      strokes.forEach((stroke, i) => {
        if (stroke.laps)
          setStrokes((prev) => {
            const copyStrokes = [...prev];
            copyStrokes[i] = { ...copyStrokes[i], laps: 0 };
            return copyStrokes;
          });
      });
      setStrokesLapsModified(false);
    }
  };

  //버튼 label 반환 function
  const buttonLabel =
    secondaryTabIndex === 0 && assistiveTabIndex === 0
      ? '완료'
      : `${totalDistance ? totalDistance + 'm' : ''} 완료`;

  return {
    pageModalRef,
    secondaryTabIndex,
    assistiveTabIndex,
    totalMeter,
    totalLaps,
    totalDistance,
    strokes,
    buttonLabel,
    handlers: {
      onClosePageModal,
      onChangeSecondaryTabIndex,
      onChangeAssistiveTabIndex,
      onChangeTotalMeter,
      onChangeTotalLaps,
      onChangeStroke,
    },
  };
}
