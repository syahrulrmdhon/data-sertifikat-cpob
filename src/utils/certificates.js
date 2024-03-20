import clientWHead from "./client";

export async function getCertificates(credential, params) {
  return clientWHead(credential)
    .get("items/app_subsiteditwasprod_datasertifikasicpob", { params })
    .then((res) => res.data)
    .catch((err) => console.log(err.response));
}
