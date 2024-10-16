import useAxiosPrivate from "@/hooks/use_axios_private";
import { useMutation } from "@tanstack/react-query";

export default function DeleteModal({ refetch, bikeId}) {

  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.delete("/Bikes/" + bikeId)
    },
    onSuccess: refetch()
  })


  return (
    <div className='flex flex-col justify-between flex-grow'>
      <div className="w-96">
        <h2>Czy na pewno?</h2> <br />
        <p className="indent-8">Jeśli chcesz zdjąć rower ze stanu po sprzedaży użyj opcji sprzedaj.</p>
        <p className="indent-8">Ta opcja powinna zostać użyta w przypadku przypadkowego dodania roweru.</p>
        <p className="indent-8">Jeśli rower został dodany ze złym statusem lub w złym miejscu - użyj innej opcji, żeby to poprawić</p>
      </div>
      <button 
        className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 self-center my-4 hover:bg-tertiary'
        onClick={() => { mutation.mutate() }}>
        Usuń</button>
    </div>
  )
}