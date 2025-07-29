/* eslint-disable */
export default async () => {
  const t = {
    ['./users/dto/user.read.dto']: await import('./users/dto/user.read.dto'),
  };
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./users/dto/user.create.dto'),
          {
            UserRequest: {
              email: { required: true, type: () => String },
              first_name: { required: true, type: () => String },
              last_name: { required: true, type: () => String },
              password: { required: true, type: () => String },
              phone: { required: true, type: () => String },
              address: { required: true, type: () => String },
              role_id: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./users/dto/user.update.dto'),
          {
            UserRequestUpdate: {
              email: { required: true, type: () => String },
              first_name: { required: true, type: () => String },
              last_name: { required: true, type: () => String },
              password: { required: true, type: () => String },
              identification: { required: true, type: () => String },
              phone: { required: true, type: () => String },
              address: { required: true, type: () => String },
              role_id: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./users/dto/user.read.dto'),
          {
            UserResponseDto: {
              id: { required: true, type: () => Number },
              email: { required: true, type: () => String },
              first_name: { required: true, type: () => String },
              last_name: { required: true, type: () => String },
              created_at: { required: true, type: () => Date },
              updated_at: { required: true, type: () => Date },
              phone: { required: true, type: () => String },
              address: { required: true, type: () => String },
              role_id: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./role/dto/create-role.dto'),
          {
            CreateRoleDto: {
              name: { required: true, type: () => String },
              permissions: { required: true, type: () => [Number] },
            },
          },
        ],
        [import('./role/dto/update-role.dto'), { UpdateRoleDto: {} }],
        [
          import('./role/dto/read-role.dto'),
          {
            ReadRoleDto: {
              id: { required: true, type: () => Number },
              name: { required: true, type: () => String },
              description: { required: true, type: () => String },
            },
          },
        ],
        [import('./role/entities/role.entity'), { Role: {} }],
      ],
      controllers: [
        [
          import('./app.controller'),
          { AppController: { getHello: { type: String } } },
        ],
        [
          import('./users/users.controller'),
          {
            UsersController: {
              create: { type: t['./users/dto/user.read.dto'].UserResponseDto },
              findAll: {},
              findOne: { type: t['./users/dto/user.read.dto'].UserResponseDto },
              update: { type: t['./users/dto/user.read.dto'].UserResponseDto },
              remove: { type: t['./users/dto/user.read.dto'].UserResponseDto },
            },
          },
        ],
        [
          import('./role/role.controller'),
          {
            RoleController: {
              create: { type: String },
              findAll: { type: String },
              findOne: { type: String },
              update: { type: String },
              remove: { type: String },
            },
          },
        ],
      ],
    },
  };
};
