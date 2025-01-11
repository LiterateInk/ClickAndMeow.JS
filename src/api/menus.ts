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

export const getMenuDishes = async (session: Session, menu: Menu, date: Date) => {
  const menuPageRequest = new Request(menu.url + "/" + date.getFullYear() + "/" + (date.getMonth() + 1).toString().padStart(2, "0") + "/" + date.getDate().toString().padStart(2, "0") );
  menuPageRequest.setSession(session);

  const menuPageResponse = await menuPageRequest.send(session.fetcher);

  const document = parse(menuPageResponse.content);

  const dishContainers = document.querySelectorAll(".menu_composante_container");

  const entry: string[] = [];
  const side: string[] = [];
  const main: string[] = [];
  const dairy: string[] = [];
  const dessert: string[] = [];

  for (const container of dishContainers) {
    const titleEl = container.querySelector(".menu_composante_title");
    const title = titleEl!.textContent.split("-")[1].trim();

    const dishesEl = container.querySelectorAll(".menu-composante-libelle");

    const dishes: string[] = [];

    for (const dishEl of dishesEl) {
      dishes.push(dishEl.textContent.trim());
    }

    switch (title) {
      case "Hors d'oeuvre":
        entry.push(...dishes);
        break;
      case "Plat":
        main.push(...dishes);
        break;
      case "Garniture":
        side.push(...dishes);
        break;
      case "Produit Laitier":
        dairy.push(...dishes);
        break;
      case "Dessert":
        dessert.push(...dishes);
        break;
    }
  }

  return {
    entry,
    side,
    main,
    dairy,
    dessert
  };
};
