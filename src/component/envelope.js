export default function Envelope(props){

    return (
        <div className="envelope">
            <h3 className="envelopeID">Envelope {props.envelopeID}</h3>
            <p>Name: {props.envelopeName}</p>
            <p>Budget: {props.envelopeBudgetAmount}</p>
            <p>Current: {props.envelopeCurrentBalance}</p>
            <p>Date: {props.envelopeDate}</p>
        </div>
    )
}