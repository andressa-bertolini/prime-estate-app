import IconArrowBack from '@/assets/icons/IconArrowBack';
import IconArrowForward from '@/assets/icons/IconArrowForward';

type PaginationProps = {
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const Pagination = ({
  onPageChange,
  currentPage,
  totalPages,
}:PaginationProps) => {
  
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="pagination">
      {currentPage !== 1 && <button
        onClick={() => onPageChange(currentPage - 1)}
        className="pagination-arrow"
      >
        <IconArrowBack/>
      </button>}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${page === currentPage ? 'pagination-number-active' : ''} pagination-number`}
        >
          {page}
        </button>
      ))}

      {currentPage !== totalPages && <button
        onClick={() => onPageChange(currentPage + 1)}
        className="pagination-arrow"
      >
        <IconArrowForward />
      </button>}
    </div>
  );
};

export default Pagination;