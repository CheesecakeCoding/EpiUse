self.$RefreshReg$ = () => {};
self.$RefreshSig$ = () => () => {};

export function FailedAlert() {
  return (
    <div className="alert alert-danger">Incorrect username or password</div>
  );
}

export default FailedAlert;
