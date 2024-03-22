type SignedUser = {
  id: number;
};

declare namespace Express {
  export interface Request {
    user: SignedUser;
  }
}
