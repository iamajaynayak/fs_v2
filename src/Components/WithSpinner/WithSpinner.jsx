import "./withspinner.css";

export const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherprops }) => {
  return isLoading ? (
    <div className="spinner-overlay">
      <div className="spinner-container" />
    </div>
  ) : (
    <WrappedComponent {...otherprops} />
  );
};
