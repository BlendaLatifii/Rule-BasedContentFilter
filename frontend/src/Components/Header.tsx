import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <Navbar
        expand="lg"
        className="shadow-sm custom-header bg-dark color-white"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto gap-4">
              <Nav.Link as={Link} className="text-white" to="/">
                Rules
              </Nav.Link>
              <Nav.Link as={Link} className="text-white" to="/TextProcessor">
                Text Processor
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
