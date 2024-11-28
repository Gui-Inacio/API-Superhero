export interface IPageRequest<FilterOptions = undefined> {
  page?: number;
  size?: number;
  filter?: FilterOptions;
}
