import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useGlobalContext } from "../context/AppContext";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const user = useGlobalContext();

  const handleSearch = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const value = searchParams.get("q") || "";

    navigate({
      pathname: "/consumers",
      search: `?q=${encodeURIComponent(value)}`,
    });

    console.log(searchParams.get("q"));
  };

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            MedRec
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/consumers">
                Consumers
              </Nav.Link>
            </Nav>
            {user?.role === "ADMIN" && (
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/new-consumer">
                  Add Consumer
                </Nav.Link>
              </Nav>
            )}

            <Form onSubmit={handleSearch}>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Search for consumers"
                    value={searchParams.get("q") || ""}
                    onChange={(e) => setSearchParams({ q: e.target.value })}
                  ></Form.Control>
                </Col>

                <Col>
                  <Button variant="danger" onClick={() => setSearchParams("")}>
                    clear
                  </Button>
                </Col>
              </Row>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
