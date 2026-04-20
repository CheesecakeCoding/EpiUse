import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

interface TopNavbarProps {
  name: string;
  lastname: string;
  setTableView: () => void;
}

function TopNavbar({ name, lastname }: TopNavbarProps) {
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      sticky="top"
      style={{
        width: "100%",
      }}
    >
      <Container>
        <Navbar.Brand>
          Welcome, {name} {lastname}{" "}
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>New Employee</Nav.Link>
          <Nav.Link>Table View</Nav.Link>
          <Nav.Link>Hierarchy</Nav.Link>
          <Nav.Link>Edit details</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
