'use strict';
// A Map data structure
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
exports.__esModule = true;
var itemsFile = require('./items.json');
/**
 * @class Item
 */
var Item = /** @class */ (function() {
  function Item(item) {
    this.Amount = 0;
    this.IsStackable = false;
    this.MaxStackSize = 0;
    this.IsDroppable = true;
    this.Value = 0;
    this.Weight = 0;
    this.BuyPrice = 0;
    this.SalePrice = 0;
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
  return Item;
})();
var Consumable = /** @class */ (function(_super) {
  __extends(Consumable, _super);
  function Consumable(item) {
    var _this = _super.call(this, item) || this;
    _this.Health = 0;
    _this.Duration = 0;
    _this.Hunger = 0;
    _this.Thirst = 0;
    _this.Health = item.Health;
    _this.Duration = item.Duration;
    _this.Hunger = item.Hunger;
    _this.Thirst = item.Thirst;
    return _this;
  }
  return Consumable;
})(Item);
/**
 * @class Equipment
 * @returns Armor, Hats, etc
 */
var Equipment = /** @class */ (function(_super) {
  __extends(Equipment, _super);
  function Equipment(item) {
    var _this = _super.call(this, item) || this;
    _this.Strength = 0;
    _this.Perception = 0;
    _this.Endurance = 0;
    _this.Charisma = 0;
    _this.Intelligence = 0;
    _this.Agility = 0;
    _this.Luck = 0;
    _this.Armor_Head = 0;
    _this.Armor_Outfit = 0;
    _this.Armor_Chest = 0;
    _this.Armor_LeftLeg = 0;
    _this.Armor_RightLeg = 0;
    _this.Armor_LeftArm = 0;
    _this.Armor_RightArm = 0;
    _this['Fill_Head?'] = false;
    _this['Fill_Eyewear?'] = false;
    _this['Fill_Chest?'] = false;
    _this['Fill_Outfit?'] = false;
    _this['Fill_RArm?'] = false;
    _this['Fill_LArm?'] = false;
    _this['Fill_RLeg?'] = false;
    _this['Fill_LLeg?'] = false;
    _this['HideHair?'] = false;
    _this['HideHairline?'] = false;
    _this.Strength = item.Strength;
    _this.Perception = item.Perception;
    _this.Endurance = item.Endurance;
    _this.Charisma = item.Charisma;
    _this.Intelligence = item.Intelligence;
    _this.Agility = item.Agility;
    _this.Luck = item.Luck;
    _this.EquipmentMesh = item.EquipmentMesh;
    _this.EquipmentType = item.EquipmentType;
    _this.EquipmentSlot = item.EquipmentSlot;
    _this['1PEquipmentMesh'] = item['1PEquipmentMesh'];
    _this.FemaleEquipmentMesh = item.FemaleEquipmentMesh;
    _this.Female1PEquipmentMesh = item.Female1PEquipmentMesh;
    _this.Armor_Head = item.Armor_Head;
    _this.Armor_Outfit = item.Armor_Outfit;
    _this.Armor_Chest = item.Armor_Chest;
    _this.Armor_LeftLeg = item.Armor_LeftLeg;
    _this.Armor_RightLeg = item.Armor_RightLeg;
    _this.Armor_LeftArm = item.Armor_LeftArm;
    _this.Armor_RightArm = item.Armor_RightArm;
    _this['Fill_Head?'] = item['Fill_Head?'];
    _this['Fill_Eyewear?'] = item['Fill_Eyewear?'];
    _this['Fill_Chest?'] = item['Fill_Chest?'];
    _this['Fill_Outfit?'] = item['Fill_Outfit?'];
    _this['Fill_RArm?'] = item['Fill_RArm?'];
    _this['Fill_LArm?'] = item['Fill_LArm?'];
    _this['Fill_RLeg?'] = item['Fill_RLeg?'];
    _this['Fill_LLeg?'] = item['Fill_LLeg?'];
    _this['HideHair?'] = item['HideHair?'];
    _this['HideHairline?'] = item['HideHairline?'];
    return _this;
  }
  return Equipment;
})(Item);
/**
 * @class Weapon
 */
var Weapon = /** @class */ (function(_super) {
  __extends(Weapon, _super);
  function Weapon(item) {
    var _this = _super.call(this, item) || this;
    _this.WeaponActorClass = item.WeaponActorClass;
    _this.WeaponType = item.WeaponType;
    _this.AmmoType = item.AmmoType;
    _this.AimedFOV = item.AimedFOV;
    _this.ZoomedFOV = item.ZoomedFOV;
    _this['ZRecoilMIn/Max'] = item['ZRecoilMIn/Max'];
    _this['YRecoilMin/Max'] = item['YRecoilMin/Max'];
    _this['Up/DownSpreadMin'] = item['Up/DownSpreadMin'];
    _this['Right/LeftSpreadMin'] = item['Right/LeftSpreadMin'];
    _this['AimedUp/DownSpread'] = item['AimedUp/DownSpread'];
    _this['AimedRight/LeftSpread'] = item['AimedRight/LeftSpread'];
    _this.DefaultMagFull = item.DefaultMagFull;
    _this.MagAmount = item.MagAmount;
    return _this;
  }
  return Weapon;
})(Item);
/**
 * @class Ammo
 */
var Ammo = /** @class */ (function(_super) {
  __extends(Ammo, _super);
  function Ammo(item) {
    var _this = _super.call(this, item) || this;
    _this.AmmoType = item.AmmoType;
    return _this;
  }
  return Ammo;
})(Item);
/**
 * @class Currency
 */
var Currency = /** @class */ (function(_super) {
  __extends(Currency, _super);
  function Currency(item) {
    return _super.call(this, item) || this;
  }
  return Currency;
})(Item);
var weapons = new Map();
exports.weapons = weapons;
var equipment = new Map();
exports.equipment = equipment;
var consumables = new Map();
exports.consumables = consumables;
var miscellaneous = new Map();
exports.miscellaneous = miscellaneous;
var ammo = new Map();
exports.ammo = ammo;
var currency = new Map();
exports.currency = currency;
var itemsMap = new Map();
exports.items = itemsMap;
itemsFile.forEach(function(item) {
  var entity;
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
