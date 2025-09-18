import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Consumer } from "../types/Consumer";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Message from "../components/Message";
import type { Medication } from "../types/Medication";

const SingleConsumer = () => {
  const { id } = useParams();

  const [singleConsumer, setSingleConsumer] = useState<Consumer>();
  const [medications, setMedications] = useState<Medication[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | any>();

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

      <div>
        Medication list
        <div>
          {medications && medications.length > 0
            ? medications.map((medication) => {
                return (
                  <ul key={medication.id}>
                    <li>{medication.name}</li>
                    <li>{medication.dose}</li>
                  </ul>
                );
              })
            : "No medication found"}
        </div>
      </div>
    </div>
  );
};

export default SingleConsumer;
