import { useMutation } from "@tanstack/react-query";

export default function AssembleButton({bikeId, refetch}) {
  const mutation = useMutation({
    mutationFn: async (bikeId) => {
      return await fetch("https://localhost:7077/api/Desktop/assemble/" + bikeId, {
        method: "PUT"
      })
    },
    onSuccess: refetch()
  })
  //Add response

  const handleClick =  () => {
    mutation.mutate(bikeId);
  }

  return (
    <button onClick={() => handleClick()}>Złóż</button>
  )
}