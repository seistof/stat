import {MainView} from '@/old/core/MainView';

export class PaginationView extends MainView {
  constructor(
      goToInput, goToButton, prev, currentPage, next, pageNum, objectsNum) {
    super();
    this.goToInput = goToInput;
    this.goToButton = goToButton;
    this.prev = prev;
    this.currentPage = currentPage;
    this.next = next;
    this.pageNum = pageNum;
    this.objectsNum = objectsNum;
  }



}