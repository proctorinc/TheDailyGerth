import Spinner from "@components/ui/Spinner";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col justify-center h-screen">
      <Spinner size="lg" />
    </div>
  );
};

export default LoadingScreen;
