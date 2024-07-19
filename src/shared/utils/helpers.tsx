import { useEffect, useRef } from 'react';
import { isEqual } from 'lodash';
import { IFormElements } from 'common/formElements/FormElements.model';

export const mathSubtraction = (a: number | null, b: number, isIncrement = true): number => {
  const a1 = a?.toString()?.split('.');
  let a1Max = 0;
  if (a1?.length === 2) {
    a1Max = a1?.[1]?.length ?? 0;
  }
  const b1 = b?.toString()?.split('.');
  let b1Max = 0;
  if (b1.length === 2) {
    b1Max = b1?.[1]?.length ?? 0;
  }
  const maxLen = a1Max > b1Max ? a1Max : b1Max;
  const isXNumber = (x: number): number => (x !== null && x !== undefined && !Number.isNaN(x) ? x : 0);

  if (isIncrement) {
    const sum = isXNumber(a) + isXNumber(b);
    return sum !== 0 && !Number.isNaN(sum) ? Number(parseFloat(sum.toString()).toFixed(maxLen)) : 0;
  }
  const subtraction = isXNumber(a) - isXNumber(b);
  return subtraction !== 0 && !Number.isNaN(subtraction) ? Number(parseFloat(subtraction.toString()).toFixed(maxLen)) : 0;
};

export const isNumeric = (value: string | number | null): boolean => {
  if (typeof value !== 'string') {
    return false;
  }
  return !Number.isNaN(value) && !Number.isNaN(parseFloat(value));
};

