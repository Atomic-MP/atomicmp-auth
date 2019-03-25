// tslint:disable: variable-name

import { HAIR_COLORS, HAIRS, HEADS } from "../utils/constants";
interface IAppearance {
  nickname: string;
  head: number;
  hair: number;
  hair_color: number;
  is_male: boolean;
}

class Appearance {
  public readonly nickname: string;
  public readonly head: number;
  public readonly hair: number;
  public readonly hair_color: number;
  public readonly is_male: boolean;
  constructor(obj: IAppearance) {
    if (
      obj.nickname === undefined ||
      obj.head === undefined ||
      obj.hair === undefined ||
      obj.hair_color === undefined ||
      obj.is_male === undefined
    ) {
      throw Error("Payload contains insufficient data");
    }
    if (obj.nickname.length > 24) {
      throw Error(`Nickname too long`);
    }
    if (obj.head < 1 || obj.head > HEADS) {
      throw Error(`Head ${obj.head} is malformed`);
    }

    if (obj.hair < 1 || obj.hair > HAIRS) {
      throw Error(`Hair ${obj.hair} is malformed`);
    }
    if (obj.hair_color < 1 || obj.hair_color > HAIR_COLORS) {
      throw Error(`Hair Color ${obj.hair_color} is malformed`);
    }
    if (typeof obj.is_male !== "boolean") {
      throw Error(`Sex ${obj.is_male} is malformed`);
    }
    this.nickname = obj.nickname;
    this.head = obj.head;
    this.hair = obj.hair;
    this.hair_color = obj.hair_color;
    this.is_male = obj.is_male;
  }
}

export default Appearance;
