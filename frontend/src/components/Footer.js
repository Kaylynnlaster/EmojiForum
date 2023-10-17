import React from "react";
import "../style/Footer.css";
import Container from "react-bootstrap/esm/Container";

const CustFooter = () => {
  return (
    <Container className="FullFooter">
      <div className="FooterB">
        <h1>The Forum for Emoji Lovers</h1>
      </div>
      <div className="Content">
        <h3>Copyright</h3>
      </div>
    </Container>
  );
};

export default CustFooter;
