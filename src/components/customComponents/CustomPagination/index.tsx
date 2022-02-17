import React, { ChangeEvent } from 'react';
import { Form, Pagination } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { RootState } from 'src/stores/rootReducer';
import { useAppSelector } from 'src/utils/hook.ts/customReduxHook';
import './CustomPagination.scss';

interface IPaginationProps {
  totalPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  listItemsPerPage?: number[];
}

const CustomPagination = ({
  totalPage,
  setCurrentPage,
  setItemsPerPage,
  currentPage,
  listItemsPerPage,
}: IPaginationProps) => {
  const { t } = useTranslation();

  const handleChangePage = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const handleChangeItemsPerPage = (number: number) => {
    window.scrollTo(0, 0);
    setItemsPerPage(number);
    setCurrentPage(1);
  };

  const { style } = useAppSelector((state: RootState) => state.themeState);

  return (
    <div className='custom-pagination'>
      <Pagination className='pagination-wrap'>
        <Pagination.Item
          style={{ backgroundColor: style.backgroundColor }}
          disabled={currentPage === 1}
          onClick={() => handleChangePage(currentPage - 1)}>
          <i className='fas fa-chevron-left'></i>
        </Pagination.Item>

        {Array.from(Array(totalPage).keys()).map((number) => (
          <Pagination.Item
            style={{ backgroundColor: style.backgroundColor }}
            key={number + 1}
            active={number + 1 === currentPage}
            onClick={() => handleChangePage(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}

        <Pagination.Item
          style={{ backgroundColor: style.backgroundColor }}
          disabled={currentPage === totalPage}
          onClick={() => handleChangePage(currentPage + 1)}>
          <i className='fas fa-chevron-right'></i>
        </Pagination.Item>
      </Pagination>

      <Form.Group className='select-products-per-page'>
        <Form.Label htmlFor='itemsPerPage' className='label'>
          {`${t('title.item')}/${t('title.page')}`}
        </Form.Label>
        <Form.Select
          style={{ backgroundColor: style.backgroundColor, color: style.color }}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            handleChangeItemsPerPage(Number(event.target.value))
          }
          id='itemsPerPage'>
          {listItemsPerPage ? (
            listItemsPerPage.map((number: number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))
          ) : (
            <>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={36}>36</option>
            </>
          )}
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default CustomPagination;
