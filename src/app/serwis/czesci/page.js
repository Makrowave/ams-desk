"use client"
import AddPartModal from "@/components/modals/repair/AddPartModal";
import {FaCircleXmark, FaPencil, FaPlus} from "react-icons/fa6";
import PrivateRoute from "@/components/routing/PrivateRoute";
import Navigation from "@/components/navigation/Navigation";
import SideBar from "@/components/navigation/SideBar";
import {repairsNavigation} from "@/app/serwis/page";
import Modal from "@/components/modals/Modal";
import {useState} from "react";
import useModal from "@/hooks/useModal";
import DeleteModal from "@/components/modals/DeleteModal";
import ModifyPartModal from "@/components/modals/repair/ModifyPartModal";
import URLS from "@/util/urls";
import {useFilteredPartsQuery, usePartCategoriesQuery, usePartTypesQuery} from "@/hooks/queryHooks";


export default function PartRepairsPage() {
  const [categoryId, setCategoryId] = useState(0);
  const [typeId, setTypeId] = useState(0);
  const [text, setText] = useState("");
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal()
  // Fetch categories
  const {data: catData, isLoading: catIsLoading, isError: catIsError} = usePartCategoriesQuery();

  // Fetch parts based on selected part type
  const {data: partData, isLoading: partIsLoading, isError: partIsError} = useFilteredPartsQuery({
    categoryId: categoryId,
    typeId: typeId
  });

  //Fetch types based on selected category
  const {data: typeData, isLoading: typeIsLoading, isError: typeIsError} = usePartTypesQuery({id: categoryId});

  return (
    <PrivateRoute>
      <Navigation active={2}/>
      <main className='overflow-y-hidden'>
        <SideBar baseUrl={"/serwis"} links={repairsNavigation}/>
        <div className='flex flex-col m-auto overflow-y-auto h-full px-12 py-6 items-center space-y-10'>
          <div className='h-full sm:pb-10 2xl:pb-0 2xl:mr-10'>
            <h2 className='text-3xl'>Części</h2>
            <div className="bg-white rounded-lg shadow-xl w-fit p-4 z-50 border border-gray-200 relative">
              <div className="flex">
                {/* Category List */}
                <div
                  className="w-1/5 pr-2 border-r border-gray-300 overflow-x-hidden *:overflow-x-hidden max-h-[500px] flex flex-col">
                  <h3 className="font-semibold mb-2 text-gray-700 min-h-7">Kategoria</h3>
                  <ul className="space-y-1 overflow-y-auto child-1">
                    {catIsLoading && <li className="text-gray-500 text-center">Ładowanie...</li>}
                    {!catIsLoading &&
                      !catIsError &&
                      [{id: 0, name: "Wszystkie"}, ...catData].map((category) => (
                        <li
                          key={category.id}
                          className={`p-2 rounded-md cursor-pointer transition-all ${
                            categoryId === category.id
                              ? "bg-blue-500 text-white"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                          onClick={() => {
                            setCategoryId(category.id);
                            setTypeId(0)
                          }}
                        >
                          {category.name}
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Type List */}
                <div
                  className="w-2/5 px-2 border-r border-gray-300 overflow-x-hidden *:overflow-x-hidden max-h-[500px] flex flex-col">
                  <h3 className="font-semibold mb-2 text-gray-700 min-h-7">Typ</h3>
                  <ul className="space-y-1 overflow-y-auto child-1">
                    {typeIsLoading && <li className="text-gray-500 text-center">Ładowanie...</li>}
                    {!typeIsLoading &&
                      !typeIsError &&
                      [{id: 0, name: "Wszystkie"}, ...typeData].map((type) => (
                        <li
                          key={type.id}
                          className={`p-2 rounded-md cursor-pointer transition-all ${
                            typeId === type.id
                              ? "bg-emerald-400 text-white"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                          onClick={() => setTypeId(type.id)}
                        >
                          {type.name}
                        </li>
                      ))}
                  </ul>
                </div>


                {/* Part List */}
                <div
                  className="min-w-[400px] pl-2 overflow-x-hidden *:overflow-x-hidden flex flex-col">
                  <h3 className="font-semibold mb-2 text-gray-700 min-h-7">Część</h3>
                  <input type="text" className="w-full rounded-lg p-1 border-gray-300 border"
                         placeholder="Część"
                         onChange={(e) => setText(e.target.value)}
                  />
                  <div className="max-h-[430px]">
                    <table className="overflow-y-auto child-1">
                      <thead className="sticky top-0 bg-white pb-2">
                      <tr>
                        <th>Część</th>
                        <th>Cena</th>
                        <th>Jedn.</th>
                        <th></th>
                      </tr>
                      </thead>
                      <tbody>
                      {partIsLoading && <tr className="text-gray-500 text-center">
                        <td>
                          Ładowanie...
                        </td>
                      </tr>}
                      {!partIsLoading &&
                        !partIsError &&
                        partData.filter(part => (strFind(part.partName, text)))
                          .map((part) => (
                            <tr key={part.partId}>
                              <td>
                                {categoryId === 0 &&
                                  <span className="inline text-[11px] text-gray-400 underline">
                                  {part.partType.partCategory.partCategoryName}
                                </span>
                                }
                                {
                                  typeId === 0 && categoryId === 0 &&
                                  <span className="inline text-[11px] text-gray-400">
                                  {" - "}
                                </span>
                                }
                                {typeId === 0 &&
                                  <span className="inline text-[11px] text-gray-400 underline text-ellipsis">
                                  {part.partType.partTypeName}
                                </span>
                                }
                                <span className="block">
                                {part.partName}
                              </span>
                              </td>
                              <td className="text-center">
                                {part.price.toFixed(2)}
                              </td>
                              <td className="text-center">
                                {part.unit.unitName}
                              </td>
                              <td>
                                <div className={"flex *:mx-1"}>
                                  <button className='button-primary w-10 h-10' onClick={() => {
                                    setModalTitle("Edytuj część");
                                    setModalContent(<ModifyPartModal part={part}/>)
                                    setIsModalOpen(true);
                                  }}>
                                    <FaPencil/>
                                  </button>
                                  <button className='button-primary w-10 h-10' onClick={() => {
                                    setModalTitle("Usuń część");
                                    setModalContent(<DeleteModal id={part.partId} refetchQueryKey={URLS.Parts}
                                                                 url={URLS.Parts}/>)
                                    setIsModalOpen(true);
                                  }}>
                                    <FaCircleXmark className="text-red-600"/>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <button
                className='absolute top-1 right-1 p-0.5 mx-2 hover:bg-gray-300 transition-colors duration-200 rounded-lg'
                onClick={() => {
                  setModalContent(<AddPartModal/>);
                  setModalTitle("Dodaj część");
                  setIsModalOpen(true);
                }}
              >
                <FaPlus/>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Modal/>
    </PrivateRoute>
  );
}

const strFind = (where, what) => {
  if (typeof where !== "string" || typeof what !== "string") return false;
  if (what === "") return true;
  where = where.toLocaleLowerCase();
  where = where
    .split("")
    .map((c) => polishDict[c] ?? c)
    .join("");
  what = what.toLocaleLowerCase();
  what = what
    .split("")
    .map((c) => polishDict[c] ?? c)
    .join("");

  return where.includes(what);
};

const polishDict = {
  ż: "z",
  ź: "z",
  ę: "e",
  ó: "o",
  ą: "a",
  ś: "s",
  ł: "l",
  ć: "c",
  ń: "n",
};