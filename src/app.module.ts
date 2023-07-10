import { BullModule } from "@nestjs/bullmq";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";
import { redisStore } from "cache-manager-ioredis-yet";
import Joi from "joi";
import { AdminModule } from "./admin/admin.module";
import { BlogPostModule } from "./blog-post/blog-post.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("development", "production").default("development"),
        JWT_SECRET: Joi.string().required(),
        MONGODB_URL: Joi.string().required(),
        REDIS_CACHE_DB: Joi.number().default(0),
        REDIS_BULLMQ_DB: Joi.number().default(1),
        REDIS_PASSWORD: Joi.string().required(),
        REDIS_HOST: Joi.string().default("127.0.0.1"),
        REDIS_PORT: Joi.number().default(6379),
        SERVER_PORT: Joi.number().default(3000)
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true
      }
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        host: configService.get("REDIS_HOST"),
        port: configService.get("REDIS_PORT"),
        password: configService.get("REDIS_PASSWORD"),
        db: configService.get("REDIS_CACHE_DB")
      })
    }),

    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get("REDIS_HOST"),
          port: configService.get("REDIS_PORT"),
          password: configService.get("REDIS_PASSWORD"),
          db: configService.get("REDIS_BULLMQ_DB")
        }
      })
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    AdminModule,
    BlogPostModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
