import { Body, Controller, Post } from '@nestjs/common';
import { AlertInput } from './alert.input';
import { AlertUseCase } from '../../use-cases/alert/alert.use-case';
import { AlertAdapter } from './alert.adapter';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertUseCase: AlertUseCase) {}

  @Post('send')
  async sendNewNotify(@Body() notify: AlertInput): Promise<void> {
    await this.alertUseCase.sendNotification(
      AlertAdapter.transferToDto(notify),
    );
    return;
  }
}
