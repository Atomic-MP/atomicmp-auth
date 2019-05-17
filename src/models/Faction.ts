import { IUser } from "./User";

// tslint:disable: variable-name

interface IFaction {
  faction_id: number;
  faction_name: string;
  color: string;
  role_id: string;
  users: Array<Partial<IUser>>;
}

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
export { IFaction };
