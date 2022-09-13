import Spinner from "@components/ui/Spinner";

const LoadingScreen = ({ loadingComponent }) => {
  return (
    <div className="flex flex-col justify-center h-screen">
      {loadingComponent ? loadingComponent : <Spinner size="lg" />}
    </div>
  );
};

export default LoadingScreen;
