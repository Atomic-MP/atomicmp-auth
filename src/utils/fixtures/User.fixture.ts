import faker from "faker";
import User, {IUser} from "../../models/User";


export default function (args?: Partial<IUser>) {
  const config = Object.assign({
    user_id: faker.random.number(),
    username: faker.name.firstName(),
    role: faker.random.number(),
    faction: faker.random.number(),
    health: faker.random.number(),
    hunger: faker.random.number(),
    thirst: faker.random.number(),
    head: faker.random.number(),
    hair: faker.random.number(),
    hair_color: faker.random.number(),
    is_male: faker.random.boolean(),
    nickname: faker.name.firstName(),
    x_pos: faker.random.number(),
    y_pos: faker.random.number(),
    z_pos: faker.random.number(),
    inventory: []
  }, args)

  return new User(config)
}