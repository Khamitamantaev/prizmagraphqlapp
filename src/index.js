const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const { getUserId } = require("./utils");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");

const resolvers = {
  Query,
  Mutation,
  User,
};
// const resolvers = {
//   Query: {
//     info: () => `This is the API of a Hackernews Clone`,
//     users: async (parent, args, context) => {
//       return context.prisma.user.findMany();
//     },
//   },
//   Mutation: {
//     post: (parent, args, context) => {
//       const newUser = context.prisma.user.create({
//         data: {
//           name: args.name,
//           email: args.email,
//           password: args.password,
//           surname: args.surname,
//           profession: args.profession,
//           onvacation: args.onvacation,
//         },
//       });

//       return newUser;
//     },
//   },
// };

// 3
const prisma = new PrismaClient();
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
