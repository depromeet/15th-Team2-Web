import { defaultPickerValue } from '../constants';
import { AmpmType, HourType, MinuteType } from '../types';

export const convertTo24HourFormat = (pickerValue: {
  ampm: AmpmType;
  hour: HourType;
  minute: MinuteType;
}) => {
  let hour24 = parseInt(pickerValue.hour, 10);

  if (pickerValue.ampm === '오후' && hour24 !== 12) {
    hour24 += 12;
  }

  if (pickerValue.ampm === '오전' && hour24 === 12) {
    hour24 = 0;
  }

  return `${hour24.toString().padStart(2, '0')}:${pickerValue.minute}`;
};

export const convertToPickerValue = (time?: string) => {
  if (!time) return defaultPickerValue;
  let hour = time.split(':').map(Number)[0];
  const minute = time.split(':').map(Number)[1];

  const ampm = hour >= 12 ? '오후' : '오전';

  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;

  const hourStr = hour.toString().padStart(2, '0');
  const minuteStr = minute.toString().padStart(2, '0');

  return {
    ampm: ampm as AmpmType,
    hour: hourStr as HourType,
    minute: minuteStr as MinuteType,
  };
};

export const addMinutes = (
  pickerValue: {
    ampm: AmpmType;
    hour: HourType;
    minute: MinuteType;
  },
  minutesToAdd: number,
) => {
  let hour24 = parseInt(pickerValue.hour, 10);
  if (pickerValue.ampm === '오후' && hour24 !== 12) {
    hour24 += 12;
  }
  if (pickerValue.ampm === '오전' && hour24 === 12) {
    hour24 = 0;
  }

  const date = new Date();
  date.setHours(hour24);
  date.setMinutes(parseInt(pickerValue.minute, 10));

  date.setMinutes(date.getMinutes() + minutesToAdd);

  const newHour = date.getHours().toString().padStart(2, '0');
  const newMinute = date.getMinutes().toString().padStart(2, '0');

  return `${newHour}:${newMinute}`;
};

export const subtractMinutes = (
  pickerValue: {
    ampm: AmpmType;
    hour: HourType;
    minute: MinuteType;
  },
  minutesToSubtract: number,
) => {
  let hour24 = parseInt(pickerValue.hour, 10);
  if (pickerValue.ampm === '오후' && hour24 !== 12) {
    hour24 += 12;
  }
  if (pickerValue.ampm === '오전' && hour24 === 12) {
    hour24 = 0;
  }

  const date = new Date();
  date.setHours(hour24);
  date.setMinutes(parseInt(pickerValue.minute, 10));

  date.setMinutes(date.getMinutes() - minutesToSubtract);

  const newHour = date.getHours().toString().padStart(2, '0');
  const newMinute = date.getMinutes().toString().padStart(2, '0');

  return `${newHour}:${newMinute}`;
};

export const compareTime = (time1: string, time2: string) => {
  const [hour1, minute1] = time1.split(':').map(Number);
  const [hour2, minute2] = time2.split(':').map(Number);

  const totalMinutes1 = hour1 * 60 + minute1;
  const totalMinutes2 = hour2 * 60 + minute2;

  return totalMinutes1 < totalMinutes2;
};
