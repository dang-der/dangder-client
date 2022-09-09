import { ReactNode } from "react";

interface PageControllerConstructor {
  pages: ReactNode[];
  onClickNext: (index: number, pageInfo: any, data: any) => void;
}
export class PageController {
  pages: ReactNode[];
  currentPageIndex: number;
  onClickNext: (index: number, pageInfo: any, data: any) => void;

  constructor({ pages, onClickNext }: PageControllerConstructor) {
    this.pages = pages;
    this.onClickNext = onClickNext;
    this.currentPageIndex = 0;
  }

  nextPage(inputs: any) {
    console.log("PageController", inputs);
    if (this.currentPageIndex > this.pages.length - 1) return;
    this.currentPageIndex += 1;
    this.onClickNext(
      this.currentPageIndex,
      this.pages[this.currentPageIndex],
      inputs
    );
  }

  showCurrentPage(index: number) {
    return this.pages[index];
  }
}
