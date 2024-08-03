import { atom } from 'jotai';

interface FormSubInfoProps {
  poolName?: string;
  totalDistance?: number;
  imageFiles: { fileData: File; name: string }[];
}

const initialState = {
  imageFiles: [],
};

export const formSubInfoState = atom<FormSubInfoProps>(initialState);
