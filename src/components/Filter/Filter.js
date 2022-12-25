import PropTypes from 'prop-types';

export const Filter = ({ filter, onChange }) => {
  return (
    <label>
      Find contacts by name{' '}
      <input type="text" name="filter" value={filter} onChange={onChange} />
    </label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
