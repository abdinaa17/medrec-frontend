import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useParams } from "react-router";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Message from "../components/Message";
import { getDaysInAMonth } from "../utils/date";
import { ListGroup, Table, Form, Button, Modal, Alert } from "react-bootstrap";

import profilePicture from "../assets/profile_placholder.jpg";

// Types
import type { MedicationStatus } from "../types/MedicationStatus";
import type { Medication } from "../types/Medication";
import type { Consumer } from "../types/Consumer";
import { useGlobalContext } from "../context/AppContext";
type FormMedication = Omit<Medication, "id">;

//
const medStatus = ["Adminstered", "Refused", "LOA", "H"];

const SingleConsumer = () => {
  const { id } = useParams();
  const user = useGlobalContext();

  const [singleConsumer, setSingleConsumer] = useState<Consumer>();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | any>();
  const [isMedicationModal, setIsMedicationModal] = useState<boolean>(false);
  const [formMedication, setFormMedication] = useState<FormMedication>({
    name: "",
    dose: "",
  });
  const [medicationError, setMedicationError] = useState<string | null>(null);

  const [medicationStatus, setMedicationStatus] =
    useState<MedicationStatus[]>();
  const [isMedicationStatusModal, setIsMedicationStatusModal] =
    useState<boolean>(false);

  // Get days in a month
  const daysInMonth = getDaysInAMonth();

  // Fetch a consumer with their medications
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

      const createdMedication: Medication = res.data;

      setFormMedication({
        name: "",
        dose: "",
      });
      setMedicationError(null);
      setIsMedicationModal(false);

      setMedications((prev) => [...prev, createdMedication]);
    } catch (err: any) {
      console.log(err);
    }
  };

  // Handle medication admin
  const handleMedicationAdministration = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log("Medication administered by: " + user?.username);
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
                <div key={medication.id} className="my-3">
                  <ListGroup>
                    <ListGroup.Item className="fw-bold">
                      {medication.name} {medication.dose}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      For: Lorem ipsum dolor sit amet.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Prescibed by: Dr. Lorem Ipsum.
                    </ListGroup.Item>
                  </ListGroup>
                  <Table striped bordered hover size="sm" className="med-table">
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
                        <th className="bg-warning text-white text-center">
                          7am
                        </th>
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          return (
                            <th
                              key={i + 1}
                              role="button"
                              className="bg-success text-white text-center"
                            >
                              <span
                                onClick={() =>
                                  setIsMedicationStatusModal(
                                    !isMedicationStatusModal
                                  )
                                }
                              >
                                A
                              </span>
                            </th>
                          );
                        })}
                      </tr>
                      <tr>
                        <th className="bg-warning text-white text-center">
                          3pm
                        </th>
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          return (
                            <th
                              key={i + 1}
                              role="button"
                              className="bg-success text-white text-center"
                            >
                              <span
                                onClick={() =>
                                  setIsMedicationStatusModal(
                                    !isMedicationStatusModal
                                  )
                                }
                              >
                                A
                              </span>
                            </th>
                          );
                        })}
                      </tr>
                      <tr>
                        <th className="bg-warning text-white text-center">
                          7pm
                        </th>
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          return (
                            <th
                              key={i + 1}
                              role="button"
                              className="bg-success text-white text-center"
                            >
                              <span
                                onClick={() =>
                                  setIsMedicationStatusModal(
                                    !isMedicationStatusModal
                                  )
                                }
                              >
                                A
                              </span>
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
      {/* Add medication for a consumer */}
      <div>
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

      {/* Administe medication to a consumer */}
      <div>
        <Modal
          centered
          show={isMedicationStatusModal}
          onHide={() => setIsMedicationStatusModal(!isMedicationStatusModal)}
        >
          <Modal.Header closeButton>Med</Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleMedicationAdministration}>
              <Form.Group>
                <Form.Label>Medication status</Form.Label>
                <Form.Select>
                  {medStatus.map((medStatus, i) => {
                    return <option key={i}>{medStatus}</option>;
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="my-4">
                <Form.Label>Add a note:</Form.Label>
                <Form.Control as="textarea" rows={3}></Form.Control>
              </Form.Group>

              <Button className="my-4 w-100" type="submit">
                Save
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default SingleConsumer;
