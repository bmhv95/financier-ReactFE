import Envelope from "./envelope";
import { Row } from "react-bootstrap";

export default function EnvelopeList({ envelopes }) {
  function chunkArray(arr, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      chunkedArray.push(chunk);
    }
    return chunkedArray;
  }

  const chunkedData = chunkArray(envelopes, 3);

  return (
    <>
      {chunkedData.map((chunk, index) => (
        <Row key={index}>
          {chunk.map((item) => (
            <Envelope key={item.id} envelope={item} /> // Replace with your component and its respective props
          ))}
        </Row>
      ))}
    </>
  );
}
