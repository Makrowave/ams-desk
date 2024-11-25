import ErrorDisplay from "@/components/error/error_display";
import SingleCheckbox from "@/components/filtering/single_checkbox";
import ValidationFetchSelect from "@/components/validation/validation_fetch_select";
import useAxiosPrivate from "@/hooks/use_axios_private";
import useModal from "@/hooks/use_modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { REGEX } from "@/util/regex";
import { QUERY_KEYS } from "@/util/query_keys";

export default function ChangeModelModal({ model }) {
  const modelId = model.modelId;
  const [name, setName] = useState(model.modelName);
  const [productCode, setProductCode] = useState(model.productCode);
  const [frameSize, setFrameSize] = useState(model.frameSize);
  const [price, setPrice] = useState(model.price);
  // Validation values
  const [validName, setValidName] = useState(false);
  const [validProductCode, setValidProductCode] = useState(false);
  const [validFrameSize, setValidFrameSize] = useState(false);
  const [validPrice, setValidPrice] = useState(false);
  // Regex
  const NAME_REGEX = REGEX.MODEL_NAME;
  const EAN_REGEX = REGEX.EAN;
  const PRODUCT_REGEX = REGEX.PRODUCT_NAME;
  const FRAME_REGEX = REGEX.FRAME;
  const PRICE_REGEX = REGEX.PRICE;
  //In-built validation
  const [wheelSize, setWheelSize] = useState(model.wheelSize);
  const [manufacturerId, setManufacturerId] = useState(model.manufacturerId);
  const [categoryId, setCategoryId] = useState(model.categoryId);
  const [isWoman, setIsWoman] = useState(model.isWoman);
  const [isElectric, setIsElectric] = useState(model.isElectric);
  const _url = "/Models/";
  //Other
  const [error, setError] = useState("");
  const { setIsOpen } = useModal();
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  //Validation logic
  //Name
  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);
  //PRODUCT
  useEffect(() => {
    setValidProductCode(PRODUCT_REGEX.test(productCode));
  }, [productCode]);
  //FRAME
  useEffect(() => {
    setValidFrameSize(FRAME_REGEX.test(frameSize));
  }, [frameSize]);
  //PRICE
  useEffect(() => {
    setValidPrice(PRICE_REGEX.test(price));
  }, [price]);

  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put(
        _url + modelId,
        JSON.stringify({
          productCode: productCode,
          modelName: name,
          frameSize: frameSize,
          wheelSize: wheelSize,
          isWoman: isWoman,
          manufacturerId: manufacturerId,
          categoryId: categoryId,
          price: price,
          isElectric: isElectric,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.Models],
        exact: false,
      });
      setIsOpen(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  function handleClick() {
    if (validate()) mutation.mutate();
  }

  function validate() {
    let result =
      validName &&
      validPrice &&
      validFrameSize &&
      validProductCode &&
      !!wheelSize &&
      !!manufacturerId &&
      !!categoryId &&
      isWoman !== null &&
      isWoman !== undefined &&
      isElectric !== null &&
      isElectric !== undefined;
    if (!result) setError("Wprowadzono niepoprawne dane");
    return result;
  }
  return (
    <div className='flex flex-col gap-y-2 w-[600px]'>
      <ErrorDisplay message={error} isVisible={error !== ""} />
      <div>
        <div className='flex justify-between'>
          <div className='flex'>
            <span>Nazwa</span>
            <img className='h-5 self-center px-2' src={validName ? "/checkmark.png" : "/red_cross.png"} />
          </div>
          <input
            className='self-end text-center bg-primary border-2 border-tertiary rounded-lg w-1/2'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div>
        <div className='flex justify-between'>
          <div className='flex'>
            <span className='text-nowrap'>Kod producenta</span>
            <img className='h-5 self-center px-2' src={validProductCode ? "/checkmark.png" : "/red_cross.png"} />
          </div>
          <input
            className='self-end text-center bg-primary border-2 border-tertiary rounded-lg w-1/2'
            value={productCode}
            onChange={(e) => {
              setProductCode(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div>
        <div className='flex justify-between'>
          <div className='flex'>
            <span>Rozmiar ramy</span>
            <img className='h-5 self-center px-2' src={validFrameSize ? "/checkmark.png" : "/red_cross.png"} />
          </div>
          <input
            className='self-end text-center bg-primary border-2 border-tertiary rounded-lg w-1/2'
            value={frameSize}
            onChange={(e) => {
              setFrameSize(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <ValidationFetchSelect
          value={wheelSize}
          onChange={setWheelSize}
          src='/WheelSizes'
          queryKey={QUERY_KEYS.WheelSizes}
          title='Rozmiar koła'
          default_option={""}
          default_title='Rozmiar koła'
          useRowStyle={true}
        />
      </div>
      <div>
        <div className='flex justify-between'>
          <div className='flex'>
            <span>Cena</span>
            <img className='h-5 self-center px-2' src={validPrice ? "/checkmark.png" : "/red_cross.png"} />
          </div>
          <input
            className='self-end  text-center bg-primary border-2 border-tertiary rounded-lg w-1/2'
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <ValidationFetchSelect
          value={manufacturerId}
          onChange={setManufacturerId}
          src='/Manufacturers'
          queryKey={QUERY_KEYS.Manufacturers}
          title='Producent'
          default_option={""}
          default_title='Wybierz'
          useRowStyle={true}
        />
      </div>
      <div>
        <ValidationFetchSelect
          value={categoryId}
          onChange={setCategoryId}
          src='/Categories'
          queryKey={QUERY_KEYS.Manufacturers}
          title='Kategoria'
          default_option={""}
          default_title='Wybierz'
          useRowStyle={true}
        />
      </div>
      <SingleCheckbox
        checked={isWoman}
        onChange={(e) => {
          setIsWoman(!isWoman);
        }}
        title='Damski'
      />
      <SingleCheckbox
        checked={isElectric}
        onChange={(e) => {
          setIsElectric(!isElectric);
        }}
        title='Elektryczny'
      />
      <button
        className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 self-center mt-auto mb-4 hover:bg-tertiary'
        onClick={() => handleClick()}
      >
        Zmień dane
      </button>
    </div>
  );
}
