export default function TimeSelector({interval, setInterval, since, setSince, until, setUntil}) {
  const setLatestInterval = (days) => {
    setSince(new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    setUntil(new Date().toISOString().split('T')[0])
  }

  return (
    <div className="bg-primary mb-4 p-2 flex sticky top-0 z-10 rounded-b-lg items-center gap-2 shadow-md">
      <select value={interval} onChange={(e) => setInterval(e.target.value)}>
        <option value={"day"}>Dzień</option>
        <option value={"month"}>Miesiąc</option>
        <option value={"year"}>Rok</option>
      </select>
      <div className="p-1 border-gray-200 border rounded-md">
        <span className="pr-1">Od</span>
        <input type={"date"} value={since} onChange={(e) => setSince(e.target.value)}/>
      </div>
      <div className="p-1 border-gray-200 border rounded-md">
        <span className="pr-1">Od</span>
        <input type={"date"} value={until} onChange={(e) => setUntil(e.target.value)}/>
      </div>
      <button className="button-primary" onClick={() => {
        setLatestInterval(0)
      }}>
        Dziś
      </button>
      <button className="button-primary" onClick={() => {
        setLatestInterval(7)
      }}>
        Tydzień
      </button>
      <button className="button-primary" onClick={() => {
        setLatestInterval(30)
      }}>
        30 dni
      </button>
      <button className="button-primary" onClick={() => {
        setLatestInterval(60)
      }}>
        60 dni
      </button>
      <button className="button-primary" onClick={() => {
        setLatestInterval(90)
      }}>
        90 dni
      </button>
      <button className="button-primary" onClick={() => {
        setLatestInterval(365)
      }}>
        Rok
      </button>
      <button className="button-primary" onClick={() => {
        setSince("")
        setUntil("")
      }}>
        Zawsze
      </button>
    </div>
  )
}