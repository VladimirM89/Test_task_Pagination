import { TUserItem } from "./User"

export type TGetServerSideProps = {
  statusCode: number,
  response: {
    items: TUserItem[],
    meta: PaginationMeta | null,
    links: PaginationLinks| null,
  }
}

export type PaginationMeta = {
  totalItems: number,
  itemCount: number,
  itemsPerPage: number,
  totalPages: number,
  currentPage: number,
}

export type PaginationLinks = {
  first: string,
  previous: string,
  next: string,
  last: string
}
