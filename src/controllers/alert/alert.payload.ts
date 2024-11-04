import { ApiProperty } from '@nestjs/swagger';

export class NotificationPayload {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}

export class GetNotificationsPayload {
  @ApiProperty({ type: [NotificationPayload] })
  data: NotificationPayload[];
}
