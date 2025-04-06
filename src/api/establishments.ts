import { parse } from "node-html-parser";

import type { Establishment, Session } from "~/models";

import { isAuthenticated } from "~/core/check-auth";
import { InvalidSessionError } from "~/core/errors";
import { Request } from "~/core/request";

export const getEstablishments = async (session: Session): Promise<Array<Establishment>> => {
  const request = new Request("/mesmenus");
  request.useSession(session);

  const response = await request.send(session.fetcher);
  if (!isAuthenticated(response)) {
    throw new InvalidSessionError();
  }

  const document = parse(response.content);
  const options = document.querySelectorAll("#select_menu_etablissement>option");

  const establishments: Array<Establishment> = [];

  for (const node of options) {
    establishments.push({
      name: node.textContent.trim(),
      url: "/" + node.getAttribute("value")!.split("/").slice(1, 4).join("/")
    });
  }

  return establishments;
};
