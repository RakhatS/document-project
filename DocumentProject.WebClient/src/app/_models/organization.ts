import { BaseModel } from "./abstract/base-model";

export class Organization extends BaseModel{
  name: string | undefined;
  type: string | undefined;
  ownerManagerId: string | undefined;
}