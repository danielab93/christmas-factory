function NumberInput ({name, value, onNumberInputChange, children}) {
// name = price
    function handleChange(event) {
        const parsedValue = parseFloat(event.target.value)
        onNumberInputChange(event.target.name, parsedValue);
    }

    return (
        <>
        <label htmlFor={name}>{children}</label>
      <input 
      type="number" 
      id={name} 
      name={name} // name=price
      onChange={handleChange} 
      value={value}
      />
    </>
    );
}

export default NumberInput