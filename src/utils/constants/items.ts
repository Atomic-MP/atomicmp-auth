// A Map data structure

import Ammo from "../../models/Ammo";
import Consumable from "../../models/Consumable";
import Currency from "../../models/Currency";
import Equipment from "../../models/Equipment";
import Item from "../../models/Item";
import Weapon from "../../models/Weapon";
import itemsFile from "./items.json";

const weapons = new Map<string, Weapon>();
const equipment = new Map<string, Equipment>();
const consumables = new Map<string, Consumable>();
const miscellaneous = new Map<string, Item>();
const ammo = new Map<string, Ammo>();
const currency = new Map<string, Currency>();
const itemsMap = new Map<
  string,
  Weapon | Equipment | Consumable | Item | Ammo | Currency
>();

itemsFile.forEach((item) => {
  let entity;
  /**
   * I tried to clean this up but TS break the logic...
   * This is functional but fugly
   */
  // Take the item and turn it into the appropriate class
  if (item.ItemType === "Consumable") {
    entity = new Consumable(item);
    consumables.set(item.ID, entity);
  } else if (item.ItemType === "Miscellaneous") {
    entity = new Item(item);
    miscellaneous.set(item.ID, entity);
  } else if (item.ItemType === "Equipment") {
    entity = new Equipment(item);
    equipment.set(item.ID, entity);
  } else if (item.ItemType === "Weapon") {
    entity = new Weapon(item);
    weapons.set(item.ID, entity);
  } else if (item.ItemType === "Ammo") {
    entity = new Ammo(item);
    ammo.set(item.ID, entity);
  } else if (item.ItemType === "Currency") {
    entity = new Currency(item);
    currency.set(item.ID, entity);
  } else {
    throw Error("Unknown item type " + item.ItemType);
  }
  itemsMap.set(item.ID, entity);
});

export {
  itemsMap as items,
  weapons,
  equipment,
  consumables,
  miscellaneous,
  ammo,
  currency,
};
