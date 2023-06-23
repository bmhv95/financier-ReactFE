import authService from "../service/auth.service.js";
import { useNavigate } from "react-router-dom";
import accountsService from "../service/acc.service.js";
import { Container, ProgressBar } from "react-bootstrap";
import Envelope from "./envelope";
import envelopesService from "../service/env.service.js";
import { React, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Dashboard() {
  const [envelopes, setEnvelopes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getEnvelopes = () => {
    envelopesService
      .getAllEnvelopes()
      .then((response) => {
        setEnvelopes(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const logout = () => {
    authService.logout();
    navigate("/");
  }


  const EnvelopeList = () => {
    return (
      <div>
        {envelopes.map((envelope) => (
          <Envelope key={envelope.envelopeID} envelope={envelope} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div>
        <h2>Dashboard</h2>
        <p>{JSON.stringify(authService.getCurrentUser())}</p>
      </div>
      <button onClick={(e) => getEnvelopes()}>get all envelopes</button>
      <button onClick={(e) => logout()}>Logout</button>
      <Container>
        <Row>
          <Col sm={8}><div>
            <h1>Error</h1>
            <div>{JSON.stringify(error)}</div>
            <h1>Envelopes</h1>
            <div>
              <EnvelopeList />
            </div>
          </div></Col>
          
          <Col sm={4}>sm=4</Col>
        </Row>
      </Container>
    </>
  );
}
