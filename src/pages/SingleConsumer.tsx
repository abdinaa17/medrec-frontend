import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Consumer } from "../types/Consumer";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Message from "../components/Message";
import type { Medication } from "../types/Medication";
import { getDaysInAMonth } from "../utils/date";
import { ListGroup, Table, Form } from "react-bootstrap";

const SingleConsumer = () => {
  const { id } = useParams();

  const [singleConsumer, setSingleConsumer] = useState<Consumer>();
  const [medications, setMedications] = useState<Medication[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | any>();

  const daysInMonth = getDaysInAMonth();

  console.log(daysInMonth);

  const fetchSingleConsumer = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const consumersRes = await axios.get(
        "http://localhost:8080/api/v1/consumers/" + id
      );

      const medicationsRes = await axios.get(
        "http://localhost:8080/api/v1/consumers/" + id + "/medications"
      );

      const singleConsumerData: Consumer = consumersRes.data;

      setSingleConsumer(singleConsumerData);

      setMedications(medicationsRes.data);
    } catch (err: any) {
      console.log(err);

      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleConsumer();
  }, []);

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <h2>
        {singleConsumer?.firstName} {singleConsumer?.lastName}
      </h2>
      <p>{singleConsumer?.dateOfBirth}</p>

      <p>No known Allergies</p>
      <div>
        <h2>Medication list</h2>
        <div>
          {medications && medications.length > 0
            ? medications.map((medication) => {
                return (
                  <div key={medication.id}>
                    <ListGroup>
                      <ListGroup.Item>
                        {medication.name} {medication.dose}
                      </ListGroup.Item>
                    </ListGroup>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Time</th>
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            return (
                              <th key={i + 1} role="button">
                                {i + 1}
                              </th>
                            );
                          })}
                        </tr>
                        <tr>
                          <th>7am</th>
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            return (
                              <th key={i + 1} role="button">
                                <Form.Select size="sm">
                                  <option value="AA">Administered</option>
                                  <option value="R">Refused</option>
                                </Form.Select>
                              </th>
                            );
                          })}
                        </tr>
                        <tr>
                          <th>3pm</th>
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            return (
                              <th key={i + 1} role="button">
                                <Form.Select size="sm">
                                  <option value="AA">Administered</option>
                                  <option value="R">Refused</option>
                                </Form.Select>
                              </th>
                            );
                          })}
                        </tr>
                        <tr>
                          <th>7pm</th>
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            return (
                              <th key={i + 1} role="button">
                                <Form.Select size="sm">
                                  <option value="AA">Administered</option>
                                  <option value="R">Refused</option>
                                </Form.Select>
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                    </Table>
                  </div>
                );
              })
            : "No medication found"}
        </div>
      </div>
    </div>
  );
};

export default SingleConsumer;
