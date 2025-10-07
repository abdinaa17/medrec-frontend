import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  Image,
  Dropdown,
} from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useGlobalContext } from "../context/AppContext";

import profilePicture from "../assets/profile_placholder.jpg";

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
          <Navbar.Brand as={Link} to="/" className="fw-bolder">
            MedRec
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <div className="d-flex w-75 justify-content-center">
              <Nav>
                <Nav.Link as={Link} to="/consumers">
                  Consumers
                </Nav.Link>
              </Nav>
              {user?.role === "ADMIN" && (
                <Nav>
                  <Nav.Link as={Link} to="/new-consumer">
                    Add Consumer
                  </Nav.Link>
                </Nav>
              )}
            </div>
            <Form
              onSubmit={handleSearch}
              className="w-25 d-flex justify-content-between px-3"
            >
              <Form.Control
                type="text"
                placeholder="Search for consumers"
                value={searchParams.get("q") || ""}
                onChange={(e) => setSearchParams({ q: e.target.value })}
              ></Form.Control>

              <Button
                variant="danger"
                onClick={() => setSearchParams("")}
                className="mx-2"
              >
                X
              </Button>
            </Form>
            <div className="d-flex justify-content-center align-items-center ms-auto">
              {/* <Image src={profilePicture} roundedCircle className="w-25 mr-2" />
               */}
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="light"
                  className="border-0 d-flex justify-content-center align-items-center"
                >
                  <Image
                    src={profilePicture}
                    roundedCircle
                    className="mr-2"
                    width="40"
                    height="40"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="border-0">
                  <Dropdown.Header className="text-end text-decoration-underline">
                    <Nav.Link as={Link} to="/profile">
                      {user?.username}
                    </Nav.Link>
                  </Dropdown.Header>
                </Dropdown.Menu>{" "}
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
