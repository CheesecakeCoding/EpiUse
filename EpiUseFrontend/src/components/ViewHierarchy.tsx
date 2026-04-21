import { getHierarchy } from "../services/CRUDEmployee";
import { useState } from "react";
import Button from "./Button";

interface ViewHierarchyProps {
  username: string;
  companyID: string;
}
async function populateTable(
  username: string,
  companyID: string,
  setData: any,
) {
  var newData = await getHierarchy(username, companyID);
  console.log(newData);
  try {
    newData = newData.data;
    setData(newData);
  } catch {
    console.log(newData);
  }
}

function ViewHierarchy({ username, companyID, basedata }: ViewHierarchyProps) {
  const [data, setData] = useState([{}]);
  const [refresh, setRefresh] = useState(false);
  const DisplayData = data.map((info: any) => {
    return (
      <>
        <tr>
          <td>{info.name}</td>
          <td>{info.department}</td>
          <td>{info.level}</td>
          <td></td>
          <td colSpan={7}>{info.PATH}</td>
        </tr>
      </>
    );
  });
  function handleRefresh(val: boolean) {
    if (val) {
      populateTable(username, companyID, setData);
    }
    setRefresh(false);
  }
  //populateTable(username, setData);
  //

  return (
    <div className="container flex">
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>department</th>
              <th>Level</th>
              <th> </th>
              <th colSpan={7}>Path</th>

              <th>
                <Button
                  color="outline-secondary"
                  onClick={() => {
                    populateTable(username, companyID, setData);
                  }}
                  block="btn-block"
                  float="float-right"
                  type="button"
                >
                  refresh
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewHierarchy;
