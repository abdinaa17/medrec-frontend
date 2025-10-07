import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useParams } from "react-router";
import type { Consumer } from "../types/Consumer";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Message from "../components/Message";
import type { Medication } from "../types/Medication";
import { getDaysInAMonth } from "../utils/date";
import { ListGroup, Table, Form, Button, Modal, Alert } from "react-bootstrap";

import profilePicture from "../assets/profile_placholder.jpg";

// Medicatio type for form submission
type FormMedication = Omit<Medication, "id">;

const SingleConsumer = () => {
  const { id } = useParams();

  const [singleConsumer, setSingleConsumer] = useState<Consumer>();
  const [medications, setMedications] = useState<Medication[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | any>();
  const [isMedicationModal, setIsMedicationModal] = useState<boolean>(false);
  const [formMedication, setFormMedication] = useState<FormMedication>({
    name: "",
    dose: "",
  });
  const [medicationError, setMedicationError] = useState<string | null>(null);

  const daysInMonth = getDaysInAMonth();

  console.log(daysInMonth);

  const fetchSingleConsumer = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const consumersRes = await axios.get(
        "http://localhost:8081/api/v1/consumers/" + id
      );

      const medicationsRes = await axios.get(
        "http://localhost:8081/api/v1/consumers/" + id + "/medications"
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

  // input change event
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormMedication((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Add medication modal
  const handleAddMedication = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formMedication.name || !formMedication.dose) {
      setMedicationError("Required fields missing");
      setIsMedicationModal(true);
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8081/api/v1/consumers/${singleConsumer?.id}/medications`,
        formMedication
      );

      console.log(res);

      setFormMedication({
        name: "",
        dose: "",
      });
      setMedicationError(null);
      setIsMedicationModal(false);
    } catch (err: any) {
      console.log(err);
    }
  };

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-3">
      <div className="d-flex  justify-content-between">
        <div>
          <img src={profilePicture} alt="Profile picture" />
          <h2>
            {singleConsumer?.firstName} {singleConsumer?.lastName}
          </h2>
          <p>{singleConsumer?.dateOfBirth}</p>

          <p>No known Allergies</p>
        </div>
        <div>
          <Button onClick={() => setIsMedicationModal(!isMedicationModal)}>
            Add Medication
          </Button>
        </div>
      </div>
      <div>
        <h2>Medication list</h2>
        <div>
          {medications && medications.length > 0 ? (
            medications.map((medication) => {
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
          ) : (
            <div>
              <p>No medication found</p>
            </div>
          )}
        </div>
      </div>

      <Modal
        centered
        show={isMedicationModal}
        onHide={() => setIsMedicationModal(!isMedicationModal)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Add mediction for: {singleConsumer?.firstName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddMedication}>
            <Form.Group>
              <Form.Label>Medication name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formMedication.name}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Medication dose</Form.Label>
              <Form.Control
                type="text"
                name="dose"
                value={formMedication.dose}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => setIsMedicationModal(!isMedicationModal)}
              type="submit"
              className="my-3 w-100"
            >
              Save Changes
            </Button>
            {medicationError && (
              <Alert variant="danger">Required fields missing</Alert>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SingleConsumer;
