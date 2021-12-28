function Select ({name, value, children, options, onSelectChange}) {
    const handleInputChange = (event) => {
        onSelectChange(event.target.name, event.target.value);
    };

    return (
    <>
    <label htmlFor={name}>{children}</label>
      <select value={value} onChange={handleInputChange} name={name} id={name}>
          <option value="">–– Please choose ––</option>
          {options.map((option, index) => (
          <option key={index} value={option.toUpperCase()}>{option}</option>
        ))}
      </select>
    </>
  );
}

export default Select;