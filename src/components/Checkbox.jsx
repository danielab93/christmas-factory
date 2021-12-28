function Checkbox ({name, value, onCheckboxChange, children}) {
    const handleInputChange = (event) => {
        onCheckboxChange(event.target.name, event.target.checked)
      };
    
    return (
        <>
        <label>
        <input 
        type="checkbox" 
        name={name} 
        id={name} 
        onChange={handleInputChange} 
        checked={value}
        />{' '}
        {children}
      </label>
        </>
    );
}


export default Checkbox;