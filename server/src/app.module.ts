import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GenreModule } from './genre/genre.module';
import { DirectorModule } from './director/director.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwt.guard';
import { PlaylistModule } from './playlist/playlist.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { ReportsModule } from './reports/reports.module';
import { MailModule } from './mail/mail.module';
import { ReviewModule } from './review/review.module';

const globalGuard = {
  provide: APP_GUARD,
  useClass: JwtGuard,
};

const rolesGuard = {
  provide: APP_GUARD,
  useClass: RolesGuard,
};

@Module({
  imports: [
    MovieModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_CONNECTION'),
      }),
      inject: [ConfigService],
    }),
    GenreModule,
    DirectorModule,
    UserModule,
    AuthModule,
    PlaylistModule,
    ReportsModule,
    MailModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService, globalGuard, rolesGuard],
})
export class AppModule {}
