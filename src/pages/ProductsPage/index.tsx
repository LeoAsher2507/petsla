import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProductList from 'src/components/ProductList';
import { getAllProductMethod } from 'src/services/product/productAction';
import { RootState } from 'src/stores/rootReducer';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/utils/hook.ts/customReduxHook';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const productList = useAppSelector(
    (state: RootState) => state.product.productList
  );

  useEffect(() => {
    dispatch(getAllProductMethod());
  }, [dispatch]);

  return (
    <div className='product-page'>
      <Container>
        <ProductList productList={productList} />
      </Container>
    </div>
  );
};

export default ProductsPage;
