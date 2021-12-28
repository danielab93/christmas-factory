function TextInput ({name, value, onTextInputChange, children}) { // name vom inputfield

  function handleChange(event) {
    onTextInputChange(event.target.name, event.target.value);
  }

    return (
    <>
    <label htmlFor={name}>{children}</label>
      <input 
      type="text" 
      id={name} 
      name={name} 
      onChange={handleChange} 
      value={value}
      />
    </>  
    );
}

export default TextInput;