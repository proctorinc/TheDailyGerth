const CheckLoading = ({ children, isLoading, renderOnLoad }) => {
  if (isLoading) {
    return <>{renderOnLoad}</>;
  } else {
    return <>{children}</>;
  }
};

export default CheckLoading;
