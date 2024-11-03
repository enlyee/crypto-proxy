import { Body, Controller, Post } from '@nestjs/common';
import { AlertInput } from './alert.input';
import { AlertUseCase } from '../../use-cases/alert/alert.use-case';
import { AlertAdapter } from './alert.adapter';
import { Notification } from '../../core/entity/alert.entity';
import { CreateNotificationDto } from '../../core/dto/alert/input/create.notification.dto';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertUseCase: AlertUseCase) {}

  @Post('send')
  async sendNewNotify(@Body() notify: AlertInput): Promise<Notification[]> {
    const pool: CreateNotificationDto[] = [];
    for (let i = 0; i < notify.matchedTransactions.length; i++) {
      const dto = AlertAdapter.transferToDto(
        notify.matchedReceipts[i],
        notify.matchedTransactions[i],
      );
      pool.push(dto);
    }
    return Promise.all(
      pool.map(async (p) => await this.alertUseCase.sendNotification(p)),
    );
  }
}
