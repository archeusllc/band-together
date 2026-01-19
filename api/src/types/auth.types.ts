import { User } from "@band-together/shared";
import { Cookie } from "elysia";

export interface LoginParams {
  email: string;
  password: string;
  token: Cookie<unknown>;
  jwt: {
    sign: (payload: any) => Promise<string>;
    verify: (jwt?: string) => Promise<any>;
  };
  user: User;
}
