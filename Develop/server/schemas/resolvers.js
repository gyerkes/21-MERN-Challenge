const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async () => {
            return User.find().populate("saveBooks")
        }
    }

    Mutation: {
        login: async (parent, { email, password}) => {
            const user = await User.findOne({ email })
            if (!user) {
                throw AuthenticationError
            }

            const correctPw = await user.isCorrectPassword(password)
            if (!correctPassword) {
                throw AuthenticationError
            }

            const token = signToken(user)

            return { token, user}
        }

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password })
            const token = signToken(user)
            return { token, user}
        }

        saveBook: async (parent, { data }, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: { savedBooks: data }},
                    {
                        new:true,
                        runValidators: true
                    }
                )
                return updateUser
            }
        }

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $pull: { savedBooks: { bookId: bookId }}},
                    { new: ture }
                )
                return updateUser
            }
        }
    }
}

module.exports = resolvers

