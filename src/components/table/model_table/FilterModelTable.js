import {useState} from "react";
import Filters, {defaultFilters} from "./Filters";
import ModelTable from "./ModelTable";

export default function FilterModelTable() {
  const [query, setQuery] = useState(defaultFilters);
  return (
    <div className='main-div'>
      <div className='flex-1 grid grid-cols-6 py-5 rounded-b-xl overflow-hidden flex-col'>
        <Filters setQuery={setQuery}/>
        <ModelTable filters={query}/>
      </div>
    </div>
  );
}