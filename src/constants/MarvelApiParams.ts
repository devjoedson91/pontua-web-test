import md5 from "md5";

export const TS = Number(new Date());
export const PUBLICKEY = "46414fb6b12031016e9135c92822ea61";
const PRIVATEKEY = "afb04c92c8d5c6e578901ba9d8e95a17ec003af2";
export const hash = md5(TS + PRIVATEKEY + PUBLICKEY);
