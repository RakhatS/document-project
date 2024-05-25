import { BaseModel } from "./abstract/base-model";
import { Member } from "./member";
import { Organization } from "./organization";

export class Application extends BaseModel { 
  number: string | undefined;
  name: string | undefined;
  status: string | undefined | null = null;
  type: string | undefined;
  signatureDate: Date | null = null;
  text: string | undefined | null = null;
  memberId: string | undefined;
  member: Member | undefined;
  organizationId: string | undefined;
  organization: Organization | null = null;

  document: string | undefined | null = null;
}