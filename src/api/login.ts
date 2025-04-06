import { defaultFetcher, type Fetcher, getCookiesFromResponse } from "@literate.ink/utilities";
import { Request } from "~/core/request";
import { parse } from "node-html-parser";
import { Session } from "~/models";
import { AccountNotYetActivatedError, InvalidCredentialsError, UnknownError } from "~/core/errors";
import { LOGIN_PAGE_PATH, SESSION_COOKIE } from "~/core/constants";
import { isAuthenticated } from "~/core/check-auth";

export const login = async (username: string, password: string, fetcher: Fetcher = defaultFetcher): Promise<Session> => {
  let request = new Request(LOGIN_PAGE_PATH);

  let response = await request.send(fetcher);
  const document = parse(response.content);

  const csrfInput = document.querySelector("input[name='_csrf_token']");
  const csrfToken = csrfInput!.getAttribute("value")!;

  let phpSessId = getCookiesFromResponse(response)
    .find((el) => el.startsWith(SESSION_COOKIE))!.split("=")[1];

  let session = new Session(phpSessId, fetcher);

  request = new Request("/login-mycheck");
  request.useSession(session);

  const form = new URLSearchParams();
  form.set("_csrf_token", csrfToken);
  form.set("_username", username);
  form.set("_password", password);

  request.setFormData(form);

  response = await request.send(fetcher);

  if (!isAuthenticated(response)) {
    request = new Request(LOGIN_PAGE_PATH);
    request.useSession(session);

    response = await request.send(fetcher);
    const document = parse(response.content);
    const errorMessage = document.querySelector(".alert.alert-danger");

    if (errorMessage) {
      const errorText = errorMessage.textContent;
      if (errorText.includes("Nom d'utilisateur ou mot de passe incorrect")) {
        throw new InvalidCredentialsError();
      }

      if (errorText.includes("Votre compte n'a pas encore été activé")) {
        throw new AccountNotYetActivatedError();
      }
    }

    throw new UnknownError();
  }

  phpSessId = getCookiesFromResponse(response)
    .find((el) => el.startsWith(SESSION_COOKIE))!.split("=")[1];

  session.phpSessId = phpSessId;
  return session;
};
