import React from 'react';
import Media from 'src/utils/Media';
import './NoProduct.scss';

interface INoProductProps {
  message?: string;
}

const NoProduct = ({ message }: INoProductProps) => {
  return (
    <div className='no-products'>
      <img className='no-products-img' srcSet={Media.sadCat} alt='' />
      <h3 className='no-products-title'>
        {message || 'Không có sản phẩm nào!'}
      </h3>
    </div>
  );
};

export default NoProduct;
