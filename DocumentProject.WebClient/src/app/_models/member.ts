import { BaseModel } from "./abstract/base-model";
import { Organization } from "./organization";

export class Member extends BaseModel {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  address: string | undefined;
  position: string | undefined;
  phoneNumber: string | undefined;
  photoBase64: string | undefined;
  organizationId: string | undefined;
  organization: Organization | undefined;
  password: string | undefined;
}