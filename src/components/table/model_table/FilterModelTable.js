import {useState} from "react";
import Filters from "./Filters";
import ModelTable from "./ModelTable";

export default function FilterModelTable() {
    const [query, setQuery] = useState(defaultQuery);
    return (
        <div className='main-div'>
            <div className='flex-1 grid grid-cols-6 py-5 rounded-b-xl overflow-hidden flex-col'>
                <Filters setQuery={setQuery}/>
                <ModelTable filterSrc={query}/>
            </div>
        </div>
    );
}


const defaultQuery = `&avaible=true
&manufacturerId=
&wheelSize=
&frameSize=
&name=
&electric=false
&statusId=
&isWoman=
&isKids=false
&minPrice=0
&maxPrice=100000
&colorId=
&categoryId=
&productCode=
&noEan=false
&noProductCode=false
&noColor=false
&noColorGroup=false`