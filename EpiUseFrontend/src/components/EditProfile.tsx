import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function EditProfile() {
  return (
    <div className="container">
      <div className="row vh-100 align-items-center justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4 bgwhite- rounded p-3 shadow">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
