const Container = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-md">{children}</div>
    </div>
  );
};

export default Container;
