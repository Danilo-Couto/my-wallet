/* const ISS_BASE_API = 'http://api.open-notify.org';

export const getCurrency = () =>
  fetch(`${ISS_BASE_API}/iss-now.json`).then((response) =>
    response
      .json()
      .then((json) =>
        response.ok ? Promise.resolve(json) : Promise.reject(json)
      )
  );

// Ou se preferirem 😄
// const getCurrentISSLocation = async () => {
//   const response = await fetch(`${ISS_BASE_API}/iss-now.json`);
//   const json = await response.json();
//   return response.ok ? Promise.resolve(json) : Promise.reject(json);
// };

export default getCurrentISSLocation;
 */