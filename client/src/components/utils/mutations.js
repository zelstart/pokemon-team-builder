import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_TEAM = gql`
  mutation createTeam($name: String!) {
    createTeam(name: $name) {
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

export const UPDATE_TEAM = gql`
  mutation updateTeam($teamId: ID!, $name: String!) {
    updateTeam(teamId: $teamId, name: $name) {
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

export const REMOVE_TEAM = gql`
  mutation removeTeam($teamId: ID!) {
    removeTeam(teamId: $teamId) {
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

export const ADD_POKEMON = gql`
  mutation addPokemon($teamId: ID!, $pokeDexNo: Number!) {
    addPokemon(teamId: $teamId, pokeDexNo: $pokeDexNo) {
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

export const REMOVE_POKEMON = gql`
  mutation removePokemon($teamId: ID!, $pokeId: ID!) {
    removePokemon(teamId: $teamId, pokeId: $pokeId) {
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

export const UPDATE_POKEMON = gql`
  mutation updatePokemon($teamId: ID!, $pokeId: ID!, $level: Number!, $move_1: String!, $move_2: String!, $move_3: String!, $move_4: String!, $ability: String!, $item: String!, $hp_ev: Number!, $attack_ev: Number!, $special_attack_ev: Number!, $defense_ev: Number!, $special_defense_ev: Number!, $speed_ev: Number!, $hp_iv: Number!, $attack_iv: Number!, $special_attack_iv: Number!, $defense_iv: Number!, $special_defense_iv: Number!, $speed_iv: Number!) {
    updatePokemon(teamId: $teamId, pokeId: $pokeId, level: $level, move_1: $move_1, move_2: $move_2, move_3: $move_3, move_4: $move_4, ability: $ability, item: $item, hp_ev: $hp_ev, attack_ev: $attack_ev, special_attack_ev: $special_attack_ev, defense_ev: $defense_ev, special_defense_ev: $special_defense_ev, speed_ev: $speed_ev, hp_iv: $hp_iv, attack_iv: $attack_iv, special_attack_iv: $special_attack_iv, defense_iv: $defense_iv, special_defense_iv: $special_defense_iv, speed_iv: $speed_iv) {
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