"use client";
import {useState} from "react";
import {useServicesQuery} from "@/hooks/queryHooks";
import URLS, {URLKEYS} from "@/util/urls";
import AdminTable from "@/components/table/AdminTable";

export default function AdminRepairs() {
  const {
    isError: isServicesError,
    isLoading: isServicesLoading,
    data: servicesData,
    error: servicesError
  } = useServicesQuery();


  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceName, setServiceName] = useState("");

  const filteredServices = servicesData === undefined ? [] : servicesData.filter((service) => {
    return (service.serviceName.toLowerCase().includes(serviceName.toLowerCase()) || serviceName === "")
      && (service.serviceCategoryId === serviceCategory || serviceCategory === "")
  });

  const headers = ["Id", "Usługa", "Cena", "Kategoria"]
  const newRowFormat = [
    {key: "", label: "", input: "blank"},
    {key: "serviceName", label: "Nazwa", input: "text"},
    {key: "price", label: "Cena", input: "text"},
    {
      key: "serviceCategoryId",
      label: "Kategoria",
      input: "picker",
      default: "",
      pickerData: {urlKey: URLKEYS.ServiceCategories, params: {}, idKey: "id", valueKey: "name"},
    }
  ]

  return (
    <div>
      {!isServicesError && !isServicesLoading &&
        <AdminTable data={filteredServices} url={URLS.Services} noReorder headers={headers}
                    newRowFormat={newRowFormat}/>
      }
    </div>
  );
}