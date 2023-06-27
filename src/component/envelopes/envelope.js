import "./envelope.css";
import EnvelopeBar from "./EnvelopeBar";
import { Button, Col, Row } from "react-bootstrap";
import envelopeService from "../../service/env.service.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Envelope(props) {
  const [isActive, setIsActive] = useState(props.envelope.active);
  let active = "active";
  if (isActive === false) {
    active = "inactive";
  }

  const navigate = useNavigate();

  let intervalString = "NONE";

  switch (props.envelope.periodType) {
    case "MONTHLY":
      intervalString = `${props.envelope.periodCount} month(s)`;
      break;
    case "WEEKLY":
      intervalString = `${props.envelope.periodCount} week(s)`;
      break;
    case "YEARLY":
      intervalString = `${props.envelope.periodCount} year(s)`;
      break;
  }

  const handleActive = () => {
    envelopeService
      .toggleEnvelope(
        props.envelope.id,
        props.envelope.type,
        isActive
      )
      .then(() => {
        setIsActive(!isActive);
      });
  };

  const handleEdit = () => {
    navigate("/envelopes/edit/", { state: props.envelope });
  };

  return (
    <Col sm={12} md={4}>
      <div
        className={`envelope bg-success-subtle border border-black rounded clearfix ${active}`}
      >
        <EnvelopeBar
          spent={props.envelope.spent}
          allocated={props.envelope.allocated}
          budget={props.envelope.budget}
          envelopeID={props.envelope.id}
          name={props.envelope.name}
          onBudgetBarClick={handleEdit}
        />
        <h3 className="envelopeID">{props.envelope.name}</h3>
        <Row className="justify-content-center">
          <Row className="justify-content-center">
            <h5>Description: {props.envelope.description}</h5>
          </Row>
          <Col md={6}>
            <Row className="justify-content-center">
              Budget: {props.envelope.budget}
            </Row>
          </Col>
          <Col md={6}>
            {props.envelope.type === "SPENDING" && (
              <>
                <Row className="justify-content-center">Period: {intervalString}</Row>
              </>
            )}
            {props.envelope.type === "GOAL" && (
              <>
                <Row className="justify-content-center">StartDate: {props.envelope.startDate}</Row>
                <Row className="justify-content-center">
                  EndDate:{" "}
                  {props.envelope.endDate ? props.envelope.endDate : "NONE"}
                </Row>
              </>
            )}
          </Col>
        </Row>
        <Button variant="secondary" className="me-1 mt-2" onClick={() => alert("Detail view with transactions")}>
          View Details
        </Button>
        <Button variant="primary" className="me-1 mt-2" onClick={handleEdit}>
          Edit
        </Button>
        <Button
          variant="danger"
          className="me-1 mt-2"
          id="toggleActiveBtn"
          onClick={handleActive}
        >
          Toggle Active
        </Button>
      </div>
    </Col>
  );
}
