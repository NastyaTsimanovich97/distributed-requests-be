const DEFAULT_PORT = 3000;

export default () =>
  ({
    port: parseInt(process.env.PORT, 10) || DEFAULT_PORT,
    database: {
      type: 'postgres' as const,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: ['/**/.entity{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
      migrationsTableName: 'migrations',
      migrationsRun: false,
      migrations: ['../migrations/*.ts'],
      cli: {
        migrationsDir: 'migrations',
      },
      logging: false,
    },
    fe: {
      url: process.env.FE_APPLICATION_URL,
    },
  }) as const;
