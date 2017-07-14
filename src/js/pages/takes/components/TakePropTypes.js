import PropTypes from "prop-types";

var TakePropTypes = PropTypes.shape(
    {
        id: PropTypes.number.isRequired,
        location: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        timestamp: PropTypes.string.isRequired,
        isExport: PropTypes.bool.isRequired
    }
).isRequired;

export default TakePropTypes;