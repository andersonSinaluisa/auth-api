import { Command, CommandRunner } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import inquirer from 'inquirer';
import { RoleService } from 'src/role/role.service';

@Injectable()
@Command({ name: 'create-user', description: 'Crea un usuario admin inicial' })
export class CreateUserCommand extends CommandRunner {
  constructor(
    private userService: UsersService,
    private roleService: RoleService,
  ) {
    super();
  }

  async run(): Promise<void> {
    const roles = await this.roleService.findAll();
    if (roles.length === 0) {
      console.error('No se han encontrado roles');
      return;
    }
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: 'Selecciona el rol del usuario:',
        choices: roles.map((role) => role.name),
      },
      {
        type: 'input',
        name: 'email',
        message: 'Introduce el email del usuario:',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Introduce la contraseña del usuario:',
        mask: '*', // Para ocultar la contraseña mientras se escribe
      },
      {
        type: 'input',
        name: 'firstName',
        message: 'Introduce el nombre:',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Introduce el apellido:',
      },
    ]);
    // Usa el servicio para crear el usuario
    await this.userService.create({
      email: answers.email,
      password: answers.password,
      first_name: answers.firstName,
      last_name: answers.lastName,
      address: '',
      phone: '',
      role_id: 1,
    });

    console.log('Usuario creado con éxito');
  }
}
