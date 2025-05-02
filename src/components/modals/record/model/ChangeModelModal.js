import ErrorDisplay from "@/components/error/ErrorDisplay";
import SingleCheckbox from "@/components/filtering/SingleCheckbox";
import ValidationFetchSelect from "@/components/validation/ValidationFetchSelect";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useModal from "@/hooks/useModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {REGEX} from "@/util/regex";
import {FaCheck, FaXmark} from "react-icons/fa6";
import URLS from "@/util/urls";

export default function ChangeModelModal({model}) {
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
  const {setIsModalOpen} = useModal();
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
      const result = await axiosPrivate.put(
        _url + modelId,
        JSON.stringify({
          ...model,
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
      <ErrorDisplay message={error} isVisible={error !== ""}/>
      <div>
        <div className='flex justify-between'>
          <div className='flex justify-center items-center'>
            <span className='mr-1'>Nazwa</span>
            {validName ? <FaCheck className='text-green-500'/> : <FaXmark className='text-red-600'/>}
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
          <div className='flex justify-center items-center'>
            <span className='text-nowrap mr-1'>Kod producenta</span>
            {validProductCode ? <FaCheck className='text-green-500'/> : <FaXmark className='text-red-600'/>}
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
          <div className='flex items-center justify-center'>
            <span className='mr-1'>Rozmiar ramy</span>
            {validFrameSize ? <FaCheck className='text-green-500'/> : <FaXmark className='text-red-600'/>}
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
          urlKey={'WheelSizes'}
          title='Rozmiar koła'
          default_option={""}
          default_title='Rozmiar koła'
          useRowStyle={true}
        />
      </div>
      <div>
        <div className='flex justify-between'>
          <div className='flex justify-center items-center'>
            <span className='mr-1'>Cena</span>
            {validPrice ? <FaCheck className='text-green-500'/> : <FaXmark className='text-red-600'/>}
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
          urlKey={'Manufacturers'}
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
          urlKey={'Categories'}
          title='Kategoria'
          default_option={""}
          default_title='Wybierz'
          useRowStyle={true}
        />
      </div>
      <SingleCheckbox
        checked={isWoman}
        onChange={() => {
          setIsWoman(!isWoman);
        }}
        title='Damski'
      />
      <SingleCheckbox
        checked={isElectric}
        onChange={() => {
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
