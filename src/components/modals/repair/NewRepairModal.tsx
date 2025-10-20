import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { REGEX } from '../../../util/regex';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FetchSelect from '../../filtering/FetchSelect';
import URLS, { URLKEYS } from '../../../util/urls';
import { Button } from '@mui/material';
import ValidatedTextField from '../../input/ValidatedTextField';
import ValidatedTextarea from '../../input/ValidatedTextarea';

export default function NewRepairModal({
  closeModal,
}: {
  closeModal?: () => void;
}) {
  const axios = useAxiosPrivate();
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [place, setPlace] = useState(
    localStorage.getItem('repairModal:defaultPlace') ?? '',
  );
  const [bike, setBike] = useState('');
  const [issue, setIssue] = useState('');
  const [employee, setEmployee] = useState('');

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isBikeValid, setIsBikeValid] = useState(false);
  const [isIssueValid, setIsIssueValid] = useState(false);

  const [error, setError] = useState('');

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
      return await axios.post(URLS.Repairs, {
        phoneNumber: phone,
        issue: issue,
        bikeName: bike,
        placeId: place,
        takeInEmployeeId: employee,
      });
    },
    onSuccess: (response) => {
      const id = response.data;
      closeModal();
      router.push(`/serwis/${id}`);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <>
      <FetchSelect
        value={place}
        onChange={(value) => {
          setPlace(value);
          localStorage.setItem('repairModal:defaultPlace', value);
        }}
        urlKey={URLKEYS.Places}
        defaultValue={''}
        label="Miejsce przyjęcia"
        validated
      />
      <FetchSelect
        value={employee}
        onChange={setEmployee}
        urlKey={URLKEYS.Employees}
        label={'Kto przyjmuje'}
        defaultValue={''}
        validated
      />
      <ValidatedTextField
        label="Telefon"
        value={phone}
        onChange={updatePhone}
        regex={REGEX.PHONE}
      />
      <ValidatedTextField
        label="Rower"
        value={bike}
        onChange={updateBike}
        regex={REGEX.POLISH_TEXT}
      />
      <ValidatedTextarea
        placeholder="Treść zgłoszenia"
        value={issue}
        onChange={updateIssue}
        regex={REGEX.POLISH_TEXT}
        otherProps={{ minRows: 3 }}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={
          !(
            isBikeValid &&
            isIssueValid &&
            isPhoneValid &&
            place !== '' &&
            employee !== ''
          )
        }
        onClick={mutation.mutate}
      >
        Stwórz
      </Button>
    </>
  );
}
