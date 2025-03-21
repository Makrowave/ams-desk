import {useState} from "react";
import ModelTablePlaceSelector from "@/components/filtering/ModelTablePlaceSelector";
import ModelTableHeader from "./ModelTableHeader";
import ModelTableBody from "./ModelTableBody";

/**
 * Table containing expandable rows with sortable bikes' data.
 * For sorting data refer to TableHeader for setting criterion and to
 * TableBody for predicates.
 * For chaning places refer to ChangeTable component (in filtering).
 * For records refer to TableBody component.
 * @param {Object} props - Props
 * @param {string} props.filterSrc -  Query part of URL starting with '&' and having all params
 *  used to filter
 * @returns
 */
export default function ModelTable({filterSrc}) {
  const [place, setPlace] = useState(0);
  /**
   * Sorting critetion object.
   * name (string) - criterion's name used to identify criterion.
   * isAscending (boolean) - should the data be sorted ascending (true) or descending (false).
   * key (number) - used for criterion "amount". It specifies by what place's amount sort.
   *  Should be a valid placeId
   */
  const [criterion, setCriterion] = useState({name: "name", isAscending: true, key: null});
  let src = "/Models?placeId=" + place.toString();

  return (
    <div className='col-span-5 flex justify-center mx-4 overflow-hidden max-w-full bg-primary p-8 rounded-xl'>
      <div className='flex flex-col w-full overflow-hidden'>
        <ModelTablePlaceSelector changePlaceId={(index) => setPlace(index)}/>
        <div className='overflow-y-auto flex-1 h-0 bg-secondary rounded-b-lg rounded-tr-lg'>
          <table className='table min-w-full'>
            <ModelTableHeader singlePlace={place !== 0} setCriterion={setCriterion}/>
            <ModelTableBody singlePlace={place !== 0} placeId={place} src={src + filterSrc} sortCriterion={criterion}/>
          </table>
        </div>
      </div>
    </div>
  );
}
