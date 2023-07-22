import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';

// actions
import { ridersGet } from '../../redux/actions';

// types
import { StateRedux } from '../../redux/types';

// styles
import styles from './ListCard.module.css';

// magic numbers
const MIN_SHOW_CARDS = 50;
const MAX_DISTANCE_TO_END = 20;

const ListCard = () => {
  const { riders } = useSelector((state: StateRedux) => state);
  const [select, setSelect] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  const maxShowCards = useCallback(
    (newPageNumber: number = pageNumber) => MIN_SHOW_CARDS * newPageNumber,
    [pageNumber],
  );
  const sizeRiders = useMemo(() => riders.length, [riders]);

  useEffect(() => {
    if (!riders.length) dispatch(ridersGet);
  }, [dispatch, riders.length]);

  const onSelect = (numberRating: number) => {
    setSelect(numberRating);
  };

  const handleScroll = () => {
    const windowHeight =
      'clientHeight' in document.documentElement
        ? document.documentElement.clientHeight
        : window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const scrollY = window.scrollY || window.pageYOffset;

    if (documentHeight - (scrollY + windowHeight) < MAX_DISTANCE_TO_END) {
      setPageNumber(prevPageNumber =>
        maxShowCards(prevPageNumber) < sizeRiders ? prevPageNumber + 1 : prevPageNumber,
      );
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sizeRiders]);

  return (
    <table className={styles.container}>
      <tbody>
        {riders.slice(0, maxShowCards()).map((rider, index) => {
          const numberRating = index + 1;
          return (
            <Card
              key={`rider_${rider.name}`}
              option={rider}
              numberRating={numberRating}
              onClick={onSelect}
              select={select === numberRating}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default ListCard;
