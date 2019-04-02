// A Map data structure

import Ammo from "../../models/Ammo";
import Consumable from "../../models/Consumable";
import Currency from "../../models/Currency";
import Equipment from "../../models/Equipment";
import Item from "../../models/Item";
import Weapon from "../../models/Weapon";
import itemsFile from "./items-file.json";

const weapons = new Map<string, Weapon>();
const equipment = new Map<string, Equipment>();
const consumables = new Map<string, Consumable>();
const miscellaneous = new Map<string, Item>();
const ammo = new Map<string, Ammo>();
const currency = new Map<string, Currency>();
const items = new Map<
  string,
  Weapon | Equipment | Consumable | Item | Ammo | Currency
>();

itemsFile.forEach((item) => {
  let entity;

  const itemType: string = item.ItemType.trim();
  switch (itemType) {
    case "Consumable": {
      entity = new Consumable(item);
      consumables.set(item.ID, entity);
      break;
    }
    case "Miscellaneous": {
      entity = new Item(item);
      miscellaneous.set(item.ID, entity);
      break;
    }
    case "Equipment": {
      entity = new Equipment(item);
      equipment.set(item.ID, entity);
      break;
    }
    case "Weapon": {
      entity = new Weapon(item);
      weapons.set(item.ID, entity);
      break;
    }
    case "Ammo": {
      entity = new Ammo(item);
      ammo.set(item.ID, entity);
      break;
    }
    case "Currency": {
      entity = new Currency(item);
      currency.set(item.ID, entity);
      break;
    }
    default: {
      throw Error(`Unknown item type: ${itemType}`);
    }
  }
  items.set(item.ID, entity);
});

export {
  items,
  weapons,
  equipment,
  consumables,
  miscellaneous,
  ammo,
  currency,
};
