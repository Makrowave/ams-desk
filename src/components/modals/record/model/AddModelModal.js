import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import ErrorDisplay from '../../../error/ErrorDisplay';
import ColorInput from '@/components/input/ColorInput';
import { REGEX } from '@/util/regex';
import URLS, { URLKEYS } from '@/util/urls';
import FetchSelect from '@/components/filtering/FetchSelect';
import ValidatedTextField from '@/components/input/ValidatedTextField';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';

export default function AddModelModal({ closeModal }) {
  const [model, setModel] = useState({
    modelName: '',
    productCode: '',
    eanCode: '',
    frameSize: '',
    price: '',
    wheelSize: '',
    manufacturerId: '',
    categoryId: '',
    colorId: '',
    primaryColor: '#FF00FF',
    secondaryColor: '#000000',
    isWoman: false,
    isElectric: false,
  });

  const [error, setError] = useState('');

  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const [isValid, setIsValid] = useState(false);

  const updateField = (key, value) => {
    setModel((prev) => ({ ...prev, [key]: value }));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axiosPrivate.post(URLS.Models, model, {
        headers: { 'Content-Type': 'application/json' },
      });
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueriesData(
        {
          queryKey: [URLS.Models],
          exact: false,
        },
        (oldData) => [...oldData, data],
      );
      closeModal();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  function handleClick() {
    if (isValid) mutation.mutate();
  }

  const validate = () => {
    return (
      REGEX.MODEL_NAME.test(model.modelName) &&
      REGEX.PRODUCT_NAME.test(model.productCode) &&
      REGEX.EAN.test(model.eanCode) &&
      REGEX.FRAME.test(model.frameSize) &&
      REGEX.PRICE.test(model.price) &&
      model.wheelSize !== '' &&
      model.manufacturerId !== '' &&
      model.categoryId !== '' &&
      model.colorId !== '' &&
      !!model.primaryColor &&
      !!model.secondaryColor &&
      typeof model.isWoman === 'boolean' &&
      typeof model.isElectric === 'boolean'
    );
  };

  useEffect(() => {
    setIsValid(validate());
  }, [model]);

  return (
    <>
      <ErrorDisplay message={error} isVisible={error !== ''} />
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            display: 'flex',
            width: 300,
            flexDirection: 'column',
            gap: 2,
            mr: 2,
          }}
        >
          <ValidatedTextField
            label="Nazwa"
            value={model.modelName}
            onChange={(v) => updateField('modelName', v)}
            regex={REGEX.MODEL_NAME}
          />
          <ValidatedTextField
            label="Kod produktu"
            value={model.productCode}
            onChange={(v) => updateField('productCode', v)}
            regex={REGEX.PRODUCT_NAME}
          />
          <ValidatedTextField
            label="Kod EAN"
            value={model.eanCode}
            onChange={(v) => updateField('eanCode', v)}
            regex={REGEX.EAN}
          />
          <ValidatedTextField
            label="Rozmiar ramy"
            other={{ type: 'number' }}
            value={model.frameSize}
            onChange={(v) => updateField('frameSize', v)}
            regex={REGEX.FRAME}
          />
          <FetchSelect
            value={model.wheelSize}
            onChange={(v) => updateField('wheelSize', v)}
            urlKey={URLKEYS.WheelSizes}
            label="Rozmiar koła"
            defaultValue=""
            validated
          />
          <ValidatedTextField
            label="Cena"
            other={{ type: 'number' }}
            value={model.price}
            onChange={(v) => updateField('price', v)}
            regex={REGEX.PRICE}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: 300,
            flexDirection: 'column',
            gap: 2,
            pl: 2,
            borderLeft: '1px solid gray',
          }}
        >
          <FetchSelect
            value={model.manufacturerId}
            onChange={(v) => updateField('manufacturerId', v)}
            urlKey={URLKEYS.Manufacturers}
            label="Producent"
            defaultValue=""
            validated
          />
          <FetchSelect
            value={model.categoryId}
            onChange={(v) => updateField('categoryId', v)}
            urlKey={URLKEYS.Categories}
            label="Kategoria"
            defaultValue=""
            validated
          />
          <FetchSelect
            value={model.colorId}
            onChange={(v) => updateField('colorId', v)}
            urlKey={URLKEYS.Colors}
            defaultValue=""
            label="Kolor"
            validated
          />
          <ColorInput
            title="Kolor główny"
            value={model.primaryColor}
            setValue={(v) => updateField('primaryColor', v)}
          />
          <ColorInput
            title="Kolor dodatkowy"
            value={model.secondaryColor}
            setValue={(v) => updateField('secondaryColor', v)}
          />
          <FormControlLabel
            control={<Checkbox />}
            checked={model.isWoman}
            onChange={() => updateField('isWoman', !model.isWoman)}
            label="Damski"
          />
          <FormControlLabel
            control={<Checkbox />}
            checked={model.isElectric}
            onChange={() => updateField('isElectric', !model.isElectric)}
            label="Elektryczny"
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        className="mb-2"
        onClick={handleClick}
        disabled={!isValid}
      >
        Dodaj model
      </Button>
    </>
  );
}
