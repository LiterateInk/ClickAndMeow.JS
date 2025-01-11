import { defaultFetcher, type Fetcher, getCookiesFromResponse } from "@literate.ink/utilities";
import { Request } from "~/core/request";
import { parse } from "node-html-parser";
import { Session } from "~/models";
import { BASE_URL } from "~/const/baseUrl";

export const loginCredentials = async (username: string, password: string, fetcher: Fetcher = defaultFetcher): Promise<Session> => {
  const loginPageRequest = new Request("/connexion");
  const loginPageResponse = await loginPageRequest.send(fetcher);

  const document = parse(loginPageResponse.content);

  const csrfInput = document.querySelector("input[name='_csrf_token']");
  const csrfToken = csrfInput!.getAttribute("value");
  const sessionId = getCookiesFromResponse(loginPageResponse).find((el) => el.startsWith("PHPSESSID"))!.split("=")[1];

  const session: Session = {id: sessionId, fetcher};

  const loginRequest = new Request("/login-mycheck", "manual");
  loginRequest.setSession(session);
  loginRequest.setFormData(`_csrf_token=${csrfToken}&_username=${username}&_password=${password}`);

  const loginResponse = await loginRequest.send(fetcher);

  if ((loginResponse.headers as Headers).get("Location") != BASE_URL + "/") {
    throw "Invalid credentials";
  }

  const newSessionId = getCookiesFromResponse(loginResponse).find((el) => el.startsWith("PHPSESSID"))!.split("=")[1];
  const newSession: Session = {
    id: newSessionId,
    fetcher
  };

  return newSession;
};
