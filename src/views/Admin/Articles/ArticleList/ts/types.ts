export interface ArticleList {
  list: Array<Article>;
  pagination: Pagination;
}
export interface Article {
  id: number;
  title: string;
  tags: Array<Tag> | string;
  category_name: string;
  content: string;
  create_time: string;
  update_time: string;
}

export interface Tag {
  name: string;
  color: string;
}

export interface Pagination {
  total?: number;
  hasNextPage?: boolean;
  totalPage?: number;
}
