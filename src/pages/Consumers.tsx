import axios from "axios";
import { useEffect, useState } from "react";
import type { Consumer } from "../types/Consumer";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import Message from "../components/Message";

const Consumers = () => {
  const [consumers, setConsumers] = useState<Consumer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | any>();

  const fetchConsumers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:8080/api/v1/consumers");

      const consumerData: Consumer[] = res.data;

      setConsumers(consumerData);
    } catch (err: any) {
      console.log(err);

      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConsumers();
  }, []);

  if (error) {
    return <Message variant="error">{error}</Message>;
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="container">
        <h1>Your consumers</h1>

        {consumers && consumers.length > 0 ? (
          <div>
            {consumers.map((consumer) => {
              const { id, firstName, lastName, dateOfBirth } = consumer;
              return (
                <section key={id}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                      <Card.Subtitle>
                        {firstName} {lastName}
                      </Card.Subtitle>
                      <Card.Footer>{dateOfBirth}</Card.Footer>
                      <Link to={`/consumers/${id}`}>See more</Link>
                    </Card.Body>
                  </Card>
                </section>
              );
            })}
          </div>
        ) : (
          <div>
            <p>No consumer found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Consumers;
