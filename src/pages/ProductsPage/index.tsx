import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Loading from 'src/components/Loading';
import PageWrap from 'src/components/PageWrap';
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
  const { productList, requestState } = useAppSelector(
    (state: RootState) => state.productState
  );

  useEffect(() => {
    dispatch(getAllProductMethod());
  }, [dispatch]);

  return (
    <PageWrap className='product-page'>
      {requestState === ERequestStatus.PENDING && <Loading />}
      <Container>
        <ProductList productList={productList} />
      </Container>
    </PageWrap>
  );
};

export default ProductsPage;
