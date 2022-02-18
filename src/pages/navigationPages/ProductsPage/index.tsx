import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import CustomPagination from 'src/components/customComponents/CustomPagination';
import Loading from 'src/components/Loading';
import ProductList from 'src/components/ProductList';
import { getAllProductMethod } from 'src/services/product/productAction';
import { RootState } from 'src/stores/rootReducer';
import { ERequestStatus } from 'src/types/commonType';
import { IProduct } from 'src/types/productTypes';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';
import './ProductsPage.scss';

const sortList = [
  {
    value: 0,
    displayName: 'Relevance',
  },
  {
    value: 1,
    displayName: 'Name: A-Z',
  },
  {
    value: 2,
    displayName: 'Name: Z-A',
  },
  {
    value: 3,
    displayName: 'Price: Low to High',
  },
  {
    value: 4,
    displayName: 'Price: High to Low',
  },
];

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { productState, themeState } = useAppSelector(
    (state: RootState) => state
  );

  const { productList, requestStatus } = productState;
  const { style } = themeState;
  const [searchParams] = useSearchParams();
  const [currentSort, setCurrentSort] = useState(0);

  useEffect(() => {
    dispatch(getAllProductMethod());
  }, [dispatch]);

  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // let filteredProductList = ;

  const [filteredProductList, setFilteredProductList] = useState(
    productList.filter((product: IProduct) =>
      product.product_name
        .toLowerCase()
        .includes((searchParams.get('search') || '').toLowerCase())
    )
  );

  const [totalPage, setTotalPage] = useState(
    Math.ceil(filteredProductList.length / itemsPerPage)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirsItem = indexOfLastItem - itemsPerPage;

  const currentProductList = filteredProductList.slice(
    indexOfFirsItem,
    indexOfLastItem
  );

  const handleSortSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentSort(Number(event.target.value));
  };

  const handleSort = useCallback(() => {
    let tempProductList = [...filteredProductList];
    switch (currentSort) {
      case 0: {
        tempProductList = productList.filter((product: IProduct) =>
          product.product_name
            .toLowerCase()
            .includes((searchParams.get('search') || '').toLowerCase())
        );
        break;
      }

      case 1: {
        tempProductList.sort((p1, p2) =>
          p1.product_name.localeCompare(p2.product_name)
        );
        break;
      }

      case 2: {
        tempProductList.sort((p1, p2) =>
          p2.product_name.localeCompare(p1.product_name)
        );
        break;
      }

      case 3: {
        tempProductList.sort((p1, p2) => p1.price - p2.price);
        break;
      }

      case 4: {
        tempProductList.sort((p1, p2) => p2.price - p1.price);
        break;
      }
    }
    return tempProductList;
  }, [currentSort, productList, searchParams]);

  useEffect(() => {
    setFilteredProductList([...handleSort()]);
  }, [currentSort, handleSort]);

  useEffect(() => {
    setTotalPage(Math.ceil(filteredProductList.length / itemsPerPage));
  }, [filteredProductList, productList, itemsPerPage]);

  useEffect(() => {
    setFilteredProductList(
      productList.filter((product: IProduct) =>
        product.product_name
          .toLowerCase()
          .includes((searchParams.get('search') || '').toLowerCase())
      )
    );
  }, [searchParams, productList]);

  return (
    <div className='product-page'>
      {requestStatus === ERequestStatus.PENDING && <Loading />}
      <Container>
        <div
          className='product-page-header shadow-sm rounded'
          style={{ backgroundColor: style.backgroundColor }}>
          <div className='header-wrap'>
            {searchParams.get('search') && (
              <div className='search-results-wrap'>
                <div className='title'>{`Search for "${searchParams.get(
                  'search'
                )}"`}</div>
                <div className='value'>
                  {`${filteredProductList.length} results found`}
                </div>
              </div>
            )}

            <div className='sort-wrap'>
              <Form.Group className='sort-select-gr'>
                <Form.Label className='label' htmlFor='sort-by'>
                  Sort by:{' '}
                </Form.Label>
                <Form.Select
                  value={currentSort}
                  onChange={handleSortSelectChange}
                  id='sort-by'
                  style={{
                    backgroundColor: style.backgroundColor,
                    color: style.color,
                  }}>
                  {sortList.map((sortItem) => (
                    <option key={sortItem.value} value={sortItem.value}>
                      {sortItem.displayName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>
        </div>

        <ProductList productList={currentProductList} />

        <CustomPagination
          setItemsPerPage={setItemsPerPage}
          totalPage={totalPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Container>
    </div>
  );
};

export default ProductsPage;
