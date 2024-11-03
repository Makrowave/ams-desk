import { useState } from "react";
import ChangeTable from "@/components/filtering/change_table";
import TableHeader from "@/components/table/table_header";
import TableBody from "@/components/table/table_body";

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
export default function ModelTable({ filterSrc }) {
  const [place, setPlace] = useState(0);
  /**
   * Sorting critetion object.
   * name (string) - criterion's name used to identify criterion.
   * isAscending (boolean) - should the data be sorted ascending (true) or descending (false).
   * key (number) - used for criterion "amount". It specifies by what place's amount sort.
   *  Should be a valid placeId
   */
  const [criterion, setCriterion] = useState({ name: "name", isAscending: true, key: null });
  let src = "/Models?placeId=" + place.toString();

  return (
    <div className='col-span-5 flex justify-center mx-4 border-l-2 pl-5 border-tertiary overflow-hidden h-full max-w-full'>
      <div className='flex flex-col w-full h-full overflow-hidden'>
        <ChangeTable changePlaceId={(index) => setPlace(index)} />
        <div className='overflow-y-auto flex-1 h-0'>
          <table className='table-fixed min-w-full text-center border-separate border-spacing-0 shadow-lg'>
            <TableHeader singlePlace={place !== 0} setCriterion={setCriterion} />
            <TableBody singlePlace={place !== 0} placeId={place} src={src + filterSrc} sortCriterion={criterion} />
          </table>
          <div className='min-h-4'></div>
        </div>
      </div>
    </div>
  );
}
