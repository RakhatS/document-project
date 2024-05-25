import { BaseModel } from "./abstract/base-model";
import { Application } from "./application";
import { Member } from "./member";

export class Organization extends BaseModel {
  name: string | undefined;
  type: string | undefined;
  bin: string | undefined;
  address: string | undefined;
  contactNumber: string | undefined;

  ownerManagerId: string | undefined;

  applications: Application[] = []
  members: Member[] = []
}