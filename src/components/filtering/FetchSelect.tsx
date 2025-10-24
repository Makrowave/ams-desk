'use client';
import { DataSelect } from '../input/DataSelect';
import { createQueryHook } from '../../hooks/queryHooks';
import { URLKEYS } from '../../util/urls';
import { SelectOption } from '../../types/selectTypes';

type FetchSelectProps = {
  urlKey: keyof typeof URLKEYS;
  params?: Record<string, any> | null;
  value: number;
  onChange: (value: number) => void;
  label: string;
  defaultValue: number;
  defaultName?: string;
  validated?: boolean;
};

//TODO - style
const FetchSelect = <T extends SelectOption>({
  urlKey,
  params = null,
  value,
  onChange,
  label,
  defaultValue,
  defaultName,
  validated,
}: FetchSelectProps) => {
  const hook = createQueryHook(urlKey);
  const { data, isPending, isError, error, refetch } = hook<T[]>(params);

  if (isPending) {
    return (
      <div className="text-center bg-primary border-2 border-tertiary rounded w-full">
        Ładowanie
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center bg-error-light text-error-dark border-2 border-tertiary rounded w-full">
        <button
          onClick={() => refetch()}
          className="flex justify-center self-start flex-row w-full"
        >
          Błąd {error?.response?.status}{' '}
          <img
            src="/refresh.png"
            className="h-5 self-center px-2 rotate-[135deg]"
          />
        </button>
      </div>
    );
  }
  return (
    <DataSelect
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      defaultName={defaultName}
      options={data}
      label={label}
      validated={validated}
    />
  );
};

export default FetchSelect;
