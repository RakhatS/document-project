export class Notification {
  message: string | undefined;
  isMarkedAsRead: boolean | undefined;

  forManagerId: string | null = null;
  forMemberId: string | null = null;
}