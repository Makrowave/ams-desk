import { useMutation } from "@tanstack/react-query";

export default function DeleteModal({ refetch, bikeId}) {


  const mutation = useMutation({
    mutationFn: async () => {
      return await fetch("https://localhost:7077/api/Bikes/" + bikeId, {
        method: "DELETE"
      })
    },
    onSuccess: refetch()
  })


  return (
    <div>
      <div>
        <h2>Czy na pewno?</h2> <br />
        <span>Jeśli chcesz zdjąć rower ze stanu po sprzedaży użyj opcji sprzedaj.</span><br />
        <span>Ta opcja powinna zostać użyta w przypadku przypadkowego dodania roweru.</span> <br />
        <span>Jeśli rower został dodany ze złym statusem lub w złym miejscu - użyj innej opcji, żeby to poprawić</span>
      </div>
      <button onClick={() => { mutation.mutate() }}>Usuń</button>
    </div>
  )
}