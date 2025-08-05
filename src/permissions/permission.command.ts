import { Command, CommandRunner, Option } from 'nest-commander';
import { PermissionsService } from './permissions.service';
import inquirer from 'inquirer';

interface PermissionCommandOptions {
    create?: boolean;
    name?: string;
    code?: string;
    description?: string;
    appId?: string;
    yes?: boolean;
}

@Command({ name: 'permission', description: 'Comando para crud de permisos' })
export class PermissionCommand extends CommandRunner {
    constructor(private readonly permissionService: PermissionsService) {
        super();
    }

    async run(passedParams: string[], options?: PermissionCommandOptions): Promise<void> {
        if (options?.create) {
            await this.createPermission(options);
        } else {
            console.log('❌ No se especificó ninguna opción. Usa --help para ver los comandos disponibles.');
        }
    }

    @Option({ flags: '-c, --create', description: 'Crea un permiso' })
    parseCreate(): boolean {
        return true;
    }

    @Option({ flags: '-n, --name <name>', description: 'Nombre del permiso' })
    parseName(val: string): string {
        return val;
    }

    @Option({ flags: '-o, --code <code>', description: 'Código del permiso' })
    parseCode(val: string): string {
        return val;
    }

    @Option({ flags: '-d, --description <description>', description: 'Descripción del permiso' })
    parseDescription(val: string): string {
        return val;
    }

    @Option({ flags: '-a, --appId <appId>', description: 'ID de la aplicación' })
    parseAppId(val: string): string {
        return val;
    }

    @Option({ flags: '-y, --yes', description: 'Confirma automáticamente sin preguntar' })
    parseYes(): boolean {
        return true;
    }

    async createPermission(options: PermissionCommandOptions) {
        if (options.yes) {
            // modo no interactivo
            if (!options.name || !options.code) {
                console.log('❌ Debes especificar al menos --name y --code cuando usas --yes.');
                return;
            }

            const permission = await this.permissionService.create({
                name: options.name,
                code: options.code,
                appId: parseInt(options.appId),
                description: options.description,
            });

            console.log('✅ Permiso creado:', permission);
        } else {
            // modo interactivo
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Nombre del permiso:',
                    default: options.name,
                },
                {
                    type: 'input',
                    name: 'code',
                    message: 'Código del permiso:',
                    default: options.code,
                },
                {
                    type: 'input',
                    name: 'appId',
                    message: 'ID de la aplicación (opcional):',
                    default: options.appId,
                },
                {
                    type: 'input',
                    name: 'description',
                    message: 'Descripción del permiso:',
                    default: options.description,
                },
            ]);

            const permission = await this.permissionService.create({
                name: answers.name,
                code: answers.code,
                appId: parseInt(answers.appId),
                description: answers.description,
            });

            console.log('✅ Permiso creado:', permission);
        }
    }
}
