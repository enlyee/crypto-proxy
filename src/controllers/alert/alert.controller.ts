import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlertInput } from './alert.input';
import { AlertUseCase } from '../../use-cases/alert/alert.use-case';
import { AlertAdapter } from './alert.adapter';
import { Notification } from '../../core/entity/alert.entity';
import { CreateNotificationDto } from '../../core/dto/alert/input/create.notification.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ExpressionsPayload, GetNotificationsPayload } from './alert.payload';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertUseCase: AlertUseCase) {}

  @ApiResponse({ type: [Notification] })
  @ApiOperation({ summary: 'Endpoint for QuickNode alerts' })
  @Post('send')
  async sendNewNotify(@Body() notify: AlertInput): Promise<Notification[]> {
    console.log(notify);
    const pool: CreateNotificationDto[] = [];
    for (let i = 0; i < notify.matchedTransactions.length; i++) {
      const dto = AlertAdapter.transferToDto(
        notify.matchedReceipts[i],
        notify.matchedTransactions[i],
      );
      if (Array.isArray(dto)) {
        pool.push(...dto);
        continue;
      }
      pool.push(dto as CreateNotificationDto);
    }

    const ansPool = [];

    for (let i = 0; i < pool.length; i++) {
      const p = pool[i];
      const ans = await this.alertUseCase.sendNotification(p);
      ansPool.push(ans);
      if (i < pool.length - 1) {
        await this.sleep(1000); // Задержка 1 секунда
      }
    }

    return ansPool;
  }

  @ApiResponse({ type: ExpressionsPayload })
  @ApiOperation({ summary: 'Get expressions for QuickNode alerts' })
  @Get('expressions')
  async syncWithNode(): Promise<ExpressionsPayload> {
    return this.alertUseCase.syncUsersWithNode();
  }

  // @ApiResponse({ type: Boolean })
  // @ApiParam({ name: 'notify_id', required: true })
  // @ApiOperation({ summary: 'Update QuickNode Wallet List' })
  // @Post('update/:alertId')
  // async updateNotifySender(@Param() alertId: string): Promise<boolean> {
  //   return this.alertUseCase.syncUsersWithNode(alertId);
  // }

  // @ApiResponse({ type: GetNotificationsPayload })
  // @ApiOperation({ summary: 'Get List of All Notifications' })
  // @Get('all')
  // async getAllNotifications(): Promise<GetNotificationsPayload> {
  //   return this.alertUseCase.getAllNotifications();
  // }

  private async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
