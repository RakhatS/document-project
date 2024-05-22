import { BaseModel } from "./abstract/base-model";
import { Application } from "./application";

export class Organization extends BaseModel {
  name: string | undefined;
  type: string | undefined;
  ownerManagerId: string | undefined;

  applications: Application[] = []
}