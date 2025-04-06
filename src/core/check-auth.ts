import { getHeaderFromResponse, type Response } from "@literate.ink/utilities";

import { BASE_URL, LOGIN_PAGE_PATH } from "./constants";

export const isAuthenticated = (response: Response): boolean => {
  return getHeaderFromResponse(response, "location") !== BASE_URL + LOGIN_PAGE_PATH;
};
