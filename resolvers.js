const axios = require('axios');
const baseUrl = `https://lichess.org`;
const jsonData = require('ndjson-to-json-text');

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

      const { data } = await axios.get(requestUrl);

      return data;
    },

    getTeamMembers: async (root, args) => {
      const { data } = await axios.get(
        baseUrl + `/api/team/${args.teamId}/users`
      );
      const userList = jsonData.ndjsonToJsonText(data);

      return JSON.parse(userList);
    },

    getUserByID: async (root, args) => {
      let config = {
        headers: {
          'Content-Type': 'text/plain',
        },
      };

      const { data } = await axios.post(
        baseUrl + `/api/users`,
        args.userIds,
        config
      );

      return data;
    },

    getLeaderBoard: async (root, args) => {
      let config = {
        headers: {
          Accept: 'application/vnd.lichess.v3+json',
        },
      };
      const { data } = await axios.get(
        baseUrl + `/player/top/${args.nb}/${args.perfType}`,
        config
      );

      return data.users;
    },

    getTopTen: async () => {
      let config = {
        headers: {
          Accept: 'application/vnd.lichess.v3+json',
        },
      };
      const { data } = await axios.get(baseUrl + '/player', config);

      return data;
    },
  },
};

module.exports = resolvers;
