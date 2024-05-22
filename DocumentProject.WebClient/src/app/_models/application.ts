import { BaseModel } from "./abstract/base-model";
import { Member } from "./member";

export class Application extends BaseModel { 
  status: string | undefined;
  memberId: string | undefined;
  member: Member | undefined;
  organizationId: string | undefined;
}