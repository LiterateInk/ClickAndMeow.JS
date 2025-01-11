import { Request } from "~/core/request";
import { Session, Establishment } from "~/models";
import { parse } from "node-html-parser";
import { BASE_URL } from "~/const/baseUrl";

export const getEstablishments = async (session: Session): Promise<Establishment[]> => {
  const menuPageRequest = new Request("/mesmenus", "follow");
  menuPageRequest.setSession(session);

  const menuPageResponse = await menuPageRequest.send(session.fetcher);
  const document = parse(menuPageResponse.content);

  const establishmentSelectOptions = document.querySelectorAll("#select_menu_etablissement>option");

  const establishments: Establishment[] = [];

  for (const el of establishmentSelectOptions) {
    establishments.push({
      name: el.textContent.trim(),
      url: "/" + el.getAttribute("value")!.split("/").slice(1, 4).join("/")
    });
  }

  return establishments;
};
