import axios from "axios";

const fetch_get = async (endpoint, user) => {
  if (user) {
    const data = await axios(
      `http://${import.meta.env.VITE_URL}:3001/api/` + endpoint,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    ).then((res) => {
      return res.data;
    });
    return data;
  } else {
    const data = await axios(
      `http://${import.meta.env.VITE_URL}:3001/api/` + endpoint
    ).then((res) => {
      return res.data;
    });
    return data;
  }
};

const fetch_post = async ({ endpoint, user, params }) => {
  if (user) {
    const data = await axios({method: "post", url: `http://${import.meta.env.VITE_URL}:3001/api/` + endpoint,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => {
      return res.data;
    });
  return data;
  } else {
    const data = await axios
      .post(`http://${import.meta.env.VITE_URL}:3001/api/` + endpoint, {
        ...params,
      })
      .then((res) => {
        return res.data;
      });
    return data;
  }
};

export { fetch_get, fetch_post };
