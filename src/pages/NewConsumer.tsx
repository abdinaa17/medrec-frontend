import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import type { Consumer } from "../types/Consumer";
import axios from "axios";
import { useNavigate } from "react-router";
import type { User } from "../types/User";

type FormConsumer = Omit<Consumer, "id">;

const NewConsumer = () => {
  const [consumer, setConsumer] = useState<FormConsumer>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });

  const user: User = {
    firstName: "admin",
    lastName: "admin",
    username: "admin",
    role: "STAFF",
  };

  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConsumer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8081/api/v1/consumers",
        consumer
      );

      navigate("/consumers");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container p-3">
      <h2>Add a consumer</h2>
      {user.role === "ADMIN" ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="my-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Consumer first name"
              value={consumer.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Consumer last name"
              value={consumer.lastName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="text"
              name="dateOfBirth"
              placeholder="Consumer date of birth"
              value={consumer.dateOfBirth}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 my-3">
            Add
          </Button>
        </Form>
      ) : (
        "You have no access to add a consumer"
      )}
    </div>
  );
};

export default NewConsumer;
