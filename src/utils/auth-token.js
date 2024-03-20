import { clientPub } from "./client";

export async function getTokenAuth() {
  const dataLogin = {
    email: process.env.REACT_APP_EMAIL,
    password: process.env.REACT_APP_PASSWORD,
  };
  return clientPub
    .post(`/auth/login`, dataLogin)
    .then((res) => res.data)
    .catch((err) => console.log(err.response))
}
