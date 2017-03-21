import 'whatwg-fetch';

const stravaApi = {
  get(path) {
    return fetch(`/api${path}`).then((res) => {
      return res.json();
    });
  }
}

export default stravaApi;
