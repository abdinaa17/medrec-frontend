import type { ReactNode } from "react";
import { Alert } from "react-bootstrap";

const Message: React.FC<{ variant: string; children: ReactNode }> = ({
  variant,
  children,
}) => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Alert className="w-75 text-center" variant={variant}>
        {children}
      </Alert>
    </div>
  );
};

export default Message;
