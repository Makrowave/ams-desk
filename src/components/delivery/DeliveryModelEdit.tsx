import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { DeliveryModel } from '../../types/deliveryTypes';
import FetchSelect from '../filtering/FetchSelect';
import { URLKEYS } from '../../util/urls';
import ColorInput from '../input/ColorInput';

type DeliveryModelEditProps = {
  editData: DeliveryModel;
  setEditData: React.Dispatch<React.SetStateAction<DeliveryModel>>;
  handleSave: (field: keyof DeliveryModel, value: any) => void;
};

const DeliveryModelEdit = ({
  editData,
  setEditData,
  handleSave,
}: DeliveryModelEditProps) => (
  <>
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}>
      <TextField
        label="Nazwa"
        value={editData.name}
        onChange={(e) =>
          setEditData((prev) => ({ ...prev, name: e.target.value }))
        }
        onBlur={(e) => handleSave('name', e.target.value)}
        fullWidth
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}>
      <TextField
        label="Kod EAN"
        value={editData.eanCode}
        onChange={(e) =>
          setEditData((prev) => ({ ...prev, eanCode: e.target.value }))
        }
        onBlur={(e) => handleSave('eanCode', e.target.value)}
        fullWidth
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}>
      <TextField
        label="Kod produktu"
        value={editData.productCode}
        onChange={(e) =>
          setEditData((prev) => ({ ...prev, productCode: e.target.value }))
        }
        onBlur={(e) => handleSave('productCode', e.target.value)}
        fullWidth
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}>
      <TextField
        label="Rozmiar ramy"
        type="number"
        value={editData.frameSize}
        onChange={(e) =>
          setEditData((prev) => ({
            ...prev,
            frameSize: Number(e.target.value),
          }))
        }
        onBlur={(e) => handleSave('frameSize', Number(e.target.value))}
        fullWidth
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}>
      <TextField
        label="Cena"
        type="number"
        value={editData.price}
        onChange={(e) =>
          setEditData((prev) => ({ ...prev, price: Number(e.target.value) }))
        }
        onBlur={(e) => handleSave('price', Number(e.target.value))}
        fullWidth
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}>
      <FetchSelect
        label="Rozmiar koła"
        value={editData.wheelSizeId ?? 0}
        onChange={(value) => {
          setEditData((prev) => ({ ...prev, wheelSizeId: value }));
          handleSave('wheelSizeId', value);
        }}
        urlKey={URLKEYS.WheelSizes}
        defaultValue={0}
        validated
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}>
      <FetchSelect
        label="Producent"
        value={editData.manufacturerId ?? 0}
        onChange={(value) => {
          setEditData((prev) => ({ ...prev, manufacturerId: value }));
          handleSave('manufacturerId', value);
        }}
        urlKey={URLKEYS.Manufacturers}
        defaultValue={0}
        validated
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}>
      <FetchSelect
        label="Kategoria"
        value={editData.categoryId ?? 0}
        onChange={(value) => {
          setEditData((prev) => ({ ...prev, categoryId: value }));
          handleSave('categoryId', value);
        }}
        urlKey={URLKEYS.Categories}
        defaultValue={0}
        validated
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}>
      <FetchSelect
        label="Kolor"
        value={editData.colorId ?? 0}
        onChange={(value) => {
          setEditData((prev) => ({ ...prev, colorId: value }));
          handleSave('colorId', value);
        }}
        urlKey={URLKEYS.Colors}
        defaultValue={0}
        validated
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}>
      <ColorInput
        title="Kolor główny"
        value={editData.primaryColor ?? '#FF00FF'}
        setValue={(value) => {
          setEditData((prev) => ({ ...prev, primaryColor: value }));
        }}
        onBlur={() => handleSave('primaryColor', editData.primaryColor)}
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}>
      <ColorInput
        title="Kolor dodatkowy"
        value={editData.secondaryColor ?? '#000000'}
        setValue={(value) => {
          setEditData((prev) => ({ ...prev, secondaryColor: value }));
        }}
        onBlur={() => handleSave('secondaryColor', editData.secondaryColor)}
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}>
      <FormControlLabel
        control={<Checkbox />}
        checked={editData.isWoman ?? false}
        onChange={(e, checked) => {
          setEditData((prev) => ({ ...prev, isWoman: checked }));
          handleSave('isWoman', checked);
        }}
        label="Damski"
      />
    </Grid>
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 2 }}>
      <FormControlLabel
        control={<Checkbox />}
        checked={editData.isElectric ?? false}
        onChange={(e, checked) => {
          setEditData((prev) => ({ ...prev, isElectric: checked }));
          handleSave('isElectric', checked);
        }}
        label="Elektryczny"
      />
    </Grid>
  </>
);

export default DeliveryModelEdit;
