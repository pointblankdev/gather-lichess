const axios = require('axios');
const baseUrl = `https://lichess.org`;

const resolvers = {
  Query: {
    getUser: async (root, args) => {
      const { data } = await axios.get(baseUrl + `/api/user/${args.username}`);

      return data;
    },

    getUsersStatus: async (root, args) => {
      const { data } = await axios.get(
        baseUrl + `/api/users/status?ids=${args.ids}`
      );

      return data;
    },

    getUserRatingHistory: async (root, args) => {
      const { data } = await axios.get(
        baseUrl + `/api/user/${args.username}/rating-history`
      );

      return data;
    },

    getUserActivity: async (root, args) => {
      const { data } = await axios.get(
        baseUrl + `/api/user/${args.username}/activity`
      );

      return data;
    },

    getLiveStreamers: async () => {
      const { data } = await axios.get(baseUrl + '/streamer/live');
      return data;
    },

    getCrosstable: async (root, args) => {
      let requestUrl;
      if (args.matchup) {
        requestUrl =
          baseUrl + `/api/crosstable/${args.user1}/${args.user2}?matchup=true`;
      } else {
        requestUrl = baseUrl + `/api/crosstable/${args.user1}/${args.user2}`;
      }

      console.log(requestUrl);
      const { data } = await axios.get(requestUrl);

      console.log(data);

      return data;
    },
  },
};

module.exports = resolvers;
