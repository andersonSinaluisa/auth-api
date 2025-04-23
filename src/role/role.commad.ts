import { Command, CommandRunner, Option } from 'nest-commander';
import inquirer from 'inquirer';
import { RoleService } from './role.service';
import { PermissionsService } from '../permissions/permissions.service';

interface RoleCommandOptions {
    create?: boolean;
}

@Command({ name: 'role', description: 'Comando para crud de roles' })
export class RoleCommand extends CommandRunner {
    constructor(private readonly roleService:RoleService, 
        private readonly permissionService:PermissionsService){
        super();
    }

    async run(passedParams: string[], options?: RoleCommandOptions): Promise<void> {
        if (options?.create) {
            await this.createRole();
        }
    }

    @Option({
        flags: '-c, --create [create]',
        description: 'Crea un rol de manera interactiva',
    })
    parseBoolean(val: string): boolean {
        return val === 'true' || val === undefined;
    }

    async createRole() {
        const permissions = await this.permissionService.findAll(1, 1000, undefined, ['name']);
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Nombre del rol:',
            },
            {
                type: 'input',
                name: 'description',
                message: 'Descripción del rol:',
            },
            {
                type: 'checkbox',
                name: 'permissions',
                message: 'Selecciona los permisos:',
                choices: permissions.data.map((permission) => ({
                    name: `${permission.code} (${permission.description})`, // <- asumo aquí querías code + description
                    value: permission.id,
                })),
            }
        ]);


        const role = await this.roleService.create({
            name: answers.name,
            permissions: answers.permissions,
            
        });

        console.log('Rol creado:', role);
        
    }
}