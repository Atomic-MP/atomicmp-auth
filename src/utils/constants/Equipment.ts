// tslint:disable: variable-name
import Item from "./Item";

/**
 * @class Equipment
 * @returns Armor, Hats, etc
 */
class Equipment extends Item {
  public readonly Strength: number = 0;
  public readonly Perception: number = 0;
  public readonly Endurance: number = 0;
  public readonly Charisma: number = 0;
  public readonly Intelligence: number = 0;
  public readonly Agility: number = 0;
  public readonly Luck: number = 0;
  public readonly EquipmentMesh: string;
  public readonly EquipmentType: string;
  public readonly EquipmentSlot: string;
  public readonly "1PEquipmentMesh": string;
  public readonly FemaleEquipmentMesh: string;
  public readonly Female1PEquipmentMesh: string;
  public readonly Armor_Head: number = 0;
  public readonly Armor_Outfit: number = 0;
  public readonly Armor_Chest: number = 0;
  public readonly Armor_LeftLeg: number = 0;
  public readonly Armor_RightLeg: number = 0;
  public readonly Armor_LeftArm: number = 0;
  public readonly Armor_RightArm: number = 0;
  public readonly "Fill_Head?": boolean = false;
  public readonly "Fill_Eyewear?": boolean = false;
  public readonly "Fill_Chest?": boolean = false;
  public readonly "Fill_Outfit?": boolean = false;
  public readonly "Fill_RArm?": boolean = false;
  public readonly "Fill_LArm?": boolean = false;
  public readonly "Fill_RLeg?": boolean = false;
  public readonly "Fill_LLeg?": boolean = false;
  public readonly "HideHair?": boolean = false;
  public readonly "HideHairline?": boolean = false;

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
    this["1PEquipmentMesh"] = item["1PEquipmentMesh"];
    this.FemaleEquipmentMesh = item.FemaleEquipmentMesh;
    this.Female1PEquipmentMesh = item.Female1PEquipmentMesh;
    this.Armor_Head = item.Armor_Head;
    this.Armor_Outfit = item.Armor_Outfit;
    this.Armor_Chest = item.Armor_Chest;
    this.Armor_LeftLeg = item.Armor_LeftLeg;
    this.Armor_RightLeg = item.Armor_RightLeg;
    this.Armor_LeftArm = item.Armor_LeftArm;
    this.Armor_RightArm = item.Armor_RightArm;
    this["Fill_Head?"] = item["Fill_Head?"];
    this["Fill_Eyewear?"] = item["Fill_Eyewear?"];
    this["Fill_Chest?"] = item["Fill_Chest?"];
    this["Fill_Outfit?"] = item["Fill_Outfit?"];
    this["Fill_RArm?"] = item["Fill_RArm?"];
    this["Fill_LArm?"] = item["Fill_LArm?"];
    this["Fill_RLeg?"] = item["Fill_RLeg?"];
    this["Fill_LLeg?"] = item["Fill_LLeg?"];
    this["HideHair?"] = item["HideHair?"];
    this["HideHairline?"] = item["HideHairline?"];
  }
}

export default Equipment;
