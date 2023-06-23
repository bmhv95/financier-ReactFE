import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8099/api/envelopes";

class envelopesService {
  getAllEnvelopes() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  createEnvelope(envelopeName, envelopeBudgetAmount) {
    return axios.post(
      API_URL + "/new",
      {
        envelopeName,
        envelopeBudgetAmount,
      },
      { headers: authHeader() }
    );
  }

  getEnvelopeById(id) {
    return axios.get(API_URL + "/" + id, { headers: authHeader() });
  }

  updateEnvelope(
    id,
    envelopeName,
    envelopeBudgetAmount,
    envelopeCurrentBalance
  ) {
    return axios.put(
      API_URL + "/" + id,
      {
        envelopeName,
        envelopeBudgetAmount,
        envelopeCurrentBalance,
      },
      { headers: authHeader() }
    );
  }

  deleteEnvelopeById(id) {
    return axios.delete(API_URL + "/" + id, { headers: authHeader() });
  }
}

export default new envelopesService();
