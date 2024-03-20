import axios from "axios";

export const baseURL = "https://satudata.pom.go.id/api/";

export default function clientWHead(credential) {
    console.log(credential)
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${credential ? credential.access_token : ""}`,
      "X-API-Key": "07411f63-58fb-9b52-a708-bab53a7ff29b",
    },
  });
}

export const clientPub = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
