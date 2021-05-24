const axios = require('axios');
const baseUrl = `https://lichess.org`;
const jsonData = require('ndjson-to-json-text');

const resolvers = {
  Query: {
    getUser: async (root, args) => {
      try {
        const { data } = await axios.get(
          baseUrl + `/api/user/${args.username}`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    getUsersStatus: async (root, args) => {
      try {
        const { data } = await axios.get(
          baseUrl + `/api/users/status?ids=${args.ids}`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    getUserRatingHistory: async (root, args) => {
      try {
        const { data } = await axios.get(
          baseUrl + `/api/user/${args.username}/rating-history`
        );

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    getUserActivity: async (root, args) => {
      try {
        const { data } = await axios.get(
          baseUrl + `/api/user/${args.username}/activity`
        );

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    getLiveStreamers: async () => {
      try {
        const { data } = await axios.get(baseUrl + '/streamer/live');
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    getCrosstable: async (root, args) => {
      try {
        let requestUrl;
        if (args.matchup) {
          requestUrl =
            baseUrl +
            `/api/crosstable/${args.user1}/${args.user2}?matchup=true`;
        } else {
          requestUrl = baseUrl + `/api/crosstable/${args.user1}/${args.user2}`;
        }

        const { data } = await axios.get(requestUrl);

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    getTeamMembers: async (root, args) => {
      try {
        const { data } = await axios.get(
          baseUrl + `/api/team/${args.teamId}/users`
        );
        const userList = jsonData.ndjsonToJsonText(data);

        return JSON.parse(userList);
      } catch (error) {
        console.log(error);
      }
    },

    getUserByID: async (root, args) => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    },

    getLeaderBoard: async (root, args) => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    },

    getTopTen: async () => {
      try {
        let config = {
          headers: {
            Accept: 'application/vnd.lichess.v3+json',
          },
        };
        const { data } = await axios.get(baseUrl + '/player', config);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
