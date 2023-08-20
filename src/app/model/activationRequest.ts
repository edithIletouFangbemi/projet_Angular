import { ActivationModule } from "./activationModule";

export class ActivationRequest{
  codeAgence!: string;
  codeInst!: string;
  codeProduit!: string;
  modules!: ActivationModule[]
}
