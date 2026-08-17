import IconArrowBack from '@/assets/icons/IconArrowBack';
import IconArrowForward from '@/assets/icons/IconArrowForward';
import styles from './styles.module.css';

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
    <div className={styles.pagination}>
      {currentPage !== 1 && <button
        onClick={() => onPageChange(currentPage - 1)}
        className={styles.paginationArrow}
      >
        <IconArrowBack/>
      </button>}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${page === currentPage ? styles.paginationNumberActive : ''} ${styles.paginationNumber}`}
        >
          {page}
        </button>
      ))}

      {currentPage !== totalPages && <button
        onClick={() => onPageChange(currentPage + 1)}
        className={styles.paginationArrow}
      >
        <IconArrowForward />
      </button>}
    </div>
  );
};

export default Pagination;