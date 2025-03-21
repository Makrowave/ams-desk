"use client";
import Modal from "@/components/modals/Modal";
import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/util/query_keys";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {FaPenToSquare, FaPlus, FaRegCircleXmark} from "react-icons/fa6";
import FetchSelect from "@/components/filtering/FetchSelect";
import {useState} from "react";
import useModal from "@/hooks/useModal";
import AddPartModal from "@/components/modals/repair/AddPartModal";
import AddServiceModal from "@/components/modals/repair/AddServiceModal";
import DeleteModal from "@/components/modals/DeleteModal";
import ModifyPartModal from "@/components/modals/repair/ModifyPartModal";
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

  const {
    isError: isPartsError,
    isLoading: isPartsLoading,
    data: partsData,
    error: partsError
  } = useQuery({
    queryKey: [QUERY_KEYS.Parts], queryFn: async () => {
      const result = await axiosPrivate.get("/parts");
      return result.data;
    }
  });

  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [partCategory, setPartCategory] = useState("");
  const [partName, setPartName] = useState("");

  const filteredServices = servicesData === undefined ? [] : servicesData.filter((service) => {
    return (service.serviceName.toLowerCase().includes(serviceName.toLowerCase()) || serviceName === "")
      && (service.serviceCategoryId === serviceCategory || serviceCategory === "")
  });

  const filteredParts = partsData === undefined ? [] : partsData.filter((part) => {
    return (part.partName.toLowerCase().includes(partName.toLowerCase()) || partName === "")
      && (part.partCategoryId === partCategory || partCategory === "")
  });


  return (
    <>
      <div className='sm:flex-col w-full items-center 2xl:flex-row main-div bg-primary px-16 py-4'>
        <div className='h-full w-[800px] sm:pb-10 2xl:pb-0 2xl:mr-10'>
          <h2 className='text-3xl'>Części</h2>
          <div className='overflow-y-auto max-h-[600px] w-full'>
            <table
              className='w-full border-separate border-spacing-0 border rounded-b-lg rounded-t-lg *:*:*:p-3'>
              <thead className="rounded-t-lg">
              <tr className="rounded-t-lg *:bg-secondary">
                <th className="rounded-tl-lg"></th>
                <th><input className='border-border border rounded-lg w-32 text-center' value={partName}
                           placeholder="Część"
                           onChange={e => setPartName(e.target.value)}/></th>
                <th></th>
                <th className="w-48 text-ellipsis">
                  <FetchSelect
                    src="/Services/categories"
                    queryKey={QUERY_KEYS.PartCategories}
                    value={partCategory}
                    onChange={setPartCategory}
                    default_option={""}
                    default_title={"Dowolna"}
                  /></th>
                <th></th>
                <th className="rounded-tr-lg">
                  <div className="flex w-full justify-end">
                    <button className="p-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            onClick={() => {
                              setModalTitle("Dodaj część")
                              setModalContent(<AddPartModal/>)
                              setIsModalOpen(true);
                            }}>
                      <FaPlus/>
                    </button>
                  </div>
                </th>
              </tr>
              <tr className="*:bg-secondary">
                <th>Id</th>
                <th>Część</th>
                <th>Cena</th>
                <th>Kategoria</th>
                <th>Jedn.</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {
                !isPartsError && !isPartsLoading && filteredParts.map(part =>
                  <tr className='*:even:bg-secondary *:border-b-border *:border-b  *:last:border-b-0 *:text-center'>
                    <td>{part.partId}</td>
                    <td>{part.partName}</td>
                    <td>{part.price}</td>
                    <td>{part.partCategory.partCategoryName}</td>
                    <td>{part.unit.unitName}</td>
                    <td>
                      <div className="flex flex-nowrap">
                        <button className="mr-4 hover:bg-gray-400 p-2 rounded-lg" onClick={() => {
                          setModalTitle("Edytuj część")
                          setModalContent(<ModifyPartModal part={part}/>)
                          setIsModalOpen(true);
                        }}>
                          <FaPenToSquare/>
                        </button>
                        <button className="text-red-600 hover:bg-gray-400 p-2 rounded-lg"
                                onClick={() => {
                                  setModalTitle("Usuń usługę")
                                  setModalContent(<DeleteModal id={part.partId}
                                                               refetchQueryKey={QUERY_KEYS.Parts}
                                                               admin
                                                               url="parts/"/>)
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