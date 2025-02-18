import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

export default function PartInputSelect({ mutation }) {
  const axiosPrivate = useAxiosPrivate();
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["Parts"],
    queryFn: async () => {
      const result = await axiosPrivate.get("Parts");
      return result.data.data;
    },
  });

  const [text, setText] = useState("");
  const [shouldDisplay, setShouldDisplay] = useState(false);

  const ref = useRef();
  const handleBlur = (event) => {
    //If blur happened outside of buttons - close, else let button handle closing
    if (!(ref.current && ref.current.contains(event.relatedTarget))) {
      setShouldDisplay(false);
    }
  };
  const handleOnClick = (record) => {
    mutation(record);
    setText("");
    setShouldDisplay(false);
  };

  return (
    <div className='relative'>
      <input
        type='text'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onFocus={() => setShouldDisplay(true)}
        onBlur={(e) => handleBlur(e)}
        placeholder={"Nowa usługa"}
        className='p-1 rounded-lg'
      />
      {shouldDisplay && (
        <div className='absolute max-h-48 bg-white border border-border rounded-lg w-full' ref={ref}>
          {!isLoading &&
            !isError &&
            data
              .filter((record) => strFind(record.partName, text))
              .map((record) => (
                <button
                  key={record.partId}
                  className='border-border min-h-10 px-4 border-b w-full last:border-0'
                  onClick={() => handleOnClick(record)}
                >
                  {record.partName}
                </button>
              ))}
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
