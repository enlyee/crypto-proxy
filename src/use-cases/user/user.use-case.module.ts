import { Module } from '@nestjs/common';
import { UserModule } from '../../frameworks/user/user.module';
import { UserUseCase } from './user.use-case';
import { DataSourceModule } from '../../frameworks/dataSource/dataSource.module';

@Module({
  imports: [UserModule, DataSourceModule],
  providers: [UserUseCase],
  exports: [UserUseCase],
})
export class UserUseCaseModule {}
