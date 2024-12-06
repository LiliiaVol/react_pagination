import { getPagesCount } from '../../utils';
import classNames from 'classnames';

type Props = {
  total: number;
  currentPage: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = (props: Props) => {
  const { total, currentPage, perPage, onPageChange } = props;
  const countPages = getPagesCount(total, perPage);

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', { disabled: currentPage === 1 })}
        onClick={() => {
          if (currentPage !== 1) {
            onPageChange(currentPage - 1);
          }
        }}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={false || currentPage === 1}
        >
          «
        </a>
      </li>
      {countPages.map(page => {
        return (
          <li
            className={classNames('page-item', {
              active: currentPage === page,
            })}
            key={page}
            onClick={() => onPageChange(page)}
          >
            <a data-cy="pageLink" className="page-link" href={`#${page}`}>
              {page}
            </a>
          </li>
        );
      })}

      <li
        className={classNames('page-item', {
          disabled: currentPage === countPages.at(-1),
        })}
        onClick={() => {
          if (currentPage !== countPages.at(-1)) {
            onPageChange(currentPage + 1);
          }
        }}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === countPages.at(-1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
