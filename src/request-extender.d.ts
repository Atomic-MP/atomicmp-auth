declare namespace Express {
  export interface Request {
    user: any;
    isAuthenticated: () => boolean;
    logout: () => void;
  }
}
