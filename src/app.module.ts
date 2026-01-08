import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { IeltsModule } from "./ielts/ielts.module"
import { AiModule } from "./ai/ai.module"
import { PrismaModule } from "./prisma/prisma.module"
import { TestsModule } from "./tests/tests.module"
import { HealthController } from "./health/health.controller"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    AuthModule,
    UsersModule,
    IeltsModule,
    AiModule,
    PrismaModule,
    TestsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
