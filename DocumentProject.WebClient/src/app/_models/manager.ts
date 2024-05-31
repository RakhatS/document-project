import { BaseModel } from "./abstract/base-model";

export class Manager extends BaseModel {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  phoneNumber: string | undefined;
  photoBase64: string | undefined;
}