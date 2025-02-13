export default function ModalTextInput({ title, value, setValue, className }) {
  return (
    <div className={className}>
      <div className='flex flex-col'>
        <span>{title}</span>
      </div>
      <input
        className='self-end text-center bg-primary border-2 border-tertiary rounded-lg w-full'
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}
