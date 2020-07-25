import {Query} from '@/old/core/Query';
import {logger} from '@/old/core/utils';

const COMMENTS = true;

export class Hierarchy extends Query {
  constructor(list, details) {
    super();
    this.list = list;
    this.details = details;
  }

}
