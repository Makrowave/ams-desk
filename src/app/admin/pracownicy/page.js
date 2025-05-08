"use client";
import LogoutModal from "@/components/modals/admin/LogoutModal";
import UserModal from "@/components/modals/admin/UserModal";
import AccountTable from "@/components/table/account/AccountTable";
import useModal from "@/hooks/useModal";
import AdminTable from "@/components/table/AdminTable";
import {useEmployeesQuery} from "@/hooks/queryHooks";
import URLS from "@/util/urls";

export default function EmployeesPanel() {
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
  const {data: employeeData, error: isEmployeeError, isLoading: isEmployeeLoading} = useEmployeesQuery()
  const employeeRowFormat = [
    {key: "", label: "Id", input: "blank"},
    {key: "employeeName", label: "Pracownik", input: "text"}
  ]
  const employeeHeaders = ["Id", "Pracownik"]
  return (
    <>
      <div className='flex-row main-div bg-primary px-16 py-4'>
        {!isEmployeeLoading && !isEmployeeError &&
          <AdminTable newRowFormat={employeeRowFormat} headers={employeeHeaders} data={employeeData}
                      url={URLS.Employees}/>
        }
        <div className='w-7/12 min-w-[600px] ml-auto'>
          <h2 className='text-3xl'>Konta</h2>
          <div className='overflow-y-auto max-h-[600px] w-full'>
            <AccountTable/>
          </div>
          <div className='mt-4'>
            <button
              className='button-secondary mr-4'
              onClick={() => {
                setIsModalOpen(true);
                setModalContent(<UserModal action='post'/>);
                setModalTitle("Utwórz konto");
              }}
            >
              Dodaj
            </button>
            <button
              className='button-secondary mr-4'
              onClick={() => {
                setModalContent(<LogoutModal/>);
                setModalTitle("Wyloguj wszystkich");
                setIsModalOpen(true);
              }}
            >
              Wyloguj wszystkich
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
