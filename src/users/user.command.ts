import { Command, CommandRunner, Option } from 'nest-commander';
import { UsersService } from './users.service';
import inquirer from 'inquirer';
import { UserRequest } from './dto/user.create.dto';

interface SeedCommandOptions {
    create?: boolean;
}

@Command({ name: 'user', description: 'Comando para crud de usuarios' })
export class SeedCommand extends CommandRunner {
    constructor(private readonly userService: UsersService) {
        super();
    }

    async run(passedParams: string[], options?: SeedCommandOptions): Promise<void> {
        if (options?.create) {
            await this.createUser();
        }
    }

    @Option({
        flags: '-c, --create [create]',
        description: 'Crea un usuario de manera interactiva',
    })
    parseBoolean(val: string): boolean {
        return val === 'true' || val === undefined;
    }


    async createUser() {
        const answers: UserRequest = await inquirer.prompt([
            {
                type: 'input',
                name: 'email',
                message: 'Correo electrónico:',
                validate: (value) => /\S+@\S+\.\S+/.test(value) || 'Correo inválido',
            },
            {
                type: 'input',
                name: 'first_name',
                message: 'Nombre:',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Apellido:',
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
            },
            {
                type: 'input',
                name: 'address',
                message: 'Dirección:',
            },
            {
                type: 'number',
                name: 'role_id',
                message: 'ID del Rol:',
                validate: (value) => (!isNaN(value) ? true : 'Debe ser un número'),
            },
        ]);
        
        const user = await this.userService.create(answers);
        console.log('✅ Usuario creado exitosamente:', user);
    }
}
