import { BaseModel } from "./abstract/base-model";
import { Application } from "./application";
import { Manager } from "./manager";
import { Member } from "./member";

export class Organization extends BaseModel {
  name: string | undefined;
  type: string | undefined;
  bin: string | undefined;
  address: string | undefined;
  contactNumber: string | undefined;

  ownerManagerId: string | undefined;
  ownerManager: Manager | undefined;

  applications: Application[] = []
  members: Member[] = []
}