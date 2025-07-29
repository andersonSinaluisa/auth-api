import { Command, CommandRunner, Option } from 'nest-commander';
import { AppService } from './app.service';

interface AppCommandOptions {
  create?: boolean;
}

@Command({ name: 'app', description: 'Comando para gestionar apps' })
export class AppCommand extends CommandRunner {
  constructor(private readonly appService: AppService) {
    super();
  }

  async run(
    passedParams: string[],
    options?: AppCommandOptions,
  ): Promise<void> {
    if (options?.create) {
      await this.createApp();
    }
  }

  @Option({
    flags: '-c, --create [create]',
    description: 'Crea una nueva app de manera interactiva',
  })
  parseBoolean(val: string): boolean {
    return val === 'true' || val === undefined;
  }

  async createApp() {
    /*const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Nombre de la app:',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Descripción de la app:',
      },
      {
        type: 'input',
        name: 'url',
        message: 'URL de la app:',
      },
    ]);

    const app = await this.appService.create({
      name: answers.name,
      description: answers.description,
      url: answers.url,
    });

    console.log('✅ App creada:', app);
    */
  }
}
