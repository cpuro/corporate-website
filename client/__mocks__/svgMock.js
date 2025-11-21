// __mocks__/svgMock.js
import React from 'react';

const SVGMock = React.forwardRef((props, ref) => (
  <svg ref={ref} {...props} />
));

SVGMock.displayName = 'SVGMock';

export default SVGMock;
export const ReactComponent = SVGMock;
