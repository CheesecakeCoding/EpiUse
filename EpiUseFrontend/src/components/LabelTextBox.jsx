function LableTextBox(lable) {
  var lable = "this is a lable:";
  var type = "text";
  var position = "leftChildren";
  var required = false;
  return (
    <div class={position}>
      <label for={lable}>
        <b>{lable}</b>
      </label>
      <input type={type} placeholder="Enter Password" name={lable} />
    </div>
  );
}

export default LableTextBox;
