import axios from "axios";
import authHeader from "./authHeader";
axios.defaults.headers.common["Authorization"] = authHeader();

const API_URL = "http://localhost:8080/api/wallets";

class WalletsService {
    getAllWallets() {
        return axios.get(API_URL);
    }

    getWalletById(id) {
        return axios.get(API_URL + "/" + id);
    }

    createWallet(walletName, walletBalance) {
        return axios.post(API_URL, { walletName, walletBalance });
    }
}

export default new WalletsService();