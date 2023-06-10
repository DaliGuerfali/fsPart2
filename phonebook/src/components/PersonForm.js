const PersonForm = ({onNameChange, nameValue, onNumberChange, numberValue, onClick}) => {
    return (
      <form>
          <div>
            name: <input onChange={onNameChange} value={nameValue} />
          </div>
          <div>
            number: <input onChange={onNumberChange} value={numberValue} />
          </div>
          <div>
            <button onClick={onClick} type="submit">add</button>
          </div>
        </form>
    );
}

export default PersonForm;