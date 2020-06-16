const { NODE_ENV } = process.env;

NODE_ENV &&
  require("dotenv").config({
    path: `${__dirname}/../../.env.${NODE_ENV}`,
  });
