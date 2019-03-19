// A Map data structure

import * as itemsFile from './items.json';

/**
 * @class Item
 */
class Item {
  readonly ID: string;
  readonly Icon: string;
  readonly Name: string;
  readonly Description: string;
  readonly Quality: string;
  readonly ItemType: string;
  readonly Amount: number = 0;
  readonly IsStackable: boolean = false;
  readonly MaxStackSize: number = 0;
  readonly IsDroppable: boolean = true;
  readonly WorldMesh: string;
  readonly Value: number = 0;
  readonly Weight: number = 0;
  readonly BuyPrice: number = 0;
  readonly SalePrice: number = 0;
  readonly ShopCategory: string;

  constructor(item) {
    this.ID = item.ID;
    this.Icon = item.Icon;
    this.Name = item.Name;
    this.Description = item.Description;
    this.Quality = item.Quality;
    this.ItemType = item.ItemType;
    this.Amount = item.Amount;
    this.IsStackable = item.IsStackable;
    this.MaxStackSize = item.MaxStackSize;
    this.IsDroppable = item.IsDroppable;
    this.WorldMesh = item.WorldMesh;
    this.Value = item.Value;
    this.Weight = item.Weight;
    this.BuyPrice = item.BuyPrice;
    this.SalePrice = item.SalePrice;
    this.ShopCategory = item.ShopCategory;
  }
}

class Consumable extends Item {
  readonly Health: number = 0;
  readonly Duration: number = 0;
  readonly Hunger: number = 0;
  readonly Thirst: number = 0;
  constructor(item) {
    super(item);
    this.Health = item.Health;
    this.Duration = item.Duration;
    this.Hunger = item.Hunger;
    this.Thirst = item.Thirst;
  }
}

/**
 * @class Equipment
 * @returns Armor, Hats, etc
 */
class Equipment extends Item {
  readonly Strength: number = 0;
  readonly Perception: number = 0;
  readonly Endurance: number = 0;
  readonly Charisma: number = 0;
  readonly Intelligence: number = 0;
  readonly Agility: number = 0;
  readonly Luck: number = 0;
  readonly EquipmentMesh: string;
  readonly EquipmentType: string;
  readonly EquipmentSlot: string;
  readonly '1PEquipmentMesh': string;
  readonly FemaleEquipmentMesh: string;
  readonly Female1PEquipmentMesh: string;
  readonly Armor_Head: number = 0;
  readonly Armor_Outfit: number = 0;
  readonly Armor_Chest: number = 0;
  readonly Armor_LeftLeg: number = 0;
  readonly Armor_RightLeg: number = 0;
  readonly Armor_LeftArm: number = 0;
  readonly Armor_RightArm: number = 0;
  readonly 'Fill_Head?': boolean = false;
  readonly 'Fill_Eyewear?': boolean = false;
  readonly 'Fill_Chest?': boolean = false;
  readonly 'Fill_Outfit?': boolean = false;
  readonly 'Fill_RArm?': boolean = false;
  readonly 'Fill_LArm?': boolean = false;
  readonly 'Fill_RLeg?': boolean = false;
  readonly 'Fill_LLeg?': boolean = false;
  readonly 'HideHair?': boolean = false;
  readonly 'HideHairline?': boolean = false;

