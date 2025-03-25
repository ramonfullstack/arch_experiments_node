const users = [
  { email: 'pedro@qwkin.io', hashedPassword: 'foo' },
  { email: 'a@a', hashedPassword: 1 },
];
// eslint-disable-next-line @typescript-eslint/require-await
export const findUsersByEmailMongoose: (email: string) => Promise<unknown> = async (email) =>
  users.find((item) => item.email === email);
