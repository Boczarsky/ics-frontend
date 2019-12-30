import React, { FormEvent, useState } from 'react';
import './style.css';
import BasicInput from '../../common/BasicInput';
import TagsInput from '../../common/TagsInput';

const SearchShops = () => {
  const [tags, setTags] = useState([] as string[]);
  const [city, setCity] = useState('');
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(city, tags);
  }
  return (
    <div className="search-shops">
      <form className="search-shops__form" onSubmit={handleFormSubmit}>
        <BasicInput
          label="City"
          labelClass="search-shops__label"
          inputProps={{type: 'text', name: 'city', id: 'city', value: city}}
          handleChange={setCity}
        />
        <TagsInput
          label="#Tags"
          labelClass="search-shops__label"
          tags={tags}
          handleChange={setTags}
        />
        <button className="search-shops__submit b-button">Search</button>
      </form>
    </div>
  )
};

export default SearchShops;
