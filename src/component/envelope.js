import ProgressBar from "react-bootstrap/ProgressBar";
import "./envelope.css";
import EnvelopeBar from "./EnvelopeBar";
import { Button } from "react-bootstrap";

export default function Envelope(props) {
  return (
    <div className="envelope">
      <h3 className="envelopeID">
        Envelope {props.envelope.id} Type: {props.envelope.type}
      </h3>
      <EnvelopeBar
        spent={props.envelope.spent}
        allocated={props.envelope.allocated}
        budget={props.envelope.budget}
        envelopeID={props.envelope.id}
        name={props.envelope.name}
      />
      <div className="envelope-flex">
        <p>Name: {props.envelope.name}</p>
        <p>Description: {props.envelope.description}</p>
        <p>Budget: {props.envelope.budget}</p>
        <p>Spent: {props.envelope.spent}</p>
        <p>Allocated: {props.envelope.allocated}</p>
      </div>
      <div className="envelope-flex">
        <p>Active: {"" + props.envelope.active}</p>

        {props.envelope.type === "SPENDING" && (
          <>
            <p>Date: {props.envelope.date}</p>
            <p>
              Period:{" "}
              {props.envelope.periodType === null
                ? "NONE"
                : props.envelope.periodType}
            </p>
            <p>
              Period count:{" "}
              {props.envelope.periodCount === null
                ? "NONE"
                : props.envelope.periodCount}
            </p>
          </>
        )}
        {props.envelope.type === "GOAL" && (
          <>
            <p>StartDate: {props.envelope.startDate}</p>
            <p>EndDate: {props.envelope.endDate}</p>
          </>
        )}
      </div>
      <div className="envelope-flex">
        <Button variant="primary">Edit</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </div>
  );
}
