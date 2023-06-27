import { Container, Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import envelopesService from "../service/env.service";

export default function EditEnvelope() {
  const envelope = useLocation().state;
  const [name, setName] = useState(envelope.name);
  const [description, setDescription] = useState(envelope.description);
  const [budget, setBudget] = useState(envelope.budget);
  const [allocated, setAllocated] = useState(envelope.allocated);
  const [spent, setSpent] = useState(envelope.spent);
  const type = envelope.type;

  let [periodType, setPeriodType] = useState(
    envelope.periodType == null ? "" : envelope.periodType
  );
  let [periodCount, setPeriodCount] = useState(envelope.periodCount);
  let [startDate, setStartDate] = useState(envelope.startDate);
  let [endDate, setEndDate] = useState(envelope.endDate);
  const [isDelete, setIsDelete] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "SPENDING") {
      spendingSubmit();
    } else {
      goalSubmit();
    }
  };

  const spendingSubmit = () => {
    if(periodType === "NONE"){
        periodCount = null;
    }
    envelopesService
      .updateSpending(
        envelope.id,
        name,
        description,
        budget,
        allocated,
        spent,
        periodType,
        periodCount
      )
      .then(() => {
        navigate("/App");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const goalSubmit = () => {
    envelopesService
      .updateGoal(
        envelope.id,
        name,
        description,
        budget,
        allocated,
        spent,
        startDate,
        endDate
      )
      .then(() => {
        navigate("/App");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleDelete = () => {
    envelopesService
      .deleteEnvelope(envelope.id)
      .then(() => {
        navigate("/App");
      })
      .catch((err) => {
        alert(err);
      });
  };

  function SpendingEdit() {
    return (
      <>
        <Form.Group className="mb-3" controlId="editSpending.periodType">
          <Form.Label>Period Type</Form.Label>
          <Form.Control
            as="select"
            value={periodType}
            onChange={(e) => setPeriodType(e.target.value)}
          >
            <option value={"NONE"}>None</option>
            <option value={"WEEKLY"}>Weekly</option>
            <option value={"MONTHLY"}>Monthly</option>
            <option value={"YEARLY"}>Yearly</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="editSpending.periodCount">
          <Form.Label>Period Count</Form.Label>
          <Form.Control
            type="number"
            placeholder="Period Count"
            value={periodCount}
            onChange={(e) => setPeriodCount(e.target.value)}
            disabled={periodType === "NONE"}
          />
        </Form.Group>
      </>
    );
  }

  function GoalEdit() {
    return (
      <>
        <Form.Group className="mb-3" controlId="editSpending.periodType">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            placeholder="Start Date"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="editSpending.periodCount">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            placeholder="End Date"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>
      </>
    );
  }

  function Delete() {
    return (
      <>
        <h3 className="text-center">
          Are you sure you want to delete this envelope?
          <br />
          <small>This will delete all related transactions</small>
        </h3>
        <Button variant="danger" onClick={handleDelete}>
          Delete this envelope
        </Button>
      </>
    );
  }

  return (
    <Container className="bg-body-secondary p-2">
      <h3 className="text-center">Edit envelope</h3>
      <h3 className="text-center">Type: {envelope.type}</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className="justify-content-center" md={6} sm={12}>
            <Form.Group className="mb-3" controlId="editSpending.name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editSpending.description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description"
                value={description}
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="justify-content-center" md={6} sm={12}>
            <InputGroup className="mt-3" controlId="editSpending.budget">
              <InputGroup.Text className="bg-dark-subtle">
                Budget
              </InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mt-3" controlId="editSpending.allocated">
              <InputGroup.Text className="bg-dark-subtle">
                Allocated
              </InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Allocated"
                value={allocated}
                onChange={(e) => setAllocated(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="my-3" controlId="editSpending.spent">
              <InputGroup.Text className="bg-dark-subtle">
                Spent
              </InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Spent"
                value={spent}
                onChange={(e) => setSpent(e.target.value)}
              />
            </InputGroup>
            {type === "GOAL" ? <GoalEdit /> : <SpendingEdit />}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center" md={6} sm={12}>
            <Button variant="warning" className="ms-2" onClick={() => setIsDelete(true)}>
              Delete
            </Button>
            <Button variant="danger" className="ms-2" onClick={() => navigate("/App")}>
              Cancel
            </Button>
            <Button type="submit" className="ms-2" variant="primary">
              Edit envelope
            </Button>
          </Col>
        </Row>
        {isDelete && <Delete />}
      </Form>
    </Container>
  );
}
