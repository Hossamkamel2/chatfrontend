import http from "./httpService";
import { apiUrl } from "../config.json";
import { getCurrentUser } from "./authService";

const apiEndpoint = apiUrl + "mess/";

export function getMessages() {
  return http.get(apiEndpoint);
}

export function addMessage(mess) {
  const res = getCurrentUser();
  const dd = { sender: res._id, message: mess };

  return http.post(apiEndpoint, dd);
}

export function deleteMessage(id) {
  return http.delete(apiEndpoint + id);
}
export function getMessagesbyid(id) {
  return http.get(apiEndpoint + id);
}

export function editMessage(id, message) {
  return http.put(apiEndpoint + id, { message });
}
