import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CustomPagination from 'src/components/customComponents/CustomPagination';
import Loading from 'src/components/Loading';
import ProductList from 'src/components/ProductList';
import { getAllProductMethod } from 'src/services/product/productAction';
import { RootState } from 'src/stores/rootReducer';
import { ERequestStatus } from 'src/types/commonType';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { productList, requestStatus } = useAppSelector(
    (state: RootState) => state.productState
  );

  useEffect(() => {
    dispatch(getAllProductMethod());
  }, [dispatch]);

  const [productsPerPage, setProductsPerPage] = useState(12);
  // const productsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirsProduct = indexOfLastProduct - productsPerPage;
  const currentProductList = productList.slice(
    indexOfFirsProduct,
    indexOfLastProduct
  );

  return (
    <div className='product-page'>
      {requestStatus === ERequestStatus.PENDING && <Loading />}
      <Container>
        <ProductList productList={currentProductList} />

        <CustomPagination
          setProductsPerPage={setProductsPerPage}
          totalPage={Math.ceil(productList.length / productsPerPage)}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Container>
    </div>
  );
};

export default ProductsPage;
