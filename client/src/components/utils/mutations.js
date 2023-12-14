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
  mutation createTeam($name: String!, $pokemon: [PokemonInput!]!) {
    createTeam(name: $name, pokemon: $pokemon) {
      _id
      name
      userCreator
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
  mutation addPokemon($teamId: ID!, $pokeDexNo: Int!) {
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
  mutation updatePokemon($teamId: ID!, $pokeId: ID!, $level: Int!, $move_1: String!, $move_2: String!, $move_3: String!, $move_4: String!, $ability: String!, $item: String!, $hp_ev: Int!, $attack_ev: Int!, $special_attack_ev: Int!, $defense_ev: Int!, $special_defense_ev: Int!, $speed_ev: Int!, $hp_iv: Int!, $attack_iv: Int!, $special_attack_iv: Int!, $defense_iv: Int!, $special_defense_iv: Int!, $speed_iv: Int!) {
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