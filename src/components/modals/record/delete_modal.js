import useAxiosPrivate from "@/hooks/use_axios_private";
import useModal from "@/hooks/use_modal";
import { useMutation } from "@tanstack/react-query";

export default function DeleteModal({ refetch, bikeId }) {
  const axiosPrivate = useAxiosPrivate();
  const { setIsOpen } = useModal();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.delete("/Bikes/" + bikeId);
    },
    onSuccess: (data) => {
      if (data) {
        setIsOpen(false);
        refetch();
      }
    },
  });

  return (
    <div className='flex flex-col justify-between flex-grow w-72 mx-auto'>
      <div className='w-full *:py-2'>
        <h2>
          <b>Czy na pewno?</b>
        </h2>
        <p>Jeśli chcesz zdjąć rower ze stanu po sprzedaży użyj opcji sprzedaj.</p>
        <p>Ta opcja powinna zostać użyta w przypadku przypadkowego dodania roweru.</p>
        <p>Jeśli rower został dodany ze złym statusem lub w złym miejscu - użyj innej opcji, żeby to poprawić</p>
      </div>
      <button
        className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 self-center my-4 hover:bg-tertiary'
        onClick={() => {
          mutation.mutate();
        }}
      >
        Usuń
      </button>
    </div>
  );
}
