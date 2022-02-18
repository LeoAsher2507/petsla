import React from 'react';
import Media from 'src/utils/Media';
import './NoItems.scss';

interface INoItemsProps {
  message?: string;
}

const NoItems = ({ message }: INoItemsProps) => {
  return (
    <div className='no-products'>
      <img className='no-products-img' srcSet={Media.sadCat} alt='' />
      <h3 className='no-products-title'>
        {message || 'Không có sản phẩm nào!'}
      </h3>
    </div>
  );
};

export default NoItems;
