type ErrorDisplayProps = {
  message: string;
  isVisible: boolean;
};

const ErrorDisplay = ({ message, isVisible }: ErrorDisplayProps) => {
  return isVisible ? (
    <div className="bg-red-300 p-2 mt-2  border text-center text-wrap self-center w-full rounded-lg">
      <span className="text-red-800 text-xl">{message}</span>
    </div>
  ) : (
    <></>
  );
};

export default ErrorDisplay;
