import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlertInput } from './alert.input';
import { AlertUseCase } from '../../use-cases/alert/alert.use-case';
import { AlertAdapter } from './alert.adapter';
import { Notification } from '../../core/entity/alert.entity';
import { CreateNotificationDto } from '../../core/dto/alert/input/create.notification.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GetNotificationsPayload } from './alert.payload';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertUseCase: AlertUseCase) {}

  @ApiResponse({ type: [Notification] })
  @ApiOperation({ summary: 'Endpoint for QuickNode alerts' })
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

  @ApiResponse({ type: Boolean })
  @ApiParam({ name: 'notify_id', required: true })
  @ApiOperation({ summary: 'Update QuickNode Wallet List' })
  @Post('update/:alertId')
  async updateNotifySender(@Param() alertId: string): Promise<boolean> {
    return this.alertUseCase.syncUsersWithNode(alertId);
  }

  @ApiResponse({ type: GetNotificationsPayload })
  @ApiOperation({ summary: 'Get List of All Notifications' })
  @Get('all')
  async getAllNotifications(): Promise<GetNotificationsPayload> {
    return this.alertUseCase.getAllNotifications();
  }
}
