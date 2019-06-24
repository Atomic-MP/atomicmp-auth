// tslint:disable: variable-name

class Faction {
  public readonly faction_id: number;
  public readonly faction_name: string;
  public readonly color: string = "#FFFFFF";
  public readonly role_id: string;

  constructor(obj: IFaction) {
    this.faction_id = obj.faction_id;
    this.faction_name = obj.faction_name;
    this.color = obj.color;
    this.role_id = obj.role_id;
  }
}

export default Faction;
