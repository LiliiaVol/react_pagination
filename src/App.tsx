import React, { useState } from 'react';
import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const visibelItems = (arrOfItems: string[]) => {
    const res = [];

    if (Math.floor(42 / page) < perPage) {
      for (let i = perPage * page - perPage; i < 42; i++) {
        res.push(arrOfItems[i]);
      }
    } else {
      for (let i = perPage * page - perPage; i < perPage * page; i++) {
        res.push(arrOfItems[i]);
      }
    }

    return res;
  };

  const showenItems = visibelItems(items);

  const handlePage = (chosenPage: number) => {
    setPage(chosenPage);
  };

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {page * perPage - perPage + 1} -{' '}
        {page * perPage < 42 ? page * perPage : 42} of 42)
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            value={perPage}
            onChange={event => {
              setPerPage(+event.target.value);
              setPage(1);
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      <Pagination
        total={42} // total number of items to paginate
        perPage={perPage} // number of items per page
        currentPage={page} /* optional with 1 by default */
        onPageChange={handlePage}
      />

      <ul>
        {showenItems.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
