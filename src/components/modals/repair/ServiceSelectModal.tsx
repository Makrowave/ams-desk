import { useState } from 'react';
import {
  useServiceCategoriesQuery,
  useServicesFromCategoryQuery,
} from '../../../hooks/queryHooks';
import { Service, ServiceCategory } from '../../../types/repairTypes';
import { strFind } from '../../../util/repairsHelper';

type ServiceSelectModalProps = {
  mutation: (service: Service) => void;
  closeModal?: () => void;
};

const ServiceSelectModal = ({
  mutation,
  closeModal,
}: ServiceSelectModalProps) => {
  const [categoryId, setCategoryId] = useState(0);
  const [text, setText] = useState('');
  // Fetch categories
  const {
    data: catData,
    isLoading: catIsLoading,
    isError: catIsError,
  } = useServiceCategoriesQuery<ServiceCategory[]>();

  // Fetch services based on selected category
  const {
    data: serData,
    isLoading: serIsLoading,
    isError: serIsError,
  } = useServicesFromCategoryQuery<Service[]>({ id: categoryId });

  const handleOnClick = (record: Service) => {
    mutation(record);
    setText('');
    if (closeModal) closeModal();
  };

  return (
    <div className="flex w-[1000px]">
      {/* Category List */}
      <div className="w-1/3 pr-2 border-r border-gray-300 overflow-hidden *:overflow-x-hidden max-h-[500px] flex flex-col">
        <h3 className="font-semibold mb-2 text-gray-700 min-h-7">Kategoria</h3>
        <ul className="space-y-1 overflow-y-auto child-1">
          {catIsLoading && (
            <li className="text-gray-500 text-center">Ładowanie...</li>
          )}
          {!catIsLoading &&
            !catIsError &&
            [{ id: 0, name: 'Wszystkie' }, ...(catData ?? [])].map(
              (category) => (
                <li
                  key={category.id}
                  className={`p-2 rounded-md cursor-pointer transition-all ${
                    categoryId === category.id
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setCategoryId(category.id)}
                >
                  {category.name}
                </li>
              ),
            )}
        </ul>
      </div>

      {/* Services List */}
      <div className="w-2/3 pl-2 overflow-x-hidden *:overflow-x-hidden max-h-[500px] flex flex-col">
        <h3 className="font-semibold mb-2 text-gray-700 min-h-7">Usługa</h3>
        <input
          type="text"
          className="w-full rounded-lg p-1 border-gray-300 border"
          placeholder="Usługa"
          onChange={(e) => setText(e.target.value)}
        />
        <ul className="overflow-y-auto">
          {serIsLoading && (
            <li className="text-gray-500 text-center">Ładowanie...</li>
          )}
          {!serIsLoading &&
            !serIsError &&
            serData!
              .filter((service) => strFind(service.name, text))
              .map((service) => (
                <li key={service.id}>
                  <button
                    className="flex justify-between w-full p-2 rounded-md cursor-pointer hover:bg-gray-100 text-gray-700 transition-all items-center"
                    onClick={() => handleOnClick(service)}
                  >
                    <div className="border-r border-gray-300 w-full text-start">
                      {categoryId === 0 && (
                        <span className="block text-[11px] text-gray-400 underline">
                          {service.serviceCategory?.name}
                        </span>
                      )}
                      {service.name}
                    </div>
                    <div className="ml-2 min-w-10 text-end">
                      {service.price}
                    </div>
                  </button>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceSelectModal;
