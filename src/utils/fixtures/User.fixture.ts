import faker from "faker";
import User, {IUser} from "../../models/User";

export default function(args?: IUser) {
  const defaults = {
    faction: faker.random.number(),
    hair: faker.random.number(),
    hair_color: faker.random.number(),
    head: faker.random.number(),
    health: faker.random.number(),
    hunger: faker.random.number(),
    inventory: [],
    is_male: faker.random.boolean(),
    nickname: faker.name.firstName(),
    role: faker.random.number(),
    rotation: faker.random.number(360),
    thirst: faker.random.number(),
    user_id: faker.random.number(),
    username: faker.name.firstName(),
    x_pos: faker.random.number(),
    y_pos: faker.random.number(),
    z_pos: faker.random.number(),
  };

  const config = Object.assign(defaults, args);

  return new User(config);
}
