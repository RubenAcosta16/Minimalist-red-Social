export type register = {
  name: string;
  password: string;
  email: string;
};

export type update = {
  id: string;
  name: string;
  password: string;
  email: string;
};

export type login = { password: string; email: string };
