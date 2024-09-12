import { useMutation } from "@tanstack/react-query";

export default function AssembleButton({bikeId, refetch, className}) {
  const mutation = useMutation({
    mutationFn: async (bikeId) => {
      return await fetch("https://localhost:7077/api/Desktop/Assemble/" + bikeId, {
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
    <button className={className} onClick={() => handleClick()}>Złóż</button>
  )
}