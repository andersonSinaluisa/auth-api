import { Command, CommandRunner, Option } from 'nest-commander';
import { UsersService } from './users.service';

interface UserCommandOptions {
  create?: boolean;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  role_id?: number;
  yes?: boolean;
}

@Command({ name: 'user', description: 'Comando para crud de usuarios' })
export class UserCommand extends CommandRunner {
  constructor(private readonly userService: UsersService) {
    super();
  }

  async run(_: string[], options: UserCommandOptions): Promise<void> {
    if (options?.create) {
      await this.createUser(options);
    }
  }

  @Option({ flags: '-c, --create', description: 'Crea un usuario' })
  parseCreate(): boolean {
    return true;
  }

  @Option({ flags: '-e, --email <email>', description: 'Correo electrónico' })
  parseEmail(val: string): string {
    return val;
  }

  @Option({ flags: '-n, --first_name <first_name>', description: 'Nombre' })
  parseFirstName(val: string): string {
    return val;
  }

  @Option({ flags: '-l, --last_name <last_name>', description: 'Apellido' })
  parseLastName(val: string): string {
    return val;
  }

  @Option({ flags: '-p, --phone <phone>', description: 'Teléfono' })
  parsePhone(val: string): string {
    return val;
  }

  @Option({ flags: '-a, --address <address>', description: 'Dirección' })
  parseAddress(val: string): string {
    return val;
  }

  @Option({ flags: '-r, --role_id <role_id>', description: 'ID del Rol' })
  parseRoleId(val: string): number {
    return parseInt(val, 10);
  }

  @Option({ flags: '-y, --yes', description: 'Confirma automáticamente' })
  parseYes(): boolean {
    return true;
  }

  async createUser(options: UserCommandOptions) {
    console.log('Creando usuario con los siguientes datos:', options);
    /*if (options.yes) {
      const userData: UserRequest = {
        email: options.email,
        first_name: options.first_name,
        last_name: options.last_name,
        password: process.env.DEFAULT_USER_PASSWORD,
        phone: options.phone,
        address: options.address,
        role_id: options.role_id,
      };

      const user = await this.userService.create(userData);
      console.log('✅ Usuario creado exitosamente:', user);
    } else {
      const answers: UserRequest = await inquirer.prompt([
        {
          type: 'input',
          name: 'email',
          message: 'Correo electrónico:',
          default: options.email,
          validate: (value) => /\S+@\S+\.\S+/.test(value) || 'Correo inválido',
        },
        {
          type: 'input',
          name: 'first_name',
          message: 'Nombre:',
          default: options.first_name,
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Apellido:',
          default: options.last_name,
        },
        {
          type: 'password',
          name: 'password',
          message: 'Contraseña:',
          mask: '*',
        },
        {
          type: 'input',
          name: 'phone',
          message: 'Teléfono:',
          default: options.phone,
        },
        {
          type: 'input',
          name: 'address',
          message: 'Dirección:',
          default: options.address,
        },
        {
          type: 'number',
          name: 'role_id',
          message: 'ID del Rol:',
          default: options.role_id,
          validate: (value) => (!isNaN(value) ? true : 'Debe ser un número'),
        },
      ]);

      const user = await this.userService.create(answers);
      console.log('✅ Usuario creado exitosamente:', user);
    }*/
  }
}
