import ValidationFetchSelect from "@/components/validation/ValidationFetchSelect";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useModal from "@/hooks/useModal";
import {QUERY_KEYS} from "@/util/query_keys";
import {REGEX} from "@/util/regex";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {FaCheck, FaXmark} from "react-icons/fa6";

export default function NewRepairModal({}) {
  const axios = useAxiosPrivate();
  const router = useRouter();
  const {setIsOpen} = useModal();
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState(localStorage.getItem("repairModal:defaultPlace") ?? "");
  const [bike, setBike] = useState("");
  const [issue, setIssue] = useState("");
  const [employee, setEmployee] = useState("");

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isBikeValid, setIsBikeValid] = useState(false);
  const [isIssueValid, setIsIssueValid] = useState(false);

  const [error, setError] = useState("");

  const updatePhone = (value) => {
    setPhone(value);
    setIsPhoneValid(REGEX.PHONE.test(value));
  };
  const updateBike = (value) => {
    setBike(value);
    setIsBikeValid(REGEX.POLISH_TEXT.test(value) && value.length <= 40);
  };
  const updateIssue = (value) => {
    setIssue(value);
    setIsIssueValid(REGEX.POLISH_TEXT.test(value) && value.length <= 200);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      return await axios.post(
        "/Repairs",
        JSON.stringify({phoneNumber: phone, issue: issue, bikeName: bike, placeId: place, takeInEmployeeId: employee}),
      );
    },
    onSuccess: (response) => {
      const id = response.data;
      setIsOpen(false);
      router.push(`/serwis/${id}`);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <div className='*:mb-2 w-full flex flex-col'>
      <div>
        <ValidationFetchSelect
          value={place}
          onChange={(value) => {
            setPlace(value);
            localStorage.setItem("repairModal:defaultPlace", value)
          }}
          src='/Places'
          queryKey={QUERY_KEYS.Places}
          default_option={""}
          title='Miejsce przyjęcia'
          default_title='Wybierz z listy'
        />
        <ValidationFetchSelect
          value={employee}
          onChange={setEmployee}
          src='/Employees'
          queryKey={QUERY_KEYS.Employees}
          title={"Kto przyjmuje"}
          default_option={""}
          default_title='Wybierz z listy'
        />
      </div>
      <div className='flex flex-col rounded-lg border-border border p-1 *:px-1'>
        <div className='border-b border-gray-400 w-fit flex items-center'>
          <span className='text-xs text-gray-400 mr-1'>Telefon</span>
          {isPhoneValid ? <FaCheck className='text-green-500 text-sm'/> : <FaXmark className='text-red-600 text-sm'/>}
        </div>
        <input
          type='text'
          className='w-full focus:outline-none'
          placeholder='Telefon'
          value={phone}
          onChange={(e) => updatePhone(e.target.value)}
        />
      </div>
      <div className='flex flex-col rounded-lg border-border border p-1 *:px-1'>
        <div className='border-b border-gray-400 w-fit flex items-center'>
          <span className='text-xs text-gray-400 mr-1'>Rower</span>
          {isBikeValid ? <FaCheck className='text-green-500 text-sm'/> : <FaXmark className='text-red-600 text-sm'/>}
        </div>
        <input
          type='text'
          className='w-full focus:outline-none'
          placeholder='Rower'
          value={bike}
          onChange={(e) => {
            updateBike(e.target.value);
          }}
        />
      </div>
      <div className='flex flex-col rounded-lg border-border border p-1 *:px-1'>
        <div className='border-b border-gray-400 w-fit flex items-center'>
          <span className='text-xs text-gray-400 mr-1'>Problem</span>
          {isIssueValid ? <FaCheck className='text-green-500 text-sm'/> : <FaXmark className='text-red-600 text-sm'/>}
        </div>
        <textarea
          className='w-full focus:outline-none'
          placeholder='Problem'
          value={issue}
          onChange={(e) => {
            updateIssue(e.target.value);
          }}
        />
      </div>
      <button
        disabled={!(isBikeValid && isIssueValid && isPhoneValid && place !== "" && employee !== "")}
        className='button-primary w-full self-center'
        onClick={() => mutation.mutate()}
      >
        Stwórz
      </button>
    </div>
  );
}
