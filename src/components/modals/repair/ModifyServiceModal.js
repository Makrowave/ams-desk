import ValidationFetchSelect from "@/components/validation/ValidationFetchSelect";
import {QUERY_KEYS} from "@/util/query_keys";
import {useState} from "react";
import {FaCheck, FaXmark} from "react-icons/fa6";
import {REGEX} from "@/util/regex";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useModal from "@/hooks/useModal";

export default function ModifyServiceModal({service}) {
    const {setIsOpen} = useModal();

    const [category, setCategory] = useState(service.serviceCategoryId);
    const [name, setName] = useState(service.serviceName);
    const [price, setPrice] = useState(service.price);

    const [isNameValid, setIsNameValid] = useState(true);
    const [isPriceValid, setIsPriceValid] = useState(true);

    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async () => {
            const result = axiosPrivate.put(
                `services/${service.serviceId}`,
                JSON.stringify({
                    serviceId: service.serviceId,
                    serviceName: name,
                    price: price,
                    serviceCategoryId: category,
                })
            );
            return result;
        },
        onSuccess: async () => {
            await queryClient.refetchQueries({queryKey: [QUERY_KEYS.Services], exact: false});
            setIsOpen(false);
        },
    });

    const updateName = (value) => {
        if (REGEX.POLISH_TEXT.test(value) && value.length <= 40) {
            setIsNameValid(true);
        } else {
            setIsNameValid(false);
        }
        setName(value);
    };

    const updatePrice = (value) => {
        const num = Number(value);
        if (!isNaN(num) && num > 0 && num < 10000) {
            setIsPriceValid(true);
        } else {
            setIsPriceValid(false);
        }
        setPrice(value);
    };

    return (
        <div className='flex flex-col w-full justify-between items-center py-2'>
            <div className='w-full *:w-full *:mb-4'>
                <ValidationFetchSelect
                    value={category}
                    onChange={setCategory}
                    src='/PartCategories'
                    queryKey={QUERY_KEYS.PartCategories}
                    default_option={""}
                    title='Kategoria'
                    default_title='Wybierz z listy'
                />

                <div className='flex flex-col rounded-lg border-border border p-1 *:px-1'>
                    <div className='border-b border-gray-400 w-fit flex items-center'>
                        <span className='text-xs text-gray-400 mr-1'>Nazwa</span>
                        {isNameValid ? (
                            <FaCheck className='text-green-500 text-sm'/>
                        ) : (
                            <FaXmark className='text-red-600 text-sm'/>
                        )}
                    </div>
                    <input
                        type='text'
                        className='w-full focus:outline-none'
                        placeholder='Nazwa'
                        value={name}
                        onChange={(e) => updateName(e.target.value)}
                    />
                </div>
                <div className='flex flex-col rounded-lg border-border border p-1 *:px-1'>
                    <div className='border-b border-gray-400 w-fit flex items-center'>
                        <span className='text-xs text-gray-400 mr-1'>Cena</span>
                        {isPriceValid ? (
                            <FaCheck className='text-green-500 text-sm'/>
                        ) : (
                            <FaXmark className='text-red-600 text-sm'/>
                        )}
                    </div>
                    <input
                        type='text'
                        className='w-full focus:outline-none'
                        placeholder='Cena'
                        value={price}
                        onChange={(e) => updatePrice(e.target.value)}
                    />
                </div>
                <button
                    disabled={!(isNameValid && isPriceValid && category !== "")}
                    className='button-primary text-center disabled:bg-gray-400'
                    onClick={() => mutation.mutate()}
                >
                    Edytuj
                </button>
            </div>
        </div>
    );
}
