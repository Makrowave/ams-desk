import {useEffect, useRef, useState} from "react";
import {FaPlus, FaXmark} from "react-icons/fa6";
import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/util/query_keys";
import {axiosPrivate} from "@/api/axios";
import AddPartModal from "@/components/modals/repair/AddPartModal";
import useModal from "@/hooks/useModal";

export default function PartSelect({mutation}) {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [typeId, setTypeId] = useState(0);
  const boxRef = useRef(null);
  const buttonRef = useRef(null);
  const [text, setText] = useState("");
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal()
  // Fetch categories
  const {data: catData, isLoading: catIsLoading, isError: catIsError} = useQuery({
    queryKey: [QUERY_KEYS.PartCategories],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/partTypes/categories`);
      return response.data;
    },
  });

  // Fetch parts based on selected part type
  const {data: partData, isLoading: partIsLoading, isError: partIsError} = useQuery({
    queryKey: [QUERY_KEYS.Parts, categoryId, typeId],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/parts/filtered?categoryId=${categoryId}&typeId=${typeId}`);
      return response.data;
    },
  });

  //Fetch types based on selected category
  const {data: typeData, isLoading: typeIsLoading, isError: typeIsError} = useQuery({
    queryKey: [QUERY_KEYS.PartTypes, "category", categoryId],
    queryFn: async () => {
      const response = await axiosPrivate.get(
        `/partTypes/${categoryId}`
      );
      return response.data;
    },
  });

  const handleOnClick = (record) => {
    mutation(record);
    setText("");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (boxRef.current
        && !boxRef.current.contains(event.target)
        && buttonRef.current
        && !buttonRef.current.contains(event.target)

      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [boxRef.current, buttonRef.current]);

  return (
    <div className="relative inline-block">
      {/* Add Button */}
      <button
        ref={buttonRef}
        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow-md transition-all"
        onClick={() => setIsOpen(true)}
      >
        <FaPlus className="text-lg"/>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={boxRef}
          className="absolute top-0 right-0 bg-white rounded-lg shadow-xl w-[600px] p-4 z-50 border border-gray-200"
        >
          <div className="flex">
            {/* Category List */}
            <div className="w-1/5 pr-2 border-r border-gray-300 overflow-x-hidden *:overflow-x-hidden">
              <h3 className="text-sm font-semibold mb-2 text-gray-700">Kategoria</h3>
              <ul className="space-y-1 max-h-60 overflow-y-auto">
                {catIsLoading && <li className="text-gray-500 text-sm text-center">Ładowanie...</li>}
                {!catIsLoading &&
                  !catIsError &&
                  [{id: 0, name: "Wszystkie"}, ...catData].map((category) => (
                    <li
                      key={category.id}
                      className={`p-2 rounded-md text-sm cursor-pointer transition-all ${
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
            <div className="w-2/5 px-2 border-r border-gray-300 overflow-x-hidden *:overflow-x-hidden">
              <h3 className="text-sm font-semibold mb-2 text-gray-700">Typ</h3>
              <ul className="space-y-1 max-h-60 overflow-y-auto">
                {typeIsLoading && <li className="text-gray-500 text-sm text-center">Ładowanie...</li>}
                {!typeIsLoading &&
                  !typeIsError &&
                  [{id: 0, name: "Wszystkie"}, ...typeData].map((type) => (
                    <li
                      key={type.id}
                      className={`p-2 rounded-md text-sm cursor-pointer transition-all ${
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


            {/* Part type List */}
            <div className="w-2/5 pl-2 overflow-x-hidden *:overflow-x-hidden">
              <h3 className="text-sm font-semibold mb-2 text-gray-700">Część</h3>
              <input type="text" className="w-full rounded-lg p-1 text-sm border-gray-300 border" placeholder="Usługa"
                     onChange={(e) => setText(e.target.value)}
              />
              <div className="max-h-60 overflow-y-auto">
                <ul>
                  {partIsLoading && <li className="text-gray-500 text-sm text-center">
                    Ładowanie...
                  </li>}
                  {!partIsLoading &&
                    !partIsError &&
                    partData.filter(part => (strFind(part.partName, text)))
                      .map((part) => (
                        <li key={part.partId}>
                          <button
                            className="flex justify-between w-full p-2 rounded-md text-sm cursor-pointer hover:bg-gray-100 text-gray-700 transition-all items-center"
                            onClick={() => handleOnClick(part)}
                          >
                            <div className="border-r border-gray-300 w-full text-start">
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
                            </div>
                            <div className="ml-2 min-w-6 text-end">
                              {part.price}
                            </div>
                          </button>
                        </li>
                      ))}
                </ul>
              </div>
            </div>
          </div>
          <button
            className='absolute top-1 right-5 p-0.5 mx-2 hover:bg-gray-300 transition-colors duration-200 rounded-lg'
            onClick={() => {
              setModalContent(<AddPartModal/>);
              setModalTitle("Dodaj część");
              setIsModalOpen(true);
            }}
          >
            <FaPlus/>
          </button>
          <button className="p-0.5 rounded-lg hover:bg-gray-300 absolute top-1 right-1"
                  onClick={() => setIsOpen(false)}>
            <FaXmark/>
          </button>
        </div>
      )}
    </div>
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