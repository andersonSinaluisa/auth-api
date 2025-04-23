import { Command, CommandRunner, Option } from "nest-commander";
import { PermissionsService } from "./permissions.service";
import inquirer from 'inquirer';

interface PermissionCommandOptions {
    create?: boolean;
}

@Command({ name: 'role', description: 'Comando para crud de roles' })
export class PermissionCommand extends CommandRunner {

    constructor(private readonly PermissionService: PermissionsService) {
        super();
    }
    run(passedParams: string[], options?: Record<string, any>): Promise<void> {
        throw new Error("Method not implemented.");
    }


    @Option({
        flags: '-c, --create [create]',
        description: 'Crea un rol de manera interactiva',
    })
    parseBoolean(val: string): boolean {
        return val === 'true' || val === undefined;
    }

    async createPermission() {
        /*export class CreatePermissionDto {
          @IsString()
          name: string;
        
          @IsString()
          code: string;
        
          @IsNumber()
          appId: number;
        
          @IsString()
          description: string;
        }
        */
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Nombre del permiso:',
            },
            {
                type: 'input',
                name: 'code',
                message: 'Código del permiso:',
            },
            {
                type: 'expand',
                name: 'addApp',
                message: '¿Desea agregar una aplicación?',
                choices: [
                    { key: 'y', name: 'Sí', value: true },
                    { key: 'n', name: 'No', value: false },
                ],
            },
            {
                type: 'input',
                name: 'description',
                message: 'Descripción del permiso:',
            }
        ]);
        console.log('Permiso creado:', answers);
    }

}