import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types'; 
import {
  HeaderBar,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './searchbar.styled'

const Searchbar = ({ onSubmit }) => {
  const [queryForm, setQueryForm] = useState('');

  const handleChange = ({ target }) => {
    setQueryForm(target.value.trim());
  }

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(queryForm);
    // setQueryForm('')
  };

  return (
    <HeaderBar className="searchbar">
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <FcSearch />
          <SearchFormBtnLabel></SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          name="queryForm"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={queryForm}
        />
      </SearchForm>
    </HeaderBar>
  );
};

export default Searchbar

Searchbar.propTypes = {
  state: PropTypes.shape({
    queryForm: PropTypes.string.isRequired
  })
}