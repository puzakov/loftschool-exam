export const apiRequest = params => {
  return fetch(`https://loft-taxi.glitch.me/${params}`).then(response =>
    response.json()
  );
};
