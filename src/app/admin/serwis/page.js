"use client";
import Modal from "@/components/modals/Modal";
import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/util/query_keys";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {FaPenToSquare, FaPlus, FaRegCircleXmark} from "react-icons/fa6";
import FetchSelect from "@/components/filtering/FetchSelect";
import {useState} from "react";
import useModal from "@/hooks/useModal";
import AddServiceModal from "@/components/modals/repair/AddServiceModal";
import DeleteModal from "@/components/modals/DeleteModal";
import ModifyServiceModal from "@/components/modals/repair/ModifyServiceModal";

export default function AdminRepairs() {
  const axiosPrivate = useAxiosPrivate();
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
  const {
    isError: isServicesError,
    isLoading: isServicesLoading,
    data: servicesData,
    error: servicesError
  } = useQuery({
    queryKey: [QUERY_KEYS.Services], queryFn: async () => {
      const result = await axiosPrivate.get("/services");
      return result.data;
    }
  });


  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceName, setServiceName] = useState("");

  const filteredServices = servicesData === undefined ? [] : servicesData.filter((service) => {
    return (service.serviceName.toLowerCase().includes(serviceName.toLowerCase()) || serviceName === "")
      && (service.serviceCategoryId === serviceCategory || serviceCategory === "")
  });


  return (
    <>
      <div className='sm:flex-col w-full items-center 2xl:flex-row main-div bg-primary px-16 py-4'>
        <div className='m-auto w-[800px] h-full'>
          <h2 className='text-3xl'>Usługi</h2>
          <div className='overflow-y-auto max-h-[600px] w-full'>
            <table
              className='w-full border-separate border-spacing-0 border rounded-b-lg rounded-t-lg *:*:*:p-3'>
              <thead className="rounded-t-lg sticky top-0">
              <tr className="rounded-t-lg *:bg-secondary">
                <th className="rounded-tl-lg"></th>
                <th><input className='border-border border rounded-lg w-32 text-center'
                           placeholder="Usługa"
                           value={serviceName} onChange={e => setServiceName(e.target.value)}/></th>
                <th></th>
                <th className="w-48 text-ellipsis">
                  <FetchSelect
                    src="/Services/categories"
                    queryKey={QUERY_KEYS.ServiceCategories}
                    value={serviceCategory}
                    onChange={setServiceCategory}
                    default_option={""}
                    default_title={"Dowolna"}
                  /></th>
                <th className="rounded-tr-lg">
                  <div className="flex w-full justify-end">
                    <button className="p-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            onClick={() => {
                              setModalTitle("Dodaj usługę")
                              setModalContent(<AddServiceModal/>)
                              setIsModalOpen(true);
                            }}>
                      <FaPlus/>
                    </button>
                  </div>
                </th>
              </tr>
              <tr className="*:bg-secondary">
                <th>Id</th>
                <th>Usługa</th>
                <th>Cena</th>
                <th>Kategoria</th>
                <th>
                </th>
              </tr>
              </thead>
              <tbody>
              {
                !isServicesError && !isServicesLoading && filteredServices.map(service =>
                  <tr className='*:even:bg-secondary *:border-b-border *:border-b  *:last:border-b-0 *:text-center'>
                    <td className="text-center">{service.serviceId}</td>
                    <td>{service.serviceName}</td>
                    <td className="text-right">{service.price}</td>
                    <td className="text-center">{service.serviceCategory.serviceCategoryName}</td>
                    <td>
                      <div className="flex flex-nowrap">
                        <button className="mr-4 hover:bg-gray-400 p-2 rounded-lg" onClick={() => {
                          setModalTitle("Edytuj usługę")
                          setModalContent(<ModifyServiceModal service={service}/>)
                          setIsModalOpen(true);
                        }}>
                          <FaPenToSquare/>
                        </button>
                        <button className="text-red-600 hover:bg-gray-400 p-2 rounded-lg"
                                onClick={() => {
                                  setModalTitle("Usuń usługę")
                                  setModalContent(<DeleteModal id={service.serviceId}
                                                               refetchQueryKey={QUERY_KEYS.Services}
                                                               admin
                                                               url="services/"/>)
                                  setIsModalOpen(true);
                                }}>
                          <FaRegCircleXmark/>
                        </button>
                      </div>
                    </td>
                  </tr>)
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal/>
    </>
  );
}