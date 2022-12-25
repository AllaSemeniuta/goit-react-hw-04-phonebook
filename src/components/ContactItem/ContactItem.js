import PropTypes from 'prop-types';

export const ContactItem = ({ name, number, onDeleteContact }) => {
  return (
    <p>
      {name} : {number}{' '}
      <button type="button" onClick={onDeleteContact}>
        Delete
      </button>
    </p>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
