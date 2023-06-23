import axios from "axios";
import authHeader from "./authHeader";
axios.defaults.headers.common["Authorization"] = authHeader();

const API_URL = "http://localhost:8080/api/envelopes";

class envelopesService {
  getAllEnvelopes() {
    return axios.get(API_URL);
  }

  createEnvelope(envelopeName, envelopeBudgetAmount) {
    return axios.post(
      API_URL + "/new",
      {
        envelopeName,
        envelopeBudgetAmount,
      }
    );
  }

  getEnvelopeById(id) {
    return axios.get(API_URL + "/" + id);
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
      }
    );
  }

  deleteEnvelopeById(id) {
    return axios.delete(API_URL + "/" + id);
  }
}

export default new envelopesService();
