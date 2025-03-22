"use client";
import Navigation from "@/components/navigation/Navigation";
import Repair from "@/components/repairs/Repair";
import PrivateRoute from "@/components/routing/PrivateRoute";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/util/query_keys";

export default function RepairPage({params}) {
  const {id} = params;
  const axiosPrivate = useAxiosPrivate();
  const {data, isPending, isError, error} = useQuery({
    queryKey: [QUERY_KEYS.Repairs, Number(id)],
    queryFn: async () => {
      const response = await axiosPrivate.get(`repairs/${id}`);
      return response.data;
    },
  });

  return (
    <PrivateRoute>
      <Navigation active={2}/>
      <main className='h-[calc(100vh - 48px)] overflow-y-auto'>
        <div className='w-full h-fit overflow-y-hidden'>
        <div className='main-div bg-gray-200 px-12 py-6 h-full overflow-hidden'>
          {!(isPending || isError) && <Repair repair={data}/>}
        </div>
        </div>
      </main>
    </PrivateRoute>
  );
}
