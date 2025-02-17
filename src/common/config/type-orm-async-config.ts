import { ConfigService, ConfigModule } from '@nestjs/config';

export const typeOrmAsyncConfig = {
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return {
      ...configService.get('database'),
    };
  },
};
