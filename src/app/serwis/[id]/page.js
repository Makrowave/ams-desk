"use client";
import Navigation from "@/components/navigation/Navigation";
import Repair from "@/components/repairs/Repair";
import PrivateRoute from "@/components/routing/PrivateRoute";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export default function RepairPage({ params }) {
  const { id } = params;
  const axiosPrivate = useAxiosPrivate();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["repairs", id],
    queryFn: async () => {
      const response = await axiosPrivate.get(`repairs/${id}`);
      return response.data;
    },
  });

  return (
    <PrivateRoute>
      <Navigation active={2} />
      <main className='overflow-x-auto'>
        <div className='main-div bg-gray-200 px-12 py-6'>{!(isPending || isError) && <Repair repair={data} />}</div>
      </main>
    </PrivateRoute>
  );
}
