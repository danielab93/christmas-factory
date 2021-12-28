function RadioButton({ value, children, onRadioChange }) {
    const handleInputChange = (event) => {
      onRadioChange(event.target.name, event.target.value);
    };
  
    return (
      <span>
        {children}
        <label>
          <input
            type="radio"
            value="small"
            checked={value === 'small'}
            onChange={handleInputChange}
            name="packageSize"
          />
          S
        </label>
        <label>
          <input
            type="radio"
            value="medium"
            checked={value === 'medium'}
            onChange={handleInputChange}
            name="packageSize"
          />
          M
        </label>
        <label>
          <input
            type="radio"
            value="large"
            checked={value === 'large'}
            onChange={handleInputChange}
            name="packageSize"
          />
          L
        </label>
      </span>
    );
  }
  
  export default RadioButton;