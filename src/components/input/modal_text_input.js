export default function ModalTextInput({ title, value, setValue }) {
  return (
    <div>
      <div className='flex flex-col'>
        <span>{title}</span>
      </div>
      <input
        className='self-end text-center bg-primary border-2 border-tertiary rounded-l w-full'
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}
