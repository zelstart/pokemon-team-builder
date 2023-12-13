const { User, Teams } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    teams: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Teams.find(params).sort({ createdAt: -1 });
    },
    team: async (parent, { teamId }) => {
      return Teams.findOne({ _id: teamId });
    },
  },
  Mutation: {
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    createTeam: async (parent, {name}, context) => {
      console.log("outside");
      if (context.user) {
        console.log("inside the if, for context.user")
        const teamName = name ? name : "";
        console.log(teamName);
        const team = await Teams.create({
          userCreator: context.user.username,
          name: teamName
        });
        console.log(team);

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { teams: team._id } },
          { new: true, }
        );
        console.log(user);

        return team;
      }
      throw AuthenticationError;
    },
    updateTeam: async (parent, { teamId, name }, context) => {
      if (context.user) {
        return Teams.findOneAndUpdate(
          { _id: teamId, userCreator: context.user.username },
          { $set: {name: name}, },
          { new: true, }
        );
      }
      throw AuthenticationError;
    },
    removeTeam: async (parent, { teamId }, context) => {
      if (context.user) {
        const team = await Teams.findOneAndDelete({
          _id: teamId,
          userCreator: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { teams: team._id } }
        );

        return team;
      }
      throw AuthenticationError;
    },
    addPokemon: async (parent, { teamId, pokeDexNo }, context) => {
      if (context.user) {
        const pokemon = {
          pokeDexNo: pokeDexNo
        }
        return Teams.findOneAndUpdate(
          { _id: teamId, userCreator: context.user.username },
          { $push: { pokemon: pokemon } },
          { new: true, runValidators: true }
        );
      }
      throw AuthenticationError;
    },
    updatePokemon: async (parent, { teamId, pokeId, level, move_1, move_2, move_3, move_4, ability, item, hp_ev, attack_ev, special_attack_ev, defense_ev, special_defense_ev, speed_ev, attack_iv, special_attack_iv, defense_iv, special_defense_iv, speed_iv }, context) => {
      if (context.user) {
        // Find and update the team in the database
        return Teams.findOneAndUpdate(
          { teamId: teamId, userCreator: context.user.username, 'pokemon.pokeId': pokeId },
          {
            $set: {
              'pokemon.$.level': level,
              'pokemon.$.move_1': move_1,
              'pokemon.$.move_2': move_2,
              'pokemon.$.move_3': move_3,
              'pokemon.$.move_4': move_4,
              'pokemon.$.ability': ability,
              'pokemon.$.item': item,
              'pokemon.$.hp_ev': hp_ev,
              'pokemon.$.attack_ev': attack_ev,
              'pokemon.$.special_attack_ev': special_attack_ev,
              'pokemon.$.defense_ev': defense_ev,
              'pokemon.$.special_defense_ev': special_defense_ev,
              'pokemon.$.speed_ev': speed_ev,
              'pokemon.$.hp_iv': hp_iv,
              'pokemon.$.attack_iv': attack_iv,
              'pokemon.$.special_attack_iv': special_attack_iv,
              'pokemon.$.defense_iv': defense_iv,
              'pokemon.$.special_defense_iv': special_defense_iv,
              'pokemon.$.speed_iv': speed_iv,
            },
          },
          { new: true }
        );      
      }
      throw AuthenticationError;
    },
    removePokemon: async (parent, { teamId, pokeId }, context) => {
      if (context.user) {
        return Teams.findOneAndUpdate(
          { _id: teamId, userCreator: context.user.username },
          { $pull: { pokemon: {_id: pokeId} } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
