export class User {
    constructor(
        public name: string,
        public email: string,
        public username: string,
        public password?: string,
        public user_id?: string,
        public registration_date?: string
    ){}
}
