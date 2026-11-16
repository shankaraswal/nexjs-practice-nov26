export type UserDocument = {
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
};

export type PublicUser = {
  id: string;
  name: string;
  createdAt: string;
};
