import React from 'react';
import { Link } from 'react-router-dom';

//card items for padding the boxes
function CardItem(props) {
  return (
    <>
      <li className='cards__item' style={{height: 300, paddingBottom: 30}}>
        <Link className='cards__item__link' to={props.path}>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;