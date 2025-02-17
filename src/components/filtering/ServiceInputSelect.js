import { useRef, useState } from "react";

export default function InputSelect({ mutation }) {
  const data = [
    { id: 1, name: "Wymiana dętki", price: 20 },
    { id: 2, name: "Wymiana koła", price: 50 },
  ];

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
        placeholder='Usługa'
      />
      {shouldDisplay && (
        <div className='absolute max-h-48 bg-white border border-border' ref={ref}>
          {data
            .filter((record) => strFind(record.name, text))
            .map((record) => (
              <button
                key={record.id}
                className='border-border h-10 px-4 border-b w-full last:border-0'
                onClick={() => handleOnClick(record)}
              >
                {record.name}
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
