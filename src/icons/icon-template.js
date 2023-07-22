const template = ({ imports, interfaces, componentName, props, jsx, exports }, { tpl }) => tpl`
import * as React from 'react';
import { getComputedClassName } from '../icon.helpers';
import type { IconType } from '../icon.types';
${'\n'}
function Icon(originalProps: IconType) {
  const { ...props } = originalProps;
  props.className = getComputedClassName(originalProps);

  return ${jsx}
};

const ${componentName} = React.memo(Icon)
export default ${componentName};
`;

module.exports = template;
