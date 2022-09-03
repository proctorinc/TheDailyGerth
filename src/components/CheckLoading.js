const CheckLoading = ({ children, isLoading, renderOnLoading }) => {
  if (isLoading) {
    return <>{renderOnLoading}</>;
  } else {
    return <>{children}</>;
  }
};

export default CheckLoading;
