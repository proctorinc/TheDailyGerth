const Container = ({ children, size, center = false }) => {
  var maxWidth = "sm:max-w-md";

  if (size === "sm") {
    maxWidth = "sm:max-w-sm";
  } else if (size === "xs") {
    maxWidth = "max-w-xs";
  }

  if (center) {
    return (
      <div className="flex items-center align-center justify-center flex-grow p-5">
        <div className={`${maxWidth} w-full`}>{children}</div>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <div className={`${maxWidth} w-full`}>{children}</div>
    </div>
  );
};

export default Container;
