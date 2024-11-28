export interface IPageResponse<T> {
  currentPage: number;
  totalItens: number;
  totalPages: number;
  content: T[];
}
