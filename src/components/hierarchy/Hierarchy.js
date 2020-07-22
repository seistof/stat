import {Query} from '../../core/Query';

export class Hierarchy extends Query {
  constructor(list, details) {
    super();
    this.list = list;
    this.details = details;
  }

  async getHierarchy() {
    return await this.getData(this.hierarchy);
  }

  async getDetails() {
    return await this.getData(this.details);
  }
}
