import styled from 'styled-components';
import { useState } from 'react';

function ProductTags({ label, tags, onUpdateTags, onDeleteTag}) {
  const [tagInput, setTagInput] = useState('');

  const handleChange = (event) => {
    const tagInputValue = event.target.value;
    setTagInput(tagInputValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Wenn Enter gedrückt, schicke das Formular nicht ab
      event.preventDefault();
      onUpdateTags(tagInput.toUpperCase());
      setTagInput('');
    }
    // Lösche letzten tag, wenn backspace gedrückt wird
    // Lösche nur, wenn keine aktuelle Eingabe besteht (tagInput ==='')
    if (event.key === 'Backspace' && tagInput === '' && tags.length > 0) {
        onDeleteTag(tags[tags.length-1]);
    }
  };

  return (
    <TagsContainer>
        <TagsWrapper>
        {
        tags.map((tag, index) => 
          <Tag key={index} onClick={() => onDeleteTag(tag)}>{tag} <span>&times;</span> </Tag>)
        }
      <label htmlFor="tags">{label}</label>
      <input
        type="text"
        id="tags"
        name="tags"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a tag"
        value={tagInput}
      />
      
      </TagsWrapper>
    </TagsContainer>
  )
}

export default ProductTags;

const TagsContainer = styled.section`
  display: grid;
  margin-bottom: 1.5rem;
  place-items: center;
  width: 80%;
  label {
    font-weight: bold;
  }
  input {
    border: none;
    border-left: 2px solid #999;
    width: 80px;
    padding: 0.5rem 0.2rem;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    outline: none;
  }
`;

const TagsWrapper = styled.div`
  border: 1px solid #333;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  margin: 3px;
`;

const Tag = styled.span`
  background: #bb2528;
  border-radius: 0.3rem;
  color: #f8b229;
  margin: 0.2rem;
  padding: 0.2rem 0.4rem 0.3rem;
  span {
      color: darkred;
      background: darkgoldenrod;
      cursor: pointer;
      display: inline-block;
      border-radius: 50%;
      padding: 0 3px;
      width: 0.7rem;
      height: 1.2rem;
      text-align: center;
  }
`;
