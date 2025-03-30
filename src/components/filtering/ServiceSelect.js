import {useEffect, useRef, useState} from "react";
import {FaPlus, FaXmark} from "react-icons/fa6";
import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/util/query_keys";
import {axiosPrivate} from "@/api/axios";

export default function ServiceSelect({mutation}) {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const boxRef = useRef(null);
  const buttonRef = useRef(null);
  const [text, setText] = useState("");
  // Fetch categories
  const {data: catData, isLoading: catIsLoading, isError: catIsError} = useQuery({
    queryKey: [QUERY_KEYS.ServiceCategories],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/services/categories`);
      return response.data;
    },
  });

  // Fetch services based on selected category
  const {data: serData, isLoading: serIsLoading, isError: serIsError} = useQuery({
    queryKey: [QUERY_KEYS.Services, "category", categoryId],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/services/fromCategory/${categoryId}`);
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
        // setIsOpen(false);
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
        <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.6)] transpa rounded-lg z-40">
          <div
            ref={boxRef}
            className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2  bg-white rounded-lg shadow-xl w-[600px] p-4 z-50 border border-gray-200"
          >
            <div className="flex">
              {/* Category List */}
              <div
                className="w-1/3 pr-2 border-r border-gray-300 overflow-hidden *:overflow-x-hidden max-h-[500px] flex flex-col">
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
                        onClick={() => setCategoryId(category.id)}
                      >
                        {category.name}
                      </li>
                    ))}
                </ul>
              </div>

              {/* Services List */}
              <div className="w-2/3 pl-2 overflow-x-hidden *:overflow-x-hidden max-h-[500px] flex flex-col">
                <h3 className="font-semibold mb-2 text-gray-700 min-h-7">Usługa</h3>
                <input type="text" className="w-full rounded-lg p-1 border-gray-300 border" placeholder="Usługa"
                       onChange={(e) => setText(e.target.value)}
                />
                <ul className="overflow-y-auto">
                  {serIsLoading && <li className="text-gray-500 text-center">
                    Ładowanie...
                  </li>}
                  {!serIsLoading &&
                    !serIsError &&
                    serData.filter(service => (strFind(service.serviceName, text)))
                      .map((service) => (
                        <li key={service.serviceId}>
                          <button
                            className="flex justify-between w-full p-2 rounded-md cursor-pointer hover:bg-gray-100 text-gray-700 transition-all items-center"
                            onClick={() => handleOnClick(service)}
                          >
                            <div className="border-r border-gray-300 w-full text-start">
                              {categoryId === 0 && <span className="block text-[11px] text-gray-400 underline">
                                {service.serviceCategory.serviceCategoryName}
                              </span>}
                              {service.serviceName}
                            </div>
                            <div className="ml-2 min-w-10 text-end">{service.price}</div>
                          </button>
                        </li>
                      ))}
                </ul>
              </div>
            </div>
            <button className="p-0.5 rounded-lg hover:bg-gray-300 absolute top-1 right-1"
                    onClick={() => setIsOpen(false)}>
              <FaXmark/>
            </button>
          </div>
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