import axios from "axios";

const API_URL = "http://localhost:8099/api/auth/";

class AuthService {
  register(email, password) {
    return axios.post(API_URL + "signup", {
      email,
      password,
    });
  }

  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.jwttoken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();