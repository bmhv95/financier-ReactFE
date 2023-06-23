import axios from "axios";
import authHeader from "./authHeader";
axios.defaults.headers.common["Authorization"] = authHeader();

const API_URL = "http://localhost:8080/api/wallets";

export default class WalletsService {
    getAllWallets() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    getWalletById(id) {
        return axios.get(API_URL + "/" + id, { headers: authHeader() });
    }

    createWallet(walletName, walletBalance) {
        return axios.post(API_URL, { walletName, walletBalance }, { headers: authHeader() });
    }
}