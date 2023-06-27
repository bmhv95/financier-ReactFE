import axios from "axios";
import { useState } from "react";
import { Col, Container, Form, Row, Tabs, Tab } from "react-bootstrap";
import envelopesService from "../service/env.service";
import { useNavigate } from "react-router-dom";

export default function NewEnvelope(props) {
  return (
    <Container>
      <div>
        <Tabs
          defaultActiveKey="spending"
          id="new-envelope-tabs"
          className="justify-content-center mb-3"
        >
          <Tab eventKey="spending" title="Spending">
            <NewSpending />
          </Tab>
          <Tab eventKey="goal" title="Goal">
            <NewGoal />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
}

function NewSpending() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  let [periodType, setPeriodType] = useState("");
  let [periodCount, setPeriodCount] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    envelopesService
      .createSpending(name, description, budget, periodType, periodCount)
      .then(() => {
        navigate("/App");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="bg-body-secondary p-2">
      <h2>New Spending</h2>
      <Row>
        <Col className="justify-content-center" md={6} sm={12}>
          <Form.Group className="mb-3" controlId="newSpending.name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newSpending.description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col className="justify-content-center" md={6} sm={12}>
          <Form.Group className="mb-3" controlId="newSpending.budget">
            <Form.Label>Budget</Form.Label>
            <Form.Control
              type="number"
              placeholder="Budget"
              onChange={(e) => setBudget(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newSpending.periodType">
            <Form.Label>Period Type</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setPeriodType(e.target.value)}
            >
              <option value={"NONE"}>None</option>
              <option value={"WEEKLY"}>Weekly</option>
              <option value={"MONTHLY"}>Monthly</option>
              <option value={"YEARLY"}>Yearly</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="newSpending.periodCount">
            <Form.Label>Period Count</Form.Label>
            <Form.Control
              type="number"
              placeholder="Period Count"
              onChange={(e) => setPeriodCount(e.target.value)}
              disabled={periodType === "NONE"}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="text-center" md={6} sm={12}>
          <button
            className="btn btn-danger me-2"
            onClick={() => navigate("/App")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create new envelope
          </button>
        </Col>
      </Row>
    </Form>
  );
}

function NewGoal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (endDate === "") {
      endDate = null;
    }
    if (startDate === "") {
      startDate = null;
    }
    envelopesService
      .createGoal(name, description, budget, startDate, endDate)
      .then(() => {
        navigate("/App");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="bg-body-secondary p-2">
      <h2>New Goal</h2>
      <Row>
        <Col className="justify-content-center" md={6} sm={12}>
          <Form.Group className="mb-3" controlId="newGoal.name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newGoal.description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col className="justify-content-center" md={6} sm={12}>
          <Form.Group className="mb-3" controlId="newGoal.budget">
            <Form.Label>Budget</Form.Label>
            <Form.Control
              type="number"
              placeholder="Budget"
              onChange={(e) => setBudget(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newSpending.periodType">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Start Date"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newSpending.periodCount">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="End Date"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="text-center" md={6} sm={12}>
          <button
            className="btn btn-danger me-2"
            onClick={() => navigate("/App")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create new envelope
          </button>
        </Col>
      </Row>
    </Form>
  );
}
