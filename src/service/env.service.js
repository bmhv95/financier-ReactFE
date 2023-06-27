import axios from "axios";
import authHeader from "./authHeader";
axios.defaults.headers.common["Authorization"] = authHeader();

const API_URL = "http://localhost:8080/api/envelopes";

class envelopesService {
  getActiveEnvelopes() {
    return axios.get(API_URL);
  }

  getAllEnvelopes(){
    return axios.get(API_URL + "/all");
  }

  toggleEnvelope(id, type, active){
    let requestType = "spendings";
    if(type === "GOAL"){
      requestType = "goals";
    }
    return axios.put(API_URL + "/" + requestType + "/" + id, {
      active: !active
    });
  }

  createSpending(name, description, budget, periodType, periodCount) {
    return axios.post(API_URL + "/spendings/new", {
      name,
      description,
      budget,
      periodType,
      periodCount,
    });
  }

  createGoal(name, description, budget, startDate, endDate) {
    return axios.post(API_URL + "/goals/new", {
      name,
      description,
      budget,
      startDate,
      endDate,
    });    
  }

  getEnvelopeById(id) {
    return axios.get(API_URL + "/" + id);
  }

  updateSpending(
    id,
    name,
    description,
    budget,
    allocated,
    spent,
    periodType,
    periodCount
  ) {
    console.log("update" + periodType + " " + periodCount);
    return axios.put(API_URL + "/spendings/" + id, {
      name,
      description,
      budget,
      allocated,
      spent,
      periodType,
      periodCount,
      active: true
    });
  }

  updateGoal(
    id,
    name,
    description,
    budget,
    allocated,
    spent,
    startDate,
    endDate
  ) {
    return axios.put(API_URL + "/goals/" + id, {
      name,
      description,
      budget,
      allocated,
      spent,
      startDate,
      endDate,
      active: true
    });
  }

  deleteEnvelope(id) {
    return axios.delete(API_URL + "/" + id);
  }
}

export default new envelopesService();
