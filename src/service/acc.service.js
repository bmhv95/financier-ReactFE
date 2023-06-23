import axios from "axios";

const API_URL = "http://localhost:8080/api/accounts";

class accountsService {
    getAccount(){
        return axios.get(API_URL);
    }

    updateAccount(accountName, password, phoneNumber, email){
        return axios.put(API_URL, {
            accountName,
            password,
            phoneNumber,
            email
        });
    }

    deleteAccount(){
        return axios.delete(API_URL);
    }
}

export default new accountsService();