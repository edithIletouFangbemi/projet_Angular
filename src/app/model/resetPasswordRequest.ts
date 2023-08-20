export class ResetPasswordRequest{
  verificationToken!: string;
  email!: string;
  lastname!: string;
  firstname!: string;
  oldPassword!: string;
  newPassword!: string;
}
