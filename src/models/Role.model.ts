import { Schema, model} from 'mongoose';

const Role = new Schema({
  value: {
    type: String,
    unique: true,
    default: 'USER',
  },
});

export const RoleModel = model('Role', Role);