import React from 'react';
import { Form, Pagination } from 'react-bootstrap';
import './CustomPagination.scss';

interface IPaginationProps {
  totalPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setProductsPerPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

const CustomPagination = ({
  totalPage,
  setCurrentPage,
  setProductsPerPage,
  currentPage,
}: IPaginationProps) => {
  const handleChangePage = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const handleChangeProductsPerPage = (number: number) => {
    window.scrollTo(0, 0);
    setProductsPerPage(number);
    setCurrentPage(1);
  };

  return (
    <div className='custome-pagination'>
      <Pagination>
        <Pagination.Item
          disabled={currentPage === 1}
          onClick={() => handleChangePage(currentPage - 1)}>
          <i className='fas fa-chevron-left'></i>
        </Pagination.Item>

        {Array.from(Array(totalPage).keys()).map((number) => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === currentPage}
            onClick={() => handleChangePage(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}

        <Pagination.Item
          disabled={currentPage === totalPage}
          onClick={() => handleChangePage(currentPage + 1)}>
          <i className='fas fa-chevron-right'></i>
        </Pagination.Item>
      </Pagination>

      <Form.Group className='select-products-per-page'>
        <Form.Label htmlFor='productsPerPage' className='label'>
          Products/Page
        </Form.Label>
        <Form.Select
          onChange={(event: any) =>
            handleChangeProductsPerPage(event.target.value)
          }
          id='productsPerPage'>
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={36}>36</option>
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default CustomPagination;
