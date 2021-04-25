const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");
let users = [
  {
    id: "user-0",
    name: "Khamit",
    surname: "Amantaev",
    profession: "Developer assistant",
    onvacation: true,
  },
  {
    id: "user-1",
    name: "Azamat",
    surname: "Amantaev",
    profession: "Manager",
    onvacation: false,
  },
  {
    id: "user-2",
    name: "Ildus",
    surname: "Klassov",
    profession: "Teacher",
    onvacation: false,
  },
];

// 2
let idCount = users.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    users: () => users,
  },
  Mutation: {
    post: (parent, args) => {
      const user = {
        id: `user-${idCount++}`,
        name: args.name,
        surname: args.surname,
        profession: args.profession,
        onvacation: args.onvacation,
      };
      users.push(user);
      return user;
    },
  },
};

// 3

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
