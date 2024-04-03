export class User {
  constructor(
    public username: string,
    public name: string,
    public email: string,
    public user_id?: string,
    public registration_date?: string
  ) {}
}
