import useSavedData from "@/hooks/useSavedData";

export default function SavedDataWarning({children}) {
  const {isSaved, isUsed} = useSavedData();
  const handleNavigation = (event) => {
    if (!isSaved && isUsed) {
      const confirmAction = window.confirm("Na stronie są niezapisane zmiany, czy na pewno chcesz ją opuścić?");
      if (!confirmAction) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };
  return (
    <div className='w-full h-full bg-transparent' onClick={handleNavigation}>
      {children}
    </div>
  );
}
