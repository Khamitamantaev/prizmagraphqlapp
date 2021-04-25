const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    users: async (parent, args, context) => {
      return context.prisma.user.findMany();
    },
  },
  Mutation: {
    post: (parent, args, context) => {
      const newUser = context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: args.password,
          surname: args.surname,
          profession: args.profession,
          onvacation: args.onvacation,
        },
      });

      return newUser;
    },
  },
};

// 3
const prisma = new PrismaClient();
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
