import { environment } from "./environment/environment.component";

export const baseApiConfig = {
  host:environment.serverUrl
}

export const apiConfig = {
  host : baseApiConfig.host,
}
