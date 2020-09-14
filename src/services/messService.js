import http from "./httpService";
import { apiUrl } from "../config.json";
import { getCurrentUser } from "./authService";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "mess";

export function getMessages() {
  return http.get(apiEndpoint);
}

export function addMessage(mess) {
  const res = getCurrentUser();
  const dd = { sender: res._id, message: mess };

  return http.post(apiEndpoint, dd);
}
