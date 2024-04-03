import { LoginForm } from "./login-form.model";

export interface RegistrationForm extends LoginForm{
  name: string;
  email: string;
}
