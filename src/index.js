const { ApolloServer } = require("apollo-server");
const fs = require('fs');
const path = require('path');
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
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    users: () => users,
  },
  User: {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    surname: (parent) => parent.surname,
    profession: (parent) => parent.profession,
    onvacation: (parent) => parent.onvacation,
  },
};

// 3
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
