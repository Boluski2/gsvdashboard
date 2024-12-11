
import Styles from './Index.css'

export default function HubHome () {
    return (
        <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th colSpan="3">Hubname</th>
            </tr>
            <tr>
              <th colSpan="3">OYO STATE</th>
            </tr>
          </thead>
          <tbody>
            {/* Add empty rows here */}
            <tr>
              <td>SIZE</td>
              <td>SIZE</td>
              <td>SIZE</td>
            </tr>
            <tr>
              <td colSpan="3">Total Road Lenght</td>
            </tr>
            <tr colSpan="2">
              <td>200km</td>
              <td>80%</td>
            </tr>
            <tr>
              <td colSpan="3">Last Collected Data</td>
            </tr>
            <tr>
              <td colSpan="3">Camera</td>
            </tr>
            <tr >
              <td>1</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr >
              <td>4</td>
              <td>5</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      </div>
  
    )
}

