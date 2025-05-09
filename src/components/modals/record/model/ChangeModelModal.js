import ErrorDisplay from "@/components/error/ErrorDisplay";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useModal from "@/hooks/useModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import URLS, {URLKEYS} from "@/util/urls";
import FetchSelect from "@/components/filtering/FetchSelect";
import {Button, Checkbox, FormControlLabel} from "@mui/material";
import {REGEX} from "@/util/regex";
import ValidatedTextField from "@/components/input/ValidatedTextField";


export default function ChangeModelModal({model}) {
  const [editedModel, setEditedModel] = useState(model);
  const [isValid, setIsValid] = useState(false);
  //Other
  const [error, setError] = useState("");
  const {setIsModalOpen} = useModal();
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();


  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axiosPrivate.put(
        URLS.Models + model.modelId,
        model,
        {
          headers: {"Content-Type": "application/json"},
        }
      );
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueriesData({
        queryKey: [URLS.Models],
        exact: false,
      }, (oldData) => {
        return oldData ? oldData.map((m) => m.modelId === data.modelId ?
            {...data, bikeCount: m.bikeCount, placeBikeCount: m.placeBikeCount} : m)
          : oldData
      });
      setIsModalOpen(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const updateField = (key, value) => {
    setEditedModel((prev) => ({...prev, [key]: value}));
  };

  function handleClick() {
    if (validate()) mutation.mutate();
  }

  const validate = () => {
    return REGEX.MODEL_NAME.test(editedModel.modelName) &&
      REGEX.PRODUCT_NAME.test(editedModel.productCode) &&
      REGEX.EAN.test(editedModel.eanCode) &&
      REGEX.FRAME.test(editedModel.frameSize) &&
      REGEX.PRICE.test(editedModel.price) &&
      editedModel.wheelSize !== "" &&
      editedModel.manufacturerId !== "" &&
      editedModel.categoryId !== "" &&
      typeof editedModel.isWoman === "boolean" &&
      typeof editedModel.isElectric === "boolean";
  }

  useEffect(() => {
    setIsValid(validate());
  }, [editedModel]);

  return (
    <div className='flex flex-col gap-y-2 w-[600px] pb-4'>
      <ErrorDisplay message={error} isVisible={error !== ""}/>
      <ValidatedTextField
        label="Nazwa"
        value={editedModel.modelName}
        onChange={(v) => updateField("modelName", v)}
        regex={REGEX.MODEL_NAME}
      />
      <ValidatedTextField
        label="Kod produktu"
        value={editedModel.productCode}
        onChange={(v) => updateField("productCode", v)}
        regex={REGEX.PRODUCT_NAME}
      />
      <ValidatedTextField
        label="Rozmiar ramy"
        other={{type: "number"}}
        value={editedModel.frameSize}
        onChange={(v) => updateField("frameSize", v)}
        regex={REGEX.FRAME}
      />
      <FetchSelect
        value={editedModel.wheelSize}
        onChange={(v) => updateField("wheelSize", v)}
        urlKey={URLKEYS.WheelSizes}
        label="Rozmiar koła"
        defaultValue=""
        validated
      />
      <ValidatedTextField
        label="Cena"
        other={{type: "number"}}
        value={editedModel.price}
        onChange={(v) => updateField("price", v)}
        regex={REGEX.PRICE}
      />
      <FetchSelect
        value={editedModel.manufacturerId}
        onChange={(v) => updateField("manufacturerId", v)}
        urlKey={URLKEYS.Manufacturers}
        label="Producent"
        defaultValue=""
        validated
      />
      <FetchSelect
        value={editedModel.categoryId}
        onChange={(v) => updateField("categoryId", v)}
        urlKey={URLKEYS.Categories}
        label="Kategoria"
        defaultValue=""
        validated
      />
      <FormControlLabel
        control={<Checkbox/>}
        checked={editedModel.isWoman}
        onChange={() => updateField("isWoman", !model.isWoman)}
        label="Damski"
      />
      <FormControlLabel
        control={<Checkbox/>}
        checked={editedModel.isElectric}
        onChange={() => updateField("isElectric", !model.isElectric)}
        label="Elektryczny"
      />
      <Button
        variant={"contained"} color={"primary"} onClick={() => handleClick()} disabled={!isValid}>
        Zmień dane
      </Button>
    </div>
  );
}
