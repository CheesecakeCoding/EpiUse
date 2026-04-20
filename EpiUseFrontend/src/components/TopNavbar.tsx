import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

interface TopNavbarProps {
  name: string;
  lastname: string;
  profilepic: string;
  handleTableView: (val: boolean) => void;
  handleHierarchyView: (val: boolean) => void;
  handleUpdateInfo: (val: boolean) => void;
  handleCreateEmployee: (val: boolean) => void;
  handleLogin: (val: boolean) => void;
}

function TopNavbar({
  name,
  lastname,
  profilepic,
  handleTableView,
  handleHierarchyView,
  handleUpdateInfo,
  handleCreateEmployee,
  handleLogin,
}: TopNavbarProps) {
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      sticky="top"
      style={{
        width: "100%",
      }}
    >
      <Navbar.Brand>
        <img src={profilepic} border-radius="50%;"></img>
        Welcome, {name} {lastname}{" "}
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link onClick={() => handleCreateEmployee(true)}>
          New Employee
        </Nav.Link>
        <Nav.Link onClick={() => handleTableView(true)}>Table View</Nav.Link>
        <Nav.Link onClick={() => handleHierarchyView(true)}>Hierarchy</Nav.Link>
        <Nav.Link onClick={() => handleUpdateInfo(true)}>Edit details</Nav.Link>
        <Nav.Link onClick={() => handleLogin(true)}>Log out</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default TopNavbar;
