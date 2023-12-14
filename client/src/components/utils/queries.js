import { gql } from '@apollo/client';

export const GET_USER_TEAMS = gql`
  query GetUserTeams {
    userTeams {
      _id
      name
      pokemon {
        name
        sprite
        move_1
        move_2
        move_3
        move_4
        ability
        nature
        level
        types
      }
    }
  }
`;

export const GET_RECENT_TEAMS = gql`
  query GetRecentTeams {
    recentTeams {
      _id
      name
      pokemon {
        name
        sprite
        move_1
        move_2
        move_3
        move_4
        ability
        nature
        level
        types
      }
    }
  }
`;



export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
    }
  }
`;

export const QUERY_TEAMS = gql`
query getTeams {
  teams {
    _id
    name
    userCreator
    pokemon {
      level
      pokeDexNo
      move_1
      move_2
      move_3
      move_4
      ability
      item
      hp_ev
      attack_ev
      special_attack_ev
      defense_ev
      special_defense_ev
      speed_ev
      hp_iv
      attack_iv
      special_attack_iv
      defense_iv
      special_defense_iv
      speed_iv
    }
  }
}
`;

export const QUERY_SINGLE_TEAMS = gql`
query getSingleTeams {
  userTeams {
    _id
    name
    userCreator
    pokemon {
      level
      pokeDexNo
      move_1
      move_2
      move_3
      move_4
      ability
      item
      hp_ev
      attack_ev
      special_attack_ev
      defense_ev
      special_defense_ev
      speed_ev
      hp_iv
      attack_iv
      special_attack_iv
      defense_iv
      special_defense_iv
      speed_iv
    }
  }
}
`;

export const QUERY_SINGLE_TEAM = gql`
query getSingleTeam($teamId: ID!) {
  team(teamId: $teamId) {
    _id
    name
    userCreator
    pokemon {
      level
      name
      move_1
      move_2
      move_3
      move_4
      ability
      sprite
      types
      nature
    }
  }
}
`;