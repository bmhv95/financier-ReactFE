import authService from "../service/auth.service.js";
import { useNavigate } from "react-router-dom";
import accountsService from "../service/acc.service.js";
import Envelope from "./envelope";
import envelopesService from "../service/env.service.js";
import { React, useState } from "react";

export default function Dashboard() {
  const [envelopes, setEnvelopes] = useState([]);
  const [error, setError] = useState("");
  const getEnvelopes = () => {
    envelopesService.getAllEnvelopes()
      .then((response) => {
         setEnvelopes(response.data);
      })
      .catch((error) => {
          setError(error);
      });
  }

  const EnvelopeList = () => {
    return <div>
      {envelopes.map(
        (envelope) => (
          <Envelope
            key={envelope.envelopeID}
            envelopeID={envelope.envelopeID}
            envelopeName={envelope.envelopeName}
            envelopeBudgetAmount={envelope.envelopeBudgetAmount}
            envelopeCurrentBalance={envelope.envelopeCurrentBalance}
            envelopeDate={envelope.envelopeDate}
          />
        )
      )}
    </div>;
  };

  return (
    <>
    <div>
      <h2>Dashboard</h2>
      <p>{JSON.stringify(authService.getCurrentUser())}</p>
    </div>
    <button
    onClick={(e) => getEnvelopes()}>
        get all envelopes
    </button>
    <div>
        <h1>Error</h1>
        <div>{JSON.stringify(error)}</div>
        <h1>Envelopes</h1>
        <div><EnvelopeList /></div>
    </div>
    </>
  );

  
}
