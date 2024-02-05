import md5 from "md5";

export const TS = Number(new Date());
export const PUBLICKEY = "ada630a40ced7b478901f44fb1fbdff6";
const PRIVATEKEY = "543e7b8d8fc7e90f2275edbb12ee32afa2ba4d01";
export const hash = md5(TS + PRIVATEKEY + PUBLICKEY);

// const PUBLICKEY = "46414fb6b12031016e9135c92822ea61";
// const PRIVATEKEY = "afb04c92c8d5c6e578901ba9d8e95a17ec003af2";
