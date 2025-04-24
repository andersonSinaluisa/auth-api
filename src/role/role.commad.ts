import { Command, CommandRunner, Option } from 'nest-commander';
import inquirer from 'inquirer';
import { RoleService } from './role.service';
import { PermissionsService } from '../permissions/permissions.service';

interface RoleCommandOptions {
    create?: boolean;
    name?: string;
    description?: string;
    permissions?: string; // ids separados por coma
    yes?: boolean;
}

@Command({ name: 'role', description: 'Comando para crud de roles' })
export class RoleCommand extends CommandRunner {
    constructor(
        private readonly roleService: RoleService,
        private readonly permissionService: PermissionsService,
    ) {
        super();
    }

    async run(passedParams: string[], options?: RoleCommandOptions): Promise<void> {
        if (options?.create) {
            await this.createRole(options);
        } else {
            console.log('❌ No se especificó ninguna opción. Usa --help para ver los comandos disponibles.');
        }
    }

    @Option({ flags: '-c, --create', description: 'Crea un rol' })
    parseCreate(): boolean {
        return true;
    }

    @Option({ flags: '-n, --name <name>', description: 'Nombre del rol' })
    parseName(val: string): string {
        return val;
    }

    @Option({ flags: '-d, --description <description>', description: 'Descripción del rol' })
    parseDescription(val: string): string {
        return val;
    }

    @Option({ flags: '-p, --permissions <permissions>', description: 'IDs de permisos separados por coma' })
    parsePermissions(val: string): string {
        return val;
    }

    @Option({ flags: '-y, --yes', description: 'Confirma automáticamente' })
    parseYes(): boolean {
        return true;
    }

    async createRole(options: RoleCommandOptions) {
        if (options.yes) {
            // modo no interactivo
            if (!options.name || !options.permissions) {
                console.log('❌ Debes especificar al menos --name y --permissions cuando usas --yes.');
                return;
            }

            const permissions = options.permissions.split(',').map((id) => parseInt(id, 10));

            const role = await this.roleService.create({
                name: options.name,
                permissions,
            });

            console.log('✅ Rol creado exitosamente:', role);
        } else {
            // modo interactivo
            const availablePermissions = await this.permissionService.findAll(1, 1000, undefined, ['name']);

            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Nombre del rol:',
                    default: options.name,
                },
                {
                    type: 'checkbox',
                    name: 'permissions',
                    message: 'Selecciona los permisos:',
                    choices: availablePermissions.data.map((permission) => ({
                        name: `${permission.code} (${permission.description})`,
                        value: permission.id,
                    })),
                },
            ]);

            const role = await this.roleService.create({
                name: answers.name,
                permissions: answers.permissions,
            });

            console.log('✅ Rol creado exitosamente:', role);
        }
    }
}
