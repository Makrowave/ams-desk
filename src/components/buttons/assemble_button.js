import useAxiosPrivate from "@/hooks/use_axios_private";
import { useMutation } from "@tanstack/react-query";

export default function AssembleButton({bikeId, refetch, className}) {
  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async (bikeId) => {
      return await axiosPrivate.put('/Desktop/Assemble/' + bikeId)
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