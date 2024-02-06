import { v4 as uuid } from "uuid";

type SigninRequestData = {
  email: string;
  password: string;
};

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function signnInRequest(data: SigninRequestData) {
  await delay();

  return {
    token: uuid(),
    user: {
      name: "Joedson Ferreira",
      email: "joedson.devel@gmail.com",
      avatar_url: "https://github.com/devjoedson91.png",
    },
  };
}

export async function recoverUserInformation() {
  await delay();

  return {
    token: uuid(),
    user: {
      name: "Joedson Ferreira",
      email: "joedson.devel@gmail.com",
      avatar_url: "https://github.com/devjoedson91.png",
    },
  };
}
