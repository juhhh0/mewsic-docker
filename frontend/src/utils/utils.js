import axios from "axios";

const fetch_get = async (endpoint, user) => {
  if (user) {
    const data = await axios(
      `https://${import.meta.env.VITE_URL}/api/` + endpoint,
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
      `https://${import.meta.env.VITE_URL}/api/` + endpoint
    ).then((res) => {
      return res.data;
    });
    return data;
  }
};

const fetch_post = async ({ endpoint, user, params }) => {
  if (user) {
    const data = await axios({method: "post", url: `https://${import.meta.env.VITE_URL}/api/` + endpoint,
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
      .post(`https://${import.meta.env.VITE_URL}/api/` + endpoint, {
        ...params,
      })
      .then((res) => {
        return res.data;
      });
    return data;
  }
};

export { fetch_get, fetch_post };
