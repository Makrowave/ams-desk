import { useEffect, useState } from "react";
import ValidationFetchSelect from "../../../validation/validation_fetch_select";
import SingleCheckbox from "../../../filtering/single_checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/use_axios_private";
import ErrorDisplay from "../../../error/error_display";
import useModal from "@/hooks/use_modal";
import ColorInput from "@/components/input/color_input";
import { REGEX } from "@/util/regex";
import { QUERY_KEYS } from "@/util/query_keys";

//Add refetch

export default function AddModelModal() {
  // Values with validation values
  const [name, setName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [eanCode, setEanCode] = useState("");
  const [frameSize, setFrameSize] = useState("");
  const [price, setPrice] = useState("");
  // Focus values
  const [nameFocus, setNameFocus] = useState(false);
  const [productCodeFocus, setProductCodeFocus] = useState(false);
  const [eanCodeFocus, setEanCodeFocus] = useState(false);
  const [frameSizeFocus, setFrameSizeFocus] = useState(false);
  const [priceFocus, setPriceFocus] = useState(false);
  // Validation values
  const [validName, setValidName] = useState(false);
  const [validProductCode, setValidProductCode] = useState(false);
  const [validEanCode, setValidEanCode] = useState(false);
  const [validFrameSize, setValidFrameSize] = useState(false);
  const [validPrice, setValidPrice] = useState(false);
  // Regex
  const NAME_REGEX = REGEX.MODEL_NAME;
  const EAN_REGEX = REGEX.EAN;
  const PRODUCT_REGEX = REGEX.PRODUCT_NAME;
  const FRAME_REGEX = REGEX.FRAME;
  const PRICE_REGEX = REGEX.PRICE;
  // Values that use component with in-built validation render
  const [wheelSize, setWheelSize] = useState("");
  const [manufacturerId, setManufacturerId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [colorId, setColorId] = useState("");
  // Values which don't need a validation render
  const [primaryColor, setPrimaryColor] = useState("#FF00FF");
  const [secondaryColor, setSecondaryColor] = useState("#000000");
  const [isWoman, setIsWoman] = useState(false);
  const [isElectric, setIsElectric] = useState(false);
  //Other
  const _url = "/Models";
  const [error, setError] = useState("");
  const { setIsOpen } = useModal();

  //Validation logic
  //Name
  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);
  //EAN - maybe add additional validation
  useEffect(() => {
    setValidEanCode(EAN_REGEX.test(eanCode));
  }, [eanCode]);
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
  //Query
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.post(
        _url,
        JSON.stringify({
          productCode: productCode,
          eanCode: eanCode,
          frameSize: frameSize,
          modelName: name,
          frameSize: Number(frameSize),
          isWoman: isWoman,
          wheelSize: wheelSize,
          manufacturerId: manufacturerId,
          price: price,
          isElectric: isElectric,
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
          colorId: colorId,
          categoryId: categoryId,
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
  function validate() {
    let result =
      validName &&
      //validEanCode &&
      validPrice &&
      validFrameSize &&
      //validProductCode &&
      !!wheelSize &&
      !!manufacturerId &&
      !!categoryId &&
      !!colorId &&
      !!primaryColor &&
      !!secondaryColor &&
      isWoman !== null &&
      isWoman !== undefined &&
      isElectric !== null &&
      isElectric !== undefined;
    if (!result) setError("Wprowadzono niepoprawne dane");
    return result;
  }

  function handleClick() {
    if (validate()) mutation.mutate();
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
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
            className='self-end text-center bg-primary border-2 border-tertiary rounded-l w-1/2'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        {/* {!validName && nameFocus ? (
          <div className='flex flex-col bg-tertiary px-4 py-2 rounded-md'>
            <p>4-50 znaków</p>
            <p>Polskie znaki, cyfry i spacje</p>
            <p>Dozwolone: .-_</p>
          </div>
        ) : (
          <></>
        )} */}
      </div>
      <div>
        <div className='flex justify-between'>
          <div className='flex'>
            <span className='text-nowrap'>Kod producenta</span>
            <img className='h-5 self-center px-2' src={validProductCode ? "/checkmark.png" : "/red_cross.png"} />
          </div>
          <input
            onFocus={() => setProductCodeFocus(true)}
            onBlur={() => setProductCodeFocus(false)}
            className='self-end text-center bg-primary border-2 border-tertiary rounded-l w-1/2'
            value={productCode}
            onChange={(e) => {
              setProductCode(e.target.value);
            }}
          ></input>
        </div>
        {/* {!validProductCode && productCodeFocus ? (
          <div className='flex flex-col bg-tertiary px-4 py-2 rounded-md'>
            <p>4-30 znaków</p>
            <p>Alfabet łaciński i cyfry</p>
            <p>Dozwolone: _-</p>
          </div>
        ) : (
          <></>
        )} */}
      </div>
      <div>
        <div className='flex justify-between'>
          <div className='flex'>
            <span>Kod EAN</span>
            <img className='h-5 self-center px-2' src={validEanCode ? "/checkmark.png" : "/red_cross.png"} />
          </div>
          <input
            onFocus={() => setEanCodeFocus(true)}
            onBlur={() => setEanCodeFocus(false)}
            className='self-end text-center bg-primary border-2 border-tertiary rounded-l w-1/2'
            value={eanCode}
            onChange={(e) => {
              setEanCode(e.target.value);
            }}
          />
        </div>
        {/* {!validEanCode && eanCodeFocus ? (
          <div className='flex flex-col bg-tertiary px-4 py-2 rounded-md'>
            <p>13 cyfr</p>
            <p>Musi być poprawnym kodem EAN</p>
          </div>
        ) : (
          <></>
        )} */}
      </div>
      <div>
        <div className='flex justify-between'>
          <div className='flex'>
            <span>Rozmiar ramy</span>
            <img className='h-5 self-center px-2' src={validFrameSize ? "/checkmark.png" : "/red_cross.png"} />
          </div>
          <input
            type='number'
            onFocus={() => setFrameSizeFocus(true)}
            onBlur={() => setFrameSizeFocus(false)}
            className='self-end text-center bg-primary border-2 border-tertiary rounded-l w-1/2'
            value={frameSize}
            onChange={(e) => {
              setFrameSize(e.target.value);
            }}
          />
        </div>
        {/* {!validFrameSize && frameSizeFocus ? (
          <div className='flex flex-col bg-tertiary px-4 py-2 rounded-md'>
            <p>1-2 cyfry</p>
          </div>
        ) : (
          <></>
        )} */}
      </div>
      <div>
        <ValidationFetchSelect
          value={wheelSize}
          onChange={setWheelSize}
          src='/WheelSizes'
          queryKey={QUERY_KEYS.WheelSizes}
          title='Rozmiar koła'
          default_option={""}
          default_title='Wybierz'
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
            type='number'
            onFocus={() => setPriceFocus(true)}
            onBlur={() => setPriceFocus(false)}
            className='self-end  text-center bg-primary border-2 border-tertiary rounded-l w-1/2'
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          ></input>
        </div>
        {/* {!validPrice && priceFocus ? (
          <div className='flex flex-col bg-tertiary px-4 py-2 rounded-md'>
            <p>3-5 cyfr</p>
          </div>
        ) : (
          <></>
        )} */}
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
          queryKey={QUERY_KEYS.Categories}
          title='Kategoria'
          default_option={""}
          default_title='Wybierz'
          useRowStyle={true}
        />
      </div>
      <div>
        <ValidationFetchSelect
          value={colorId}
          onChange={setColorId}
          src='/Colors'
          queryKey={QUERY_KEYS.Colors}
          title='Kolor'
          default_option={""}
          default_title='Wybierz'
          useRowStyle={true}
          isColored={true}
        />
      </div>
      <ColorInput title='Kolor główny' value={primaryColor} setValue={setPrimaryColor} />
      <ColorInput title='Kolor dodatkowy' value={secondaryColor} setValue={setSecondaryColor} />
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
      <button className='button-secondary self-center mt-auto mb-4' onClick={() => handleClick()}>
        Dodaj model
      </button>
    </div>
  );
}
