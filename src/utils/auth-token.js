import { clientPub } from "./client";

export async function getTokenAuth() {
  const dataLogin = {
    email: "yusran.harsyam@pom.go.id",
    password: "Wasprod@2023",
  };
  return clientPub
    .post(`/auth/login`, dataLogin)
    .then((res) => res.data)
    .catch((err) => console.log(err.response))
}
