import PropTypes from 'prop-types';
import TakeList from '../takes/TakePropTypes';

var ChunkPropTypes = PropTypes.shape(
  {
    mode: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    ...TakeList.propTypes,
  }
).isRequired;
export default ChunkPropTypes;
