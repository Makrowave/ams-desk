import { REPAIR_STATUS } from './repairStatuses';

export const strFind = (where: string, what: string) => {
  if (what === '') return true;
  where = where.toLocaleLowerCase();
  where = where
    .split('')
    .map((c) => polishDict[c] ?? c)
    .join('');
  what = what.toLocaleLowerCase();
  what = what
    .split('')
    .map((c) => polishDict[c] ?? c)
    .join('');

  return where.includes(what);
};

export const polishDict: Record<string, string> = {
  ż: 'z',
  ź: 'z',
  ę: 'e',
  ó: 'o',
  ą: 'a',
  ś: 's',
  ł: 'l',
  ć: 'c',
  ń: 'n',
} as const;

export const createTableSrc = (excluded: REPAIR_STATUS[]) => {
  const result = excluded.reduce(
    (src, exclude) => src + 'excluded=' + exclude + '&',
    '/Repairs?',
  );
  return result.slice(0, result.length - 1);
};

export const collected = [
  REPAIR_STATUS.Pending,
  REPAIR_STATUS.Warranty,
  REPAIR_STATUS.InProgress,
  REPAIR_STATUS.AwaitingParts,
  REPAIR_STATUS.Finished,
  REPAIR_STATUS.Notified,
  REPAIR_STATUS.ContactNeeded,
];

export const finished = [
  REPAIR_STATUS.Pending,
  REPAIR_STATUS.Warranty,
  REPAIR_STATUS.InProgress,
  REPAIR_STATUS.AwaitingParts,
  REPAIR_STATUS.Collected,
  REPAIR_STATUS.ContactNeeded,
  REPAIR_STATUS.Cancelled,
];

export const inProgress = [
  REPAIR_STATUS.Collected,
  REPAIR_STATUS.Finished,
  REPAIR_STATUS.Notified,
  REPAIR_STATUS.Cancelled,
];
