import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Row, Col, Button } from "react-bootstrap";
import Envelope from "./component/envelopes/envelope";
import EnvelopeList from "./component/envelopes/envelopeList";
import { useState } from "react";
import EnvelopesService from "./service/env.service";
import authService from "./service/auth.service";
import Wallet from "./component/wallet/wallet";

function App() {
  const [envelopes, setEnvelopes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isAll, setIsAll] = useState(false);
  if (!loaded) {
    EnvelopesService.getActiveEnvelopes().then((response) => {
      setEnvelopes(response.data);
      setLoaded(true);
    });
  }

  const handleGetAll = () => {
    if (!isAll) {
      EnvelopesService.getAllEnvelopes().then((response) => {
        setEnvelopes(response.data);
      });
      setIsAll(true);
    } else {
      EnvelopesService.getActiveEnvelopes().then((response) => {
        setEnvelopes(response.data);
        setIsAll(false);
      });
    }
  };

  return (
    <>
      <Topbar handleGetAll={handleGetAll} isAll={isAll} />
      <ContentArea envelopes={envelopes} />
    </>
  );
}

function Topbar({ handleGetAll, isAll }) {
  const navigate = useNavigate();
  const logout = () => {
    authService.logout();
    navigate("/");
  };

  const newEnvelope = () => {
    navigate("/envelopes/new");
  };
  return (
    <Navbar className="bg-body-secondary px-2" expand="lg" fixed="top">
      <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* Add your topbar links here */}
          <Nav.Link href="#link1">Link 1</Nav.Link>
          <Nav.Link href="#link2">Link 2</Nav.Link>
          <Nav.Link href="#link3">Link 3</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Text className="mr-auto mx-2">
        <Button variant="success" onClick={() => alert("New transaction")}>
          New Transaction
        </Button>
      </Navbar.Text>
      <Navbar.Text className="mr-auto mx-2">
        <Wallet />
      </Navbar.Text>
      <div className="d-flex gap-2 mx-2">
        <Button onClick={handleGetAll} className="mx-2">
          {isAll ? "Get Active Envelopes" : "Get ALL Envelopes"}
        </Button>
        <Button onClick={newEnvelope} className="mx-2">
          New Envelope
        </Button>
        <Button onClick={logout} className="mx-2">
          Logout
        </Button>
      </div>
    </Navbar>
  );
}

function ContentArea({ envelopes }) {
  if (!envelopes.length) {
    return (
      <div className="text-center" id="contentAreaDiv">
        <h2>No Envelopes. Create one now!</h2>
      </div>
    );
  } else {
    const activeGoalEnvelopes = envelopes
      .filter((envelope) => envelope.type === "GOAL")
      .filter((envelope) => envelope.active);
    const inactiveGoalEnvelopes = envelopes
      .filter((envelope) => envelope.type === "GOAL")
      .filter((envelope) => !envelope.active);
    const activeSpendingEnvelopes = envelopes
      .filter((envelope) => envelope.type === "SPENDING")
      .filter((envelope) => envelope.active);
    const inactiveSpendingEnvelopes = envelopes
      .filter((envelope) => envelope.type === "SPENDING")
      .filter((envelope) => !envelope.active);
    return (
      <Container fluid id="contentAreaDiv">
        <div>
          <h2>Spendings</h2>
          <EnvelopeList envelopes={activeSpendingEnvelopes} />
          <EnvelopeList envelopes={inactiveSpendingEnvelopes} />
        </div>
        <div>
          <h2>Goals</h2>
          <EnvelopeList envelopes={activeGoalEnvelopes} />
          <EnvelopeList envelopes={inactiveGoalEnvelopes} />
        </div>
      </Container>
    );
  }
}

export default App;
