import "bootstrap/dist/css/bootstrap.css";

function LoginPanel() {
  return (
    <div class="CenterDiv">
      <form action="action_page.php" method="post">
        <div class="imgcontainer">
          <img src="img_avatar2.png" alt="Avatar" class="avatar" />
        </div>
        <br />
        <div class="container">
          <label for="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
          />
          <br />
          <label for="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
          />
          <br />
          <span class="psw left">
            Forgot <a href="#">password?</a>
          </span>

          <button type="submit right">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPanel;
