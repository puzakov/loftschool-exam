export const getAddressList = () => {
  return fetch("https://loft-taxi.glitch.me/addressList")
    .then(response => response.json())
    .then(({ addresses }) => addresses);
};

export const getRoute = (dep, arr) => {
  return fetch(
    `https://loft-taxi.glitch.me/route?address1=${dep}&address2=${arr}`
  ).then(response => response.json());
};
