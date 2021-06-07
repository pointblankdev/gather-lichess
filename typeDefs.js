const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  schema {
    query: Query
  }
  scalar JSON
    @specifiedBy(
      url: "http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf"
    )

  type Query {
    getUserActivity(limit: Int, username: String!): [UserActivityListItem]

    getUser(username: String!): LiChessUser

    getUserByID(userIds: [String!]!): [LiChessUser]

    getUserRatingHistory(username: String!): [RatingHistory]

    getUsersStatus(
      ids: [String!]!

      limit: Int
    ): [ApiUsersStatusListItem]

    getLiveStreamers(limit: Int): [StreamerLiveList]

    getCrosstable(matchup: Boolean, user1: String!, user2: String!): Crosstable!

    getTeamMembers(teamId: String!): [LiChessUser]

    getLeaderBoard(nb: Int!, perfType: PerfType!): [LiChessUser]

    getTopTen: TopTenPerfs
  }

  type UserActivityListItem {
    correspondenceEnds: JSON
    correspondenceMoves: JSON
    follows: JSON
    games: JSON
    interval: JSON
    posts: JSON
    practice: [PracticeListItem]
    puzzles: Puzzles
    teams: [TeamsListItem]
    tournaments: JSON
  }

  type PracticeListItem {
    name: String
    nbPositions: Int
    url: String
  }

  type Puzzles {
    score: TheScoreSchema!
  }

  type TheScoreSchema {
    draw: Int!
    loss: Int!
    rp: Rp!
    win: Int!
  }

  type Rp {
    after: Int!
    before: Int!
  }

  type TeamsListItem {
    name: String
    url: String
  }

  type LiChessUser @key(fields: "id") {
    blocking: Boolean
    completionRate: Int
    count: Count
    createdAt: Int!
    disabled: Boolean
    followable: Boolean
    following: Boolean
    followsYou: Boolean
    id: String!
    language: String
    nbFollowers: Int!
    nbFollowing: Int!
    online: Boolean
    patron: Boolean
    perfs: Perfs!
    playTime: PlayTime!
    playing: String!
    profile: Profile!
    seenAt: Int!
    streaming: Boolean!
    title: String
    tosViolation: Boolean
    url: String!
    username: String!
  }

  # extend type User @key(fields: "id") {
  #   id: ID! @external
  #   lichess: LiChessUser @requires(fields: "lichess_id")
  #   lichess_id: ID @external
  # }

  type Count {
    ai: Int!
    all: Int!
    bookmark: Int!
    draw: Int!
    drawH: Int!
    import: Int!
    loss: Int!
    lossH: Int!
    me: Int!
    playing: Int!
    rated: Int!
    win: Int!
    winH: Int!
  }

  type Perfs {
    atomic: Atomic!
    blitz: Blitz!
    bullet: Bullet!
    chess960: Chess960!
    classical: Classical!
    correspondence: Correspondence!
    horde: Horde!
    kingOfTheHill: KingOfTheHill!
    puzzle: Puzzle!
    racingKings: RacingKings!
    rapid: Rapid!
    storm: Storm!
    ultraBullet: UltraBullet!
  }

  type Atomic {
    games: Int!
    prog: Int!
    prov: Boolean!
    rating: Int!
    rd: Int!
  }

  type Blitz {
    games: Int!
    prog: Int!
    prov: Boolean!
    rating: Int!
    rd: Int!
  }

  type Bullet {
    games: Int!
    prog: Int!
    prov: Boolean!
    rating: Int!
    rd: Int!
  }

  type Chess960 {
    games: Int!
    prog: Int!
    prov: Boolean!
    rating: Int!
    rd: Int!
  }

  type Classical {
    games: Int!
    prog: Int!
    prov: Boolean!
    rating: Int!
    rd: Int!
  }

  type Correspondence {
    games: Int!
    prog: Int!
    prov: Boolean!
    rating: Int!
    rd: Int!
  }

  type Horde {
    games: Int!
    prog: Int!
    prov: Boolean!
    rating: Int!
    rd: Int!
  }

  type KingOfTheHill {
    games: Int!
    prog: Int!
    prov: Boolean!
    rating: Int!
    rd: Int!
  }

  type Puzzle {
    games: Int!
    prog: Int!
    prov: Boolean!
    rating: Int!
    rd: Int!
  }

  type RacingKings {
    games: Int!
    prog: Int!
    prov: Boolean!
    rating: Int!
    rd: Int!
  }

  type Rapid {
    games: Int!
    prog: Int!
    prov: Boolean!
    rating: Int!
    rd: Int!
  }

  type Storm {
    runs: Int!
    score: Int!
  }

  type UltraBullet {
    games: Int!
    prog: Int!
    prov: Boolean!
    rating: Int!
    rd: Int!
  }

  type PlayTime {
    total: Int!
    tv: Int!
  }

  type Profile {
    bio: String!
    country: String!
    ecfRating: Int!
    fideRating: Int!
    firstName: String!
    lastName: String!
    links: String!
    location: String!
    uscfRating: Int!
  }

  type ApiUsersStatusListItem {
    id: String
    name: String
    online: Boolean
    patron: Boolean
    playing: Boolean
    streaming: Boolean
    title: String
  }

  type RatingHistory {
    name: String
    points: [JSON]
  }

  type StreamerLiveList {
    id: String
    name: String
    online: Boolean
    patron: Boolean
    title: String
  }

  type Crosstable {
    users: JSON
    matchup: JSON
    nbGames: Int
  }

  enum PerfType {
    atomic
    blitz
    bullet
    chess960
    classical
    correspondence
    horde
    kingOfTheHill
    puzzle
    racingKings
    rapid
    storm
    ultraBullet
  }

  type TopTenPerfs {
    atomic: [LiChessUser]
    blitz: [LiChessUser]
    bullet: [LiChessUser]
    chess960: [LiChessUser]
    classical: [LiChessUser]
    correspondence: [LiChessUser]
    horde: [LiChessUser]
    kingOfTheHill: [LiChessUser]
    puzzle: [LiChessUser]
    racingKings: [LiChessUser]
    rapid: [LiChessUser]
    storm: [LiChessUser]
    ultraBullet: [LiChessUser]
  }
`;

module.exports = typeDefs;
