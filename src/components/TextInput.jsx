function TextInput ({name, value, onTextInputChange, children}) { // name vom inputfield
  // {children} = alles, was zwischen den TextInput-tags steht, hier: "Product Name"
  function handleChange(event) {
    onTextInputChange(event.target.name, event.target.value);
  }

    return (
    <>
    <label htmlFor={name}>{children}</label>
      <input 
      type="text" 
      id={name} 
      name={name} // name="name" oder name="contactEmail"
      onChange={handleChange} 
      value={value}
      />
    </>  
    );
}

export default TextInput;