import axios from 'axios'
import { useState } from 'react'
import { Card, Row, Table, Col, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './VastuScoreCalculate.css'



const VastuScoreCalculate = (props) => {
  const [roomModalData, setRoomModalData] = useState({
    room: '',
    favourableDirections: [],
    nuetralDirections: [],
    unfavourableDirections: [],
  })
  const [ModalShow, setModalShow] = useState(false)
  const navigate = useNavigate()
  const roomWiseVastuScore = props.ScoreData.roomWiseVastuScore
  //let Res = data.listData
  
  // console.log(roomWiseVastuScore)
  const favourableDirections = []
  const nuetralDirections = []
  const unfavourableDirections = []
  let favourable = false
   let nuetral= false
   let avoidable = false


  const onGoBackClick =()=>{
    props.goBack({
      "value":false
    });
  }
  const resetting=()=>{
    
    props.resetValue();
    props.goBack({
      "value":false
    });


  }
  

  const onLegendClick = (room) => {
    setModalShow(true)
    axios
      .post(
        'https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getRoomDetails',
        { roomName: room },
      )
      .then((Response) => {
        const MyData = Response.data.payload.data

        for (let key in MyData) {
          if (key == 'favourableDirections') {
            for (let i = 0; i < MyData[key].length; i++) {
              favourableDirections.push(MyData[key][i])
              console.log(MyData[key][i])
            }
          } else if (key == 'unfavourableDirections') {
            for (let i = 0; i < MyData[key].length; i++) {
              unfavourableDirections.push(MyData[key][i])
            }
          } else if (key == 'neutralDirections') {
            for (let i = 0; i < MyData[key].length; i++) {
              nuetralDirections.push(MyData[key][i])
            }
          }
        }
        console.log(favourableDirections)
        setRoomModalData({
          room: room,
          favourableDirections: favourableDirections,
          nuetralDirections: nuetralDirections,
          unfavourableDirections: unfavourableDirections,
        })
      })
  }
  console.log(favourableDirections)

 

  return (
    <div>
      <Card style={{ margin: '5rem 20rem 1rem 20rem' }}>
        <div>
          <a onClick={onGoBackClick}>
            <img src="assets/images/back_arrow-orange.png" alt="back_icon" />
            <span style={{ color: ' #FF7021' }}>GO BACK</span>
          </a>
        </div>
        <h5
          style={{
            color: ' #666666',
            fontWeight: '600',
            fontSize: '18px',
            lineHeight: '24px',
            letterSpacing: '2px',
          }}
        >
          OVERALL VAASTU SCORE
        </h5>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ color: ' #D11E4C' }}>
            {props.ScoreData.overallVastuScore}
          </h1>
          <h5 style={{color:"#503796"}}>{props.ScoreData.vastuScoreStatus}</h5>
        </div>
        <hr />
        <p
          style={{
            color: ' #666666',
            fontWeight: '600',
            fontSize: '18px',
            lineHeight: '24px',
            letterSpacing: '2px',
          }}
        >
          ROOM-WISE BREAKUP OF VAASTU SCORE
        </p>
        <p style={{ color: ' #666666' }}>
          Tap on any room name to know more about the details of the room.
        </p>
        <hr />
        <Row>
          {roomWiseVastuScore.map((item) => {
            
            return (
              <Col
                key={Math.random()}
                sm={6}
                style={{
                  borderBottom: '1px Solid #dee2e6',
                  borderRight: '1px Solid #dee2e6',
                  padding: '20px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {' '}
                <div>{item.room}</div>
                <div>
                  <input
                  type="button"
                  style={{width:" 120px",
                    height:" 28px",
                    borderRadius: "8px",textTransform:" uppercase",border:"none", fontWeight:"600px"}}
                    onClick={() => {
                      onLegendClick(item.room)
                    }}
                  
                  value={item.legend}/>
                   
                  
                 
                </div>
              </Col>
            )
          })}
        </Row>
      </Card>
      <button onClick={()=>resetting()}
        style={{
          width: '380px',
          height: '50px',
          marginLeft: '45rem',
          background: '#FF7021',
          borderRadius: '4px',
          color: 'white',
          border:"none"
        }}
      >
        RESET VASTU SCORE
      </button>
      <div
        style={{
          background: ' #34BDB4',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.029693)',
          borderRadius: '10px',
          margin: '1rem 20rem 2rem 20rem',
          border:"none"
        }}
      >
        <div style={{ padding: '3rem' }}>
          <h5>Vaastu Compliant Plans</h5>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p>
                We create Vaastu compliant 2D and 3D plans. Check out our
                gallery of plans now.
              </p>
            </div>
            <div>
              <img src="assets/images/map.svg" />
            </div>
          </div>
        </div>
      </div>

      <Modal
        onHide={() => setModalShow(false)}
        show={ModalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="myModal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {roomModalData.room}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ margin: '4px' }}>
            <h5 style={{ margin: '4px' }}>FAVOURABLE DIRECTIONS</h5>
            {roomModalData.favourableDirections.map((item) => {
              return (
                <button
                  style={{
                    margin: '4px',
                    border: 'none',
                    background: '#fae8ed',
                    color: '#d11e4c',
                    height: '3rem',
                    fontWeight: '600',
                    fontSize: '20px',
                  }}
                >
                  {item}
                </button>
              )
            })}
          </div>
          <div style={{ margin: '4px' }}>
            <h5 style={{ margin: '4px' }}>NEUTRAL DIRECTIONS</h5>
            {roomModalData.nuetralDirections.map((item) => {
              return (
                <button
                  style={{
                    margin: '4px',
                    background: '#f1fbf2',
                    color: '#15b525',
                    border: 'none',
                    height: '3rem',
                    fontWeight: '600',
                    fontSize: '20px',
                    border:"none"
                  }}
                >
                  {item}
                </button>
              )
            })}
          </div>
          <div style={{ margin: '4px' }}>
            <h5 style={{ margin: '4px' }}>AVOIDABLE DIRECTIONS</h5>
            {roomModalData.unfavourableDirections.map((item) => {
              return (
                <button
                  style={{
                    margin: '4px',
                    background: '#fffae6',
                    color: '#ffcd02',
                    border: 'none',
                    height: '3rem',
                    fontWeight: '600',
                    fontSize: '20px',
                    border:"none"
                  }}
                >
                  {item}
                </button>
              )
            })}
          </div>
          <strong style={{ margin: '4px' }}>ABOUT</strong>

          <ul>
            <li>
              {' '}
              <strong>Drained water pipe position:</strong> You should provide
              fitting of pipes for drained water in the northeast. The bathroom
              floor slope should be towards north and east, so water drains to
              the northeast side of the bathroom.
            </li>
            <hr />
            <li>
              <strong>Shower, taps, and mirror position:</strong> Shower and
              fixtures in the bathroom can be attached to the northern wall.
            </li>
            <hr />
            <li>
              <strong>Geyser position:</strong> You can place the geyser in the
              southeast corner.
            </li>
            <hr />
            <li>
              <strong>Bathtub &amp; Washbasin position:</strong> You can place
              the bathtub in the western corner and provide space for a
              washbasin in the northeastern corner.
            </li>
            <hr />
            <li>
              <strong>Overhead tank position:</strong> The Overhead tanks should
              be in the southwest part of the site.
            </li>
            <hr />
            <li>
              <strong>Window/ ventilator position:</strong> There should be
              windows or ventilators in the east or the north.
            </li>
            <hr />
            <li>
              <strong>Showerhead/ bath position: </strong>You can take a bath in
              the western position of bathroom
            </li>
            <hr />
            <li>
              <strong>Bathrooms without W.C./ commode: </strong>You can place
              bathrooms<strong> </strong>without attached Toilet in the east or
              between east and north-east of your home.
            </li>
            <hr />
          </ul>

          <div></div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  )
}
export default VastuScoreCalculate
