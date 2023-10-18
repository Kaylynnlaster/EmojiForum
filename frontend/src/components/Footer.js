import React from "react";
import "../style/Footer.css";
import Container from "react-bootstrap/esm/Container";

const CustFooter = () => {
  return (
    <footer className="FullFooter">
      <Container className="">
        <h1>The Forum for Emoji Lovers</h1>
        <div className="Content">
          <h3>Copyright &#169;</h3>
        </div>
      </Container>
    </footer>
  );
};

export default CustFooter;
