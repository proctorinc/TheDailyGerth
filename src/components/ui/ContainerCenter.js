const ContainerCenter = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      {children}
    </div>
  );
};

export default ContainerCenter;
