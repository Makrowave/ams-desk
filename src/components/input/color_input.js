export default function ColorInput({ title, value, setValue, className }) {
  return (
    <div className={"flex justify-between " + className}>
      <p className='self-center'>{title}</p>
      <div>
        <input
          className='h-10'
          type='color'
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