  constructor(item) {
    super(item);
    this.Strength = item.Strength;
    this.Perception = item.Perception;
    this.Endurance = item.Endurance;
    this.Charisma = item.Charisma;
    this.Intelligence = item.Intelligence;
    this.Agility = item.Agility;
    this.Luck = item.Luck;
    this.EquipmentMesh = item.EquipmentMesh;
    this.EquipmentType = item.EquipmentType;
    this.EquipmentSlot = item.EquipmentSlot;
    this['1PEquipmentMesh'] = item['1PEquipmentMesh'];
    this.FemaleEquipmentMesh = item.FemaleEquipmentMesh;
    this.Female1PEquipmentMesh = item.Female1PEquipmentMesh;
    this.Armor_Head = item.Armor_Head;
    this.Armor_Outfit = item.Armor_Outfit;
    this.Armor_Chest = item.Armor_Chest;
    this.Armor_LeftLeg = item.Armor_LeftLeg;
    this.Armor_RightLeg = item.Armor_RightLeg;
    this.Armor_LeftArm = item.Armor_LeftArm;
    this.Armor_RightArm = item.Armor_RightArm;
    this['Fill_Head?'] = item['Fill_Head?'];
    this['Fill_Eyewear?'] = item['Fill_Eyewear?'];
    this['Fill_Chest?'] = item['Fill_Chest?'];
    this['Fill_Outfit?'] = item['Fill_Outfit?'];
    this['Fill_RArm?'] = item['Fill_RArm?'];
    this['Fill_LArm?'] = item['Fill_LArm?'];
    this['Fill_RLeg?'] = item['Fill_RLeg?'];
    this['Fill_LLeg?'] = item['Fill_LLeg?'];
    this['HideHair?'] = item['HideHair?'];
    this['HideHairline?'] = item['HideHairline?'];
  }
}

/**
 * @class Weapon
 */
class Weapon extends Item {
  readonly WeaponActorClass: string;
  readonly WeaponType: string;
  readonly AmmoType: string;
  readonly AimedFOV: number;
  readonly ZoomedFOV: number;
  readonly 'ZRecoilMIn/Max': number[];
  readonly 'YRecoilMin/Max': number[];
  readonly 'Up/DownSpreadMin': number[];
  readonly 'Right/LeftSpreadMin': number[];
  readonly 'AimedUp/DownSpread': number[];
  readonly 'AimedRight/LeftSpread': number[];
  readonly DefaultMagFull: number;
  readonly MagAmount: number;
  constructor(item) {
    super(item);
    this.WeaponActorClass = item.WeaponActorClass;
    this.WeaponType = item.WeaponType;
    this.AmmoType = item.AmmoType;
    this.AimedFOV = item.AimedFOV;
    this.ZoomedFOV = item.ZoomedFOV;
    this['ZRecoilMIn/Max'] = item['ZRecoilMIn/Max'];
    this['YRecoilMin/Max'] = item['YRecoilMin/Max'];
    this['Up/DownSpreadMin'] = item['Up/DownSpreadMin'];
    this['Right/LeftSpreadMin'] = item['Right/LeftSpreadMin'];
    this['AimedUp/DownSpread'] = item['AimedUp/DownSpread'];
    this['AimedRight/LeftSpread'] = item['AimedRight/LeftSpread'];
    this.DefaultMagFull = item.DefaultMagFull;
    this.MagAmount = item.MagAmount;
  }
}

/**
 * @class Ammo
 */
class Ammo extends Item {
  readonly AmmoType: string;

  constructor(item) {
    super(item);
    this.AmmoType = item.AmmoType;
  }
}

/**
 * @class Currency
 */
class Currency extends Item {
  constructor(item) {
    super(item);
  }
}

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

itemsFile.forEach(item => {
  let entity;
  /**
   * I tried to clean this up but TS break the logic...
   * This is functional but fugly
   */
  // Take the item and turn it into the appropriate class
  if (item.ItemType === 'Consumable') {
    entity = new Consumable(item);
    consumables.set(item.ID, entity);
  } else if (item.ItemType === 'Miscellaneous') {
    entity = new Item(item);
    miscellaneous.set(item.ID, entity);
  } else if (item.ItemType === 'Equipment') {
    entity = new Equipment(item);
    equipment.set(item.ID, entity);
  } else if (item.ItemType === 'Weapon') {
    entity = new Weapon(item);
    weapons.set(item.ID, entity);
  } else if (item.ItemType === 'Ammo') {
    entity = new Ammo(item);
    ammo.set(item.ID, entity);
  } else if (item.ItemType === 'Currency') {
    entity = new Currency(item);
    currency.set(item.ID, entity);
  } else {
    throw Error('Unknown item type ' + item.ItemType);
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
