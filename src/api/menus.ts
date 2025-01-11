import { Request } from "~/core/request";
import { Establishment, Session, Menu } from "~/models";
import { parse } from "node-html-parser";

export const getMenus = async (session: Session, establishment: Establishment) => {
  const today = new Date();

  const menuPageRequest = new Request(establishment.url + "/" + today.getFullYear() + "/" + today.getMonth() + "/" + today.getDate());
  menuPageRequest.setSession(session);

  const menuPageResponse = await menuPageRequest.send(session.fetcher);

  const document = parse(menuPageResponse.content);

  const menuSelectOptions = document.querySelectorAll("#select_menu_repas>option");

  const menus: Menu[] = [];

  for (const el of menuSelectOptions) {
    menus.push({
      name: el.textContent.trim(),
      url: "/" + el.getAttribute("value")!.split("/").slice(1, 4).join("/")
    });
  }

  return menus;
};
