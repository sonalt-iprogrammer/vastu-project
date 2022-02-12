import { useState } from 'react'
import { Card, Col, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MyModal from '../../UI/Modal/Modal'
import './ListItem.css'
import axios from 'axios'



const Listitems = (props) => {
  const [modalShow, setModalShow] = useState(false)

  const data = props.data
  console.log(data)
 

  const itemSelectHandler = (direction,event) => {
    console.log(direction.pageReload)
    props.selectedItem({
      value: event.target.value,
      direction: direction.Direction,
      checked: event.target.checked,
      reload:direction.pageReload,
    })
  }
  const isClickedModal=()=>{
    setModalShow(true)
  }

  return (
    <div>
      <Card className="listCard">
        <div>
          {' '}
          <h2>{data.Direction}</h2>
        </div>
        <div className="linkClass">
          <p>Want to know more about North-West?</p>
          <Link to="" onClick={isClickedModal}>
            {' '}
            Read Now ?
          </Link>
        </div>
        <p>
          Select the rooms that are present in North West direction of your home
          by tapping on the boxes below:
        </p>
        <Row>
          {data.listData.map((item) => {
            return (
              <Col
                key={Math.random()}
                sm={6}
                style={{
                  borderBottom: '1px Solid #dee2e6',
                  borderRight: '1px Solid #dee2e6',
                  padding: '20px 20px',
                }}
              >
                {' '}
                <input
                  className="checkbox"
                  type="checkbox"
                  value={item}
                  onChange={(e) =>
                    itemSelectHandler({" Direction": data.Direction,"pageReload":false }, e)
                  }
                />
                {item}
              </Col>
            )
          })}
        </Row>
        
        <MyModal
          modalData={data.Direction}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Card>
    </div>
  )
}

export default Listitems
