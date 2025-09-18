import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" role="status"></Spinner>
    </div>
  );
};

export default LoadingSpinner;
