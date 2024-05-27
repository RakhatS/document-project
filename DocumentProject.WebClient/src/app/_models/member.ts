import { BaseModel } from "./abstract/base-model";

export class Member extends BaseModel {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  address: string | undefined;
  position: string | undefined;
  photoBase64: string | undefined;
  organizationId: string | undefined;
  password: string | undefined;
}