import { Container, Row } from "react-bootstrap";
import "../stylesheets/PageNotFound.css";

function NotFound() {
  return (
    <>
      <Container
        fluid={true}
        className="d-flex justify-content-center align-items-center text-center"
        style={{ height: "100vh" }}
      >
        <Row className="d-flex justify-content-center">
          <p className="m-0" style={{ fontSize: "20rem" }}>
            404
          </p>
          <p className="m-0" style={{ fontSize: "3rem" }}>
            Page not found
          </p>
          <div className="shadow"></div>
        </Row>
      </Container>
    </>
  );
}

export default NotFound;
