export class Page<T> {

  items: T[] = [];

  page: number = 1;
  limit: number = 15;
  last!: boolean;
  total!: number;
  pages!: number;

}
