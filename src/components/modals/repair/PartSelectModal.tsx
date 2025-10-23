import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import AddPartModal from '../..//modals/repair/AddPartModal';
import {
  useFilteredPartsQuery,
  usePartCategoriesQuery,
  usePartTypesQuery,
} from '../../../hooks/queryHooks';
import MaterialModal from '../../modals/MaterialModal';
import { Part, PartCategory, PartType } from '../../../types/repairTypes';
import { strFind } from '../../../util/repairsHelper';

type PartSelectModalProps = {
  mutation: (part: Part) => void;
  closeModal?: () => void;
};

const PartSelectModal = ({ mutation, closeModal }: PartSelectModalProps) => {
  const [categoryId, setCategoryId] = useState(0);
  const [typeId, setTypeId] = useState(0);
  const [text, setText] = useState('');
  // Fetch categories
  const {
    data: catData,
    isLoading: catIsLoading,
    isError: catIsError,
  } = usePartCategoriesQuery<PartCategory[]>();

  //Fetch types based on selected category
  const {
    data: typeData,
    isLoading: typeIsLoading,
    isError: typeIsError,
  } = usePartTypesQuery<PartType[]>({ id: categoryId });

  // Fetch parts based on selected part type
  const {
    data: partData,
    isLoading: partIsLoading,
    isError: partIsError,
  } = useFilteredPartsQuery<Part[]>({
    categoryId: categoryId,
    typeId: typeId,
  });

  const handleOnClick = (record: Part) => {
    mutation(record);
    setText('');
    if (closeModal) closeModal();
  };

  return (
    <div className="relative inline-block w-[1000px]">
      <div className="flex">
        {/* Category List */}
        <div className="w-3/12 pr-2 border-r border-gray-300 overflow-x-hidden *:overflow-x-hidden max-h-[500px] flex flex-col">
          <h3 className="font-semibold mb-2 text-gray-700 min-h-7">
            Kategoria
          </h3>
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
                    onClick={() => {
                      setCategoryId(category.id);
                      setTypeId(0);
                    }}
                  >
                    {category.name}
                  </li>
                ),
              )}
          </ul>
        </div>

        {/* Type List */}
        <div className="w-4/12 px-2 border-r border-gray-300 overflow-x-hidden *:overflow-x-hidden max-h-[500px] flex flex-col">
          <h3 className="font-semibold mb-2 text-gray-700 min-h-7">Typ</h3>
          <ul className="space-y-1 overflow-y-auto child-1">
            {typeIsLoading && (
              <li className="text-gray-500 text-center">Ładowanie...</li>
            )}
            {!typeIsLoading &&
              !typeIsError &&
              [{ id: 0, name: 'Wszystkie' }, ...(typeData ?? [])].map(
                (type) => (
                  <li
                    key={type.id}
                    className={`p-2 rounded-md cursor-pointer transition-all ${
                      typeId === type.id
                        ? 'bg-emerald-400 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setTypeId(type.id)}
                  >
                    {type.name}
                  </li>
                ),
              )}
          </ul>
        </div>

        {/* Part List */}
        <div className="w-5/12 pl-2 overflow-x-hidden *:overflow-x-hidden max-h-[500px] flex flex-col">
          <h3 className="font-semibold mb-2 text-gray-700 min-h-7">Część</h3>
          <input
            type="text"
            className="w-full rounded-lg p-1 border-gray-300 border"
            placeholder="Część"
            onChange={(e) => setText(e.target.value)}
          />

          <ul className="overflow-y-auto child-1">
            {partIsLoading && (
              <li className="text-gray-500 text-center">Ładowanie...</li>
            )}
            {!partIsLoading &&
              !partIsError &&
              partData!
                .filter((part) => strFind(part.name, text))
                .map((part) => (
                  <li key={part.id}>
                    <button
                      className="flex justify-between w-full p-2 rounded-md cursor-pointer hover:bg-gray-100 text-gray-700 transition-all items-center"
                      onClick={() => handleOnClick(part)}
                    >
                      <div className="border-r border-gray-300 w-full text-start">
                        {categoryId === 0 && (
                          <span className="inline text-[11px] text-gray-400 underline">
                            {part.partType?.partCategory?.name}
                          </span>
                        )}
                        {typeId === 0 && categoryId === 0 && (
                          <span className="inline text-[11px] text-gray-400">
                            {' - '}
                          </span>
                        )}
                        {typeId === 0 && (
                          <span className="inline text-[11px] text-gray-400 underline text-ellipsis">
                            {part.partType?.name}
                          </span>
                        )}
                        <span className="block">{part.name}</span>
                      </div>
                      <div className="ml-2 min-w-16 text-end">
                        {part.price.toFixed(2)}
                      </div>
                    </button>
                  </li>
                ))}
          </ul>
        </div>
      </div>
      <MaterialModal
        label={'Dodaj część'}
        button={
          <button className="absolute top-1 right-5 p-0.5 mx-2 hover:bg-gray-300 transition-colors duration-200 rounded-lg">
            <FaPlus />
          </button>
        }
      >
        <AddPartModal />
      </MaterialModal>
    </div>
  );
};

export default PartSelectModal;
