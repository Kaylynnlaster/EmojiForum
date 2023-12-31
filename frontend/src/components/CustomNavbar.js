import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/esm/Container";
import "../style/NavBar.css";
import logo from "../NavBarTitle.png";

export const CustomNavbar = () => {
  return (
    <Navbar className="fs-3">
      <Container>
        <Navbar.Brand href="/">
          <h1>🏡</h1>
        </Navbar.Brand>
        <Nav>
          <img
            className="image"
            width={1250}
            height={400}
            src={logo}
            alt="Logo"
          />
        </Nav>
        <Nav>
          <Nav.Link className="px-4" href="/signup">
            🆕❓
          </Nav.Link>
          <Nav.Link className="px-4" href="/login">
            ➡️💻❓
          </Nav.Link>
          {/* Any additional links can be added here */}
        </Nav>
      </Container>
    </Navbar>
  );
};
