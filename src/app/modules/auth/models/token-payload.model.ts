export interface TokenPayload {
  fresh: boolean;
  iat: number;
  jti: string;
  type: string;
  sub: string;
  nbf: number;
  csrf: string;
  exp: number;
  cap: string;
}
