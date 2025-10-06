import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import type { Consumer } from "../types/Consumer";
import { Button, Card } from "react-bootstrap";
import { Link, useSearchParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import Message from "../components/Message";

import profilePicture from "../assets/profile_placholder.jpg";
const Consumers = () => {
  const [consumers, setConsumers] = useState<Consumer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | any>();

  // URL search
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const fetchConsumers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(query + " from consumers");
      const res = query
        ? await axios.get(
            `http://localhost:8081/api/v1/consumers/search?query=${query}`
          )
        : await axios.get("http://localhost:8081/api/v1/consumers");

      const consumerData: Consumer[] = res.data;

      setConsumers(consumerData);
    } catch (err: any) {
      console.log(err);

      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const debounce = (fn: any, delay: number) => {
    let timerId: number;

    return () => {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        fn();
      }, delay);
    };
  };

  const debouncedFetch = useMemo(
    () => debounce(fetchConsumers, 1000),
    [fetchConsumers]
  );

  useEffect(() => {
    debouncedFetch();

    // return () => debouncedFetch.cancel();
  }, [query]);

  if (error) {
    return <Message variant="danger">{error}</Message>;
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
                    <Card.Img variant="top" src={profilePicture} />
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
