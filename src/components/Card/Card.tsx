import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';

// types
import { User } from '../../redux/types';

// components
import { IconHelmet } from '../../icons/components';

// helps
import { formatTime } from '../../helps/numbers';

// constants
import { colors } from '../../redux/constants';

// styles
import styles from './Card.module.css';

// magic numbers
const WIDTH_OTHER_ELEMENTS_IN_CONTAINER = 120;
const WIDTH_OTHER_BORDER_TR = 2;

type Props = {
  numberRating: number;
  option: User;
  onClick: (numberRating: number) => void;
  select: boolean;
};

const Card = ({ numberRating, option, onClick, select }: Props) => {
  const { ref: refContainer, inView: inViewContainer, entry } = useInView();
  const [widthNameContainer, setWidthNameContainer] = useState(window.innerWidth);
  const refRatingContainer = useRef<HTMLTableCellElement | null>(null);
  const widthRating = refRatingContainer.current?.clientWidth
    ? refRatingContainer.current.clientWidth - WIDTH_OTHER_BORDER_TR
    : '100%';

  const onSelect = () => {
    onClick(numberRating);
  };

  const updateWindowWidth = () => {
    if (inViewContainer && window.innerWidth && entry?.rootBounds?.width) {
      setWidthNameContainer(window.innerWidth - WIDTH_OTHER_ELEMENTS_IN_CONTAINER);
    }
  };

  useEffect(() => {
    updateWindowWidth();

    window.addEventListener('resize', updateWindowWidth);
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, [inViewContainer]);

  return (
    <tr ref={refContainer} onClick={onSelect} className={styles.container}>
      <td ref={refRatingContainer} className={styles.ratingContainer}>
        <p
          style={{
            width: widthRating,
          }}
          className={classNames(styles.rating, { [styles.ratingSelect]: select })}
        >
          {numberRating}
        </p>
      </td>
      <td>
        <div className={classNames(styles.avatarContainer, { [styles.avatarSelect]: select })}>
          <IconHelmet fill={colors[option.color]} width={42} />
        </div>
      </td>
      <td className={styles.details}>
        <div className={styles.nameContainer}>
          <p style={{ width: widthNameContainer }} className={styles.name}>
            {option.name}
          </p>
        </div>
        <div className={styles.info}>
          <p>{formatTime(option.time)}</p>
          <div className={styles.infoPartition} />
          <p>{option.speed} км/ч</p>
        </div>
        <p className={classNames(styles.penalty, { [styles.penaltySelect]: select })}>
          штрафное время: {formatTime(0)}
        </p>
      </td>
    </tr>
  );
};

export default Card;
