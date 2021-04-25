const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: {
      email: args.email,
      name: args.name,
      surname: args.surname,
      profession: args.profession,
      onvacation: args.onvacation,
      password: password,
    },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  // 1
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 3
  return {
    token,
    user,
  };
}

module.exports = {
  signup,
  login,
  post,
};

async function post(parent, args, context, info) {
  const { userId } = context;
  const password = await bcrypt.hash(args.password, 10);
  return await context.prisma.user.create({
    data: {
      name: args.name,
      surname: args.surname,
      email: args.email,
      password: password,
      profession: args.profession,
      onvacation: args.onvacation,
    },
  });
}
