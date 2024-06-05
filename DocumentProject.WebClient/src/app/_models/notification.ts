import { BaseModel } from "./abstract/base-model";

export class NotificationModel extends BaseModel {
  message: string | undefined;
  isMarkedAsRead: boolean | undefined;

  forManagerId: string | null = null;
  forMemberId: string | null = null;
}