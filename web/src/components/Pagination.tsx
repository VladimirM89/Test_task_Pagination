import { PaginationLinks, PaginationMeta } from '@/models/Response';
import { useRouter } from 'next/router';
import Pagination from 'react-bootstrap/Pagination';
import { useCallback, MouseEvent } from 'react';
import createPagesArray from '@/utils/createPagesArray';

type PaginationProps = {
  metaInfo: PaginationMeta;
  linksInfo: PaginationLinks;
};

const PaginationComponent: React.FC<PaginationProps> = ({metaInfo, linksInfo}) => {
  const {currentPage, totalPages} = metaInfo;
  const {first, last, next, previous} = linksInfo;
  const router = useRouter();

  const handleChangePage = useCallback((event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      const page = event.target.offsetParent?.getAttribute("data-page")
        ?? event.target.getAttribute("data-page");

        router.push({
          query: {page},
        })
    }
  }, [router])

  const createItems = () => {
    const array = createPagesArray(currentPage, totalPages);

    return (
      <>
        {array.map((item) =>
          <Pagination.Item
            key={item}
            data-page={item}
            active={currentPage === item}
            onClick={handleChangePage}
          >
            {item}
          </Pagination.Item>)}
      </>
    )
  }

  const handleClickNextPage = useCallback(() => {
    const nextPage = next.length;

    if (!!nextPage) {
      router.push({
        query: {page: currentPage + 1},
      })
    }
  }, [currentPage, next.length, router])

  const handleClickPrevPage = useCallback(() => {
    const prevPage = previous.length;

    if (prevPage) {
      router.push({
        query: {page: currentPage - 1},
      })
    }
  }, [currentPage, previous.length, router])

  const handleClickFirstPage = useCallback(() => {
    const firstPage = first.length;

    if (firstPage) {
      router.push({
        query: {page: 1},
      })
    }
  }, [first.length, router])

  const handleClickLastPage = useCallback(() => {
    const lastPage = last.length;

    if (lastPage) {
      router.push({
        query: {page: totalPages},
      })
    }
  }, [last.length, router, totalPages])

  return (
    <Pagination className={'mt-4'}>
      <Pagination.First
        disabled={!first.length || !previous.length}
        onClick={handleClickFirstPage}
      />
      <Pagination.Prev
        disabled={!previous.length}
        onClick={handleClickPrevPage}
      />
      {createItems()}
      <Pagination.Next
        disabled={!next.length}
        onClick={handleClickNextPage}
      />
      <Pagination.Last
        disabled={!last.length || !next.length}
        onClick={handleClickLastPage}
      />
    </Pagination>
  );
};

export default PaginationComponent;
