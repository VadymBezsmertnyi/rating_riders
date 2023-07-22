// types
import classNames from 'classnames';
import type { IconType } from './icon.types';

export const getComputedClassName = (props: IconType) => {
  const { className } = props;
  const computedClassName = classNames(className);

  return computedClassName;
};
