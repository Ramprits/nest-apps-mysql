import { hashSync, compareSync, genSaltSync } from 'bcrypt';

export const hashPassword = (password: string): string => {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
};

export const compareHashedPassword = (
  plainPassword: string,
  userPassword: string,
): boolean => {
  return compareSync(plainPassword, userPassword);
};
