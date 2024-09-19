import axios from "@/api/axios";
import { useMutation } from "@tanstack/react-query";

export default function AssembleButton({bikeId, refetch, className}) {
  const mutation = useMutation({
    mutationFn: async (bikeId) => {
      return await axios.put('/Desktop/Assemble/' + bikeId)
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