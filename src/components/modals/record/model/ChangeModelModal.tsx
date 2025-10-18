import ErrorDisplay from '../../../error/ErrorDisplay';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import URLS, { URLKEYS } from '../../../../util/urls';
import FetchSelect from '../../../filtering/FetchSelect';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { REGEX } from '../../../../util/regex';
import ValidatedTextField from '../../../input/ValidatedTextField';
import { ModelModalProps } from '../../types/modalTypes';
import { ModelRecord } from '../../../../app/types/bikeTypes';

const ChangeModelModal = ({ model, closeModal }: ModelModalProps) => {
  const [editedModel, setEditedModel] = useState(model);
  const [isValid, setIsValid] = useState(false);
  //Other
  const [error, setError] = useState('');
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axiosPrivate.put(
        URLS.Models + model.modelId,
        model,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueriesData<ModelRecord[]>(
        {
          queryKey: [URLS.Models],
          exact: false,
        },
        (oldData) => {
          return oldData
            ? oldData.map((m) =>
                m.modelId === data.modelId
                  ? {
                      ...data,
                      bikeCount: m.bikeCount,
                      placeBikeCount: m.placeBikeCount,
                    }
                  : m,
              )
            : oldData;
        },
      );
      if (closeModal) closeModal();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const updateField = (
    key: keyof ModelRecord,
    value: ModelRecord[typeof key],
  ) => {
    setEditedModel((prev) => ({ ...prev, [key]: value }));
  };

  function handleClick() {
    if (validate()) mutation.mutate();
  }

  const validate = () => {
    return (
      REGEX.MODEL_NAME.test(editedModel.modelName) &&
      REGEX.PRODUCT_NAME.test(editedModel.productCode ?? '') &&
      REGEX.EAN.test(editedModel.eanCode ?? '') &&
      REGEX.FRAME.test(String(editedModel.frameSize ?? '')) &&
      REGEX.PRICE.test(String(editedModel.price ?? '')) &&
      editedModel.wheelSize !== 0 &&
      editedModel.manufacturerId !== 0 &&
      editedModel.categoryId !== 0 &&
      typeof editedModel.isWoman === 'boolean' &&
      typeof editedModel.isElectric === 'boolean'
    );
  };

  useEffect(() => {
    setIsValid(validate());
  }, [editedModel]);

  return (
    <>
      <ErrorDisplay message={error} isVisible={error !== ''} />
      <ValidatedTextField
        label="Nazwa"
        value={editedModel.modelName}
        onChange={(v) => updateField('modelName', v)}
        regex={REGEX.MODEL_NAME}
      />
      <ValidatedTextField
        label="Kod produktu"
        value={editedModel.productCode}
        onChange={(v) => updateField('productCode', v)}
        regex={REGEX.PRODUCT_NAME}
      />
      <ValidatedTextField
        label="Rozmiar ramy"
        textFieldProps={{ type: 'number' }}
        value={editedModel.frameSize}
        type="number"
        onChange={(v) => updateField('frameSize', v)}
        regex={REGEX.FRAME}
      />
      <FetchSelect
        value={editedModel.wheelSize}
        onChange={(v) => updateField('wheelSize', v)}
        urlKey={URLKEYS.WheelSizes}
        label="Rozmiar koła"
        defaultValue={0}
        validated
      />
      <ValidatedTextField
        label="Cena"
        textFieldProps={{ type: 'number' }}
        value={editedModel.price}
        type="number"
        onChange={(v) => updateField('price', v)}
        regex={REGEX.PRICE}
      />
      <FetchSelect
        value={editedModel.manufacturerId}
        onChange={(v) => updateField('manufacturerId', v)}
        urlKey={URLKEYS.Manufacturers}
        label="Producent"
        defaultValue={0}
        validated
      />
      <FetchSelect
        value={editedModel.categoryId}
        onChange={(v) => updateField('categoryId', v)}
        urlKey={URLKEYS.Categories}
        label="Kategoria"
        defaultValue={0}
        validated
      />
      <FormControlLabel
        control={<Checkbox />}
        checked={editedModel.isWoman}
        onChange={() => updateField('isWoman', !model.isWoman)}
        label="Damski"
      />
      <FormControlLabel
        control={<Checkbox />}
        checked={editedModel.isElectric}
        onChange={() => updateField('isElectric', !model.isElectric)}
        label="Elektryczny"
      />
      <Button
        variant={'contained'}
        color={'primary'}
        onClick={() => handleClick()}
        disabled={!isValid}
      >
        Zmień dane
      </Button>
    </>
  );
};

export default ChangeModelModal;
