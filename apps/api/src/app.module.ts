import { DynamicModule, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { join } from 'path';
import { existsSync, readdirSync, unlinkSync } from 'fs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // imports: [DatabaseModule, ProductModule, OrderModule, UserModule, AuthModule],
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: ResponseInterceptor,
  //   },
  //   {
  //     provide: APP_FILTER,
  //     useClass: AllExceptionsFilter,
  //   },
  // ],

  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
    }),
    // PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  controllers: [],
  providers: [
    // DiscordLoggerService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ErrInterceptor,
    // },
  ],
})
export class AppModule {
  static async register(): Promise<DynamicModule> {
    const controllers = await AppModule.loadControllers();

    return {
      module: AppModule,
      controllers,
    };
  }

  private static async loadControllers(): Promise<any[]> {
    const controllersPath = join(__dirname, 'controllers');
    console.log('Controller path:', controllersPath);

    if (!existsSync(controllersPath)) {
      console.warn(
        `Controller folder tidak ditemukan di path: ${controllersPath}`,
      );
      return [];
    }

    const controllerFiles = readdirSync(controllersPath)
      .filter((file) => file.endsWith('.js'))
      .filter((file) => !file.endsWith('.d.ts'));

    const controllers: any[] = [];

    for (const file of controllerFiles) {
      const fullPath = join(controllersPath, file);
      try {
        const module =
          process.env.NODE_ENV === 'production' || __dirname.includes('dist')
            ? require(fullPath)
            : await import(fullPath);

        const controller = Object.values(module)[0];
        if (typeof controller === 'function') {
          controllers.push(controller);
        } else {
          console.warn(`Controller tidak valid di file: ${file}`);
        }
      } catch (err) {
        console.error(`Gagal load controller ${file}:`, err.message);

        // Bersihkan file .js sisa dari controller yang sudah dihapus
        try {
          unlinkSync(fullPath);
          console.warn(`File sisa dihapus: ${file}`);
        } catch (unlinkErr) {
          console.warn(`Gagal menghapus file: ${file}`, unlinkErr.message);
        }
      }
    }

    return controllers;
  }
}
