import faker from "faker";
import User from "../../models/User";

export default function(args?: Partial<IUser>) {
  const defaults: IUser = {
    created_at: faker.date.past(),
    discord_id: faker.random.word(),
    faction: faker.random.number(),
    hair: faker.random.number(),
    hair_color: faker.random.number(),
    head: faker.random.number(),
    health: faker.random.number(100),
    hunger: faker.random.number(100),
    inventory: [],
    is_male: faker.random.boolean(),
    last_seen: faker.date.past(),
    nickname: faker.name.firstName(),
    role: faker.random.number(5),
    rotation: faker.random.number(360),
    thirst: faker.random.number(100),
    user_id: faker.random.number(),
    username: faker.name.firstName(),
    x_pos: faker.random.number(),
    y_pos: faker.random.number(),
    z_pos: faker.random.number(),
  };

  const config = Object.assign(defaults, args);

  return new User(config);
}
