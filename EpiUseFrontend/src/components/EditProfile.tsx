import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

interface EditProfileProps {
  name: string;
  username: string;
  lastname: string;
  company: string;
  sha256: string;
  profilepic: string;
}

function EditProfile(
  name = "",
  username = "",
  lastname = "",
  company = "",
  sha256 = "",
  profilepic = "",
) {
  return (
    <div className="container">
      <div className="row vh-100 align-items-center justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4 bgwhite- rounded p-3 shadow">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={profilepic} />
            <Card.Body>
              <Card.Title>
                {name} {lastname}
              </Card.Title>
              <Card.Text>Using the following email adress</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
