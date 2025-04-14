export default function SaveIndicator({status}) {
  switch (status) {
    case "success":
      return <div
        className="rounded-lg bg-green-500  flex justify-center items-center px-3 w-40 text-green-100">Zapisano</div>
    case "error":
      return <div className="rounded-lg bg-red-500  flex justify-center items-center px-3 w-40 text-red-200">Błąd</div>
    default:
      return <div className="rounded-lg bg-gray-200 flex justify-center items-center px-3 w-40">Zapisywanie...</div>
  }
}