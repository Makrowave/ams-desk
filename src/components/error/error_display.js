export default function ErrorDisplay({ message, isVisible }) {
  return isVisible ? (
    <div className='bg-red-300 p-2 mt-2 border-red-600 border text-center text-wrap self-center w-full'>
      <span className='text-red-800 text-xl'>{message}</span>
    </div>
  ) : (
    <></>
  );
}
