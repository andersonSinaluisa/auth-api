import { Command, CommandRunner } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import inquirer from 'inquirer';
import { RoleService } from 'src/role/role.service';
import { PermissionsService } from 'src/permissions/permissions.service';

@Injectable()
@Command({ name: 'create-rol', description: 'Crea un rol' })
export class CreateRolCommand extends CommandRunner {
  constructor(
    private roleService: RoleService,
    private permissionsService: PermissionsService,
  ) {
    super();
  }

  async run(): Promise<void> {
    const permissions = await this.permissionsService.findAll();
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Introduce el nombre del rol:',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Introduce la descripción del rol:',
      },
      {
        type: 'checkbox',
        name: 'permissions',
        message: 'Selecciona los permisos del rol:',
        choices: permissions.map((permission) => permission.name),
      },
    ]);
    // Usa el servicio para crear el rol
    await this.roleService.create({
      name: answers.name,
      permissions: [],
    });
    console.log('Rol creado correctamente');
  }
}