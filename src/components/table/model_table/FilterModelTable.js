import { useState } from "react";
import Filters from "./Filters";
import ModelTable from "./ModelTable";

export default function FitlerModelTable() {
  const [query, setQuery] = useState();
  return (
    <div className='main-div'>
      <div className='flex-1 grid grid-cols-6 py-5 rounded-b-xl overflow-hidden flex-col'>
        <Filters setQuery={setQuery} />
        <ModelTable filterSrc={query} />
      </div>
    </div>
  );
}
