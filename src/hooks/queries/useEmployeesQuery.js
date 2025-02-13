import { QUERY_KEYS } from "@/util/query_keys";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../useAxiosPrivate";

export default function useEmployeesQuery() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: [QUERY_KEYS.Employees],
    queryFn: async () => {
      const response = await axiosPrivate.get("/Employees/");
      return response.data;
    },
  });
}
