import { BaseModel } from "./abstract/base-model";

export class Application extends BaseModel { 
  status: string | undefined;
  memberId: string | undefined;
  organizationId: string | undefined;
}