import { parse } from "node-html-parser";

import type { Dishes, Establishment, Menu, Session } from "~/models";

import { isAuthenticated } from "~/core/check-auth";
import { InvalidSessionError } from "~/core/errors";
import { Request } from "~/core/request";

export const getMenus = async (session: Session, establishment: Establishment): Promise<Array<Menu>> => {
  const today = new Date();

  const request = new Request(establishment.url + "/" + today.getFullYear() + "/" + today.getMonth() + "/" + today.getDate());
  request.useSession(session);

  const response = await request.send(session.fetcher);
  if (!isAuthenticated(response)) {
    throw new InvalidSessionError();
  }

  const document = parse(response.content);
  const options = document.querySelectorAll("#select_menu_repas>option");

  const menus: Array<Menu> = [];

  for (const node of options) {
    menus.push({
      name: node.textContent.trim(),
      url: "/" + node.getAttribute("value")!.split("/").slice(1, 4).join("/")
    });
  }

  return menus;
};

export const getMenuDishes = async (session: Session, menu: Menu, date: Date): Promise<Dishes> => {
  const request = new Request(menu.url + "/" + date.getFullYear() + "/" + (date.getMonth() + 1).toString().padStart(2, "0") + "/" + date.getDate().toString().padStart(2, "0") );
  request.useSession(session);

  const response = await request.send(session.fetcher);
  if (!isAuthenticated(response)) {
    throw new InvalidSessionError();
  }

  const document = parse(response.content);

  const dishContainers = document.querySelectorAll(".menu_composante_container");

  const entry: Array<string> = [];
  const side: Array<string> = [];
  const main: Array<string> = [];
  const dairy: Array<string> = [];
  const dessert: Array<string> = [];

  for (const container of dishContainers) {
    const titleContainer = container.querySelector(".menu_composante_title")!;
    const title = titleContainer.textContent.split("-")[1].trim();

    const dishesContainer = container.querySelectorAll(".menu-composante-libelle");
    const dishes = dishesContainer.map((node) => node.textContent.trim());

    switch (title) {
      case "Dessert":
        dessert.push(...dishes);
        break;
      case "Garniture":
        side.push(...dishes);
        break;
      case "Hors d'oeuvre":
        entry.push(...dishes);
        break;
      case "Plat":
        main.push(...dishes);
        break;
      case "Produit Laitier":
        dairy.push(...dishes);
        break;
    }
  }

  return {
    dairy,
    dessert,
    entry,
    main,
    side
  };
};
