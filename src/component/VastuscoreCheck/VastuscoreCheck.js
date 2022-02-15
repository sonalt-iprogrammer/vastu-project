import { Fragment, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import MyModal from '../UI/Modal/Modal'



import BreadCrumb from '../UI/BreadCrumb/BreadCrumb'
import MainContent from '../UI/MainContent/MainContent'
import Sidebar from '../UI/SideBar/Sidebar'
import './VastuscoreCheck.css'
import axios from 'axios'
import VastuScoreCalculate from './VastuScoreCalculate/VastuScoreCalculate'
import { Link } from 'react-router-dom'

let SelectedListValues = [
  {
    Direction: 'North West',
    RoomList: [],
  },
  {
    Direction: 'North',
    RoomList: [],
  },
  {
    Direction: 'North East',
    RoomList: [],
  },
  {
    Direction: 'West',
    RoomList: [],
  },
  {
    Direction: 'Centre',
    RoomList: [],
  },
  {
    Direction: 'East',
    RoomList: [],
  },
  {
    Direction: 'South West',
    RoomList: [],
  },
  {
    Direction: 'South',
    RoomList: [],
  },
  {
    Direction: 'South East',
    RoomList: [],
  },
]

const VastuscoreCheck = (props) => {
  const [cardData, setCardData] = useState({ Direction: '', listData: [] })

  const [listData, setListData] = useState([
    {
      Direction: 'North West',
      RoomList: [],
    },
    {
      Direction: 'North',
      RoomList: [],
    },
    {
      Direction: 'North East',
      RoomList: [],
    },
    {
      Direction: 'West',
      RoomList: [],
    },
    {
      Direction: 'Centre',
      RoomList: [],
    },
    {
      Direction: 'East',
      RoomList: [],
    },
    {
      Direction: 'South West',
      RoomList: [],
    },
    {
      Direction: 'South',
      RoomList: [],
    },
    {
      Direction: 'South East',
      RoomList: [],
    },
  ])
  const [isCardClicked, setCardClicked] = useState(false)
  const [selectedData, setSelectedData] = useState([{}])
  const [VastuScoreChecked, setVastuScoreChecked] = useState(false)
  const [ScoreData, setScoreData] = useState({
    overAllVastuScore: '',
    roomWiseVastuScore: [{}],
    vastuScoreStatus: '',
  })
  const [listVal, setList] = useState([])

  const [modalShow, setModalShow] = useState(false)

  const DirectionArray = [
    'North West',
    'North',
    'North East',
    'West',
    'Centre',
    'East',
    'South West',
    'South',
    'South East',
  ]

  const onCardClickHandler = (item) => {
    var inputs = document.getElementsByClassName('checkBox')
    //console.log(inputs[0].value)
    // for (let i = 0; i < listData.length; i++) {
    //   if (listData[i].Direction == item && listData[i].RoomList.length !== 0) {
    //     for (var j = 0; j < inputs.length; j++) {
    //       listData[i].RoomList.map((key) => {
    //         if (key == inputs[j].value) {
    //           // var inputVal=inputs[j].value;
    //           document.querySelector("[value = key]").checked= true
    //           // checked.checked = true
    //            console.log(inputs[j].value)
    //           //console.log(this)
    //         }
    //       })
    //     }
    //   }else{
    //   // for (var k = 0; k < inputs.length; k++) {
    //   //   inputs[k].checked = false
    //   }
    // }
    // }
    for (var k = 0; k < inputs.length; k++) {
      inputs[k].checked = false
    }

    axios
      .get(
        'https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getRoomList',
      )
      .then((Responsedata) => {
        let roomListData = {
          Direction: item,
          listData: Responsedata.data.payload.data.roomList,
        }
        setCardData(roomListData)
        setCardClicked(true)
      })

    //console.log(selectedData)
  }

  const isClickedModal = () => {
    setModalShow(true)
  }

  const showSelectedItem = (Direction, e) => {
   
    let listArray = [...listData]
    console.log(listArray)

    for (let i = 0; i < listArray.length; i++) {
      if (e.target.checked) {
        if (listArray[i].Direction == Direction.Direction &&  !listArray[i].RoomList.includes(e.target.value)) {
          listArray[i].RoomList.push(e.target.value)
        }
      } else {
        if (listArray[i].Direction == Direction.Direction) {
          listArray[i].RoomList.splice(
            listArray[i].RoomList.indexOf(e.target.value),
            1,
          )
        }
      }

      console.log(listArray)
      setListData(listArray)
    }
  }

  const goBack = (value) => {
    setVastuScoreChecked(value.value)
  }
  //  console.log(reload)

  const CalculateVastuScore = (DataToalculate) => {
    console.log(DataToalculate[0])
    if (Object.keys(DataToalculate[0]).length === 0) {
      console.log('please fill something')
    } else {
      let obj = {}

      console.log(DataToalculate)
      for (let i in DataToalculate) {
        obj[DataToalculate[i].Direction] = DataToalculate[i].RoomList

        // console.log(DataToalculate[i].Direction)
      }

      const fetchScore = {
        selectedRoomsAndDirection: obj,
      }
      // console.log(fetchScore)

      axios
        .post(
          'https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getVastuScore',
          fetchScore,
        )
        .then((Response) => {
          // console.log(Response.data.payload.data)
          setScoreData(Response.data.payload.data)
          setVastuScoreChecked(true)
        })
    }
  }

  const resetValue = () => {
    let resetValues = [...listData]
    console.log(resetValues)
    for (let i = 0; i < resetValues.length; i++) {
      resetValues[i].RoomList = []
    }
    console.log(resetValues)
    setListData(resetValues)
    setCardClicked(false)
  }

  return (
    <Fragment>
      {!VastuScoreChecked && (
        <Sidebar>
          <div className="vastuSidebar">
            <BreadCrumb style={{ marginleft: '1rem' }}></BreadCrumb>
            {!isCardClicked && (
              <p>
                Select the rooms that are present in each direction of your hone
                by clicking on the relevant boxes on the right.
              </p>
            )}
            <div className="ListCard">
              {isCardClicked && (
                <div>
                  <Card className="listCard">
                    <div>
                      {' '}
                      <h2>{cardData.Direction}</h2>
                    </div>
                    <div className="linkClass">
                      <p>Want to know more about North-West?</p>
                      <Link to="" onClick={isClickedModal}>
                        {' '}
                        Read Now ?
                      </Link>
                    </div>
                    <p>
                      Select the rooms that are present in North West direction
                      of your home by tapping on the boxes below:
                    </p>
                    <Row>
                      {cardData.listData.map((item, index) => {
                        return (
                          <Col
                            key={index}
                            sm={6}
                            style={{
                              borderBottom: '1px Solid #dee2e6',
                              borderRight: '1px Solid #dee2e6',
                              padding: '20px 20px',
                            }}
                          >
                            {' '}
                            <input
                              className="checkBox"
                              type="checkbox"
                              value={item}
                              onClick={(e) =>
                                showSelectedItem(
                                  { Direction: cardData.Direction },
                                  e,
                                )
                              }
                            />
                            {item}
                          </Col>
                        )
                      })}
                    </Row>

                    <MyModal
                    modalData={cardData.Direction}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                  </Card>
                </div>
               
              )}
            </div>
          </div>
          {/* <p>{cardData}</p> */}
        </Sidebar>
      )}
      {!VastuScoreChecked && (
        <MainContent>
          <Container>
            <Row>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="North West"
                  onClick={(e) => onCardClickHandler('North West', e)}
                >
                  <h5>NORTH WEST</h5>
                  <hr />
                  <ul>
                    {listData[0].RoomList.map((item) => {
                      return <li>{[item]}</li>
                    })}
                  </ul>
                </Card>
              </Col>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="North"
                  onClick={() => onCardClickHandler('North')}
                >
                  <h5>NORTH</h5>
                  <hr />
                  <ul>
                    {listData[1].RoomList.map((item) => {
                      return <li>{[item]}</li>
                    })}
                  </ul>
                </Card>
              </Col>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="North East"
                  onClick={() => onCardClickHandler('North East')}
                >
                  <h5>NORTH EAST</h5>
                  <hr />
                  <ul>
                    {listData[2].RoomList.map((item) => {
                      return <li>{[item]}</li>
                    })}
                  </ul>
                </Card>
              </Col>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="West"
                  onClick={() => onCardClickHandler('West')}
                >
                  <h5>WEST</h5>
                  <hr />
                  <ul>
                    {listData[3].RoomList.map((item) => {
                      return <li>{[item]}</li>
                    })}
                  </ul>
                </Card>
              </Col>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="Centre"
                  onClick={() => onCardClickHandler('Centre')}
                >
                  <h5>CENTER OF THE HOME</h5>
                  <hr />
                  <ul>
                    {listData[4].RoomList.map((item) => {
                      return <li>{[item]}</li>
                    })}
                  </ul>
                </Card>
              </Col>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="East"
                  onClick={() => onCardClickHandler('East')}
                >
                  <h5>EAST</h5>
                  <hr />
                  <ul>
                    {listData[5].RoomList.map((item) => {
                      return <li>{[item]}</li>
                    })}
                  </ul>
                </Card>
              </Col>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="South West"
                  onClick={() => onCardClickHandler('South West')}
                >
                  <h5>SOUTH WEST</h5>
                  <hr />
                  <ul>
                    {listData[6].RoomList.map((item) => {
                      return <li>{[item]}</li>
                    })}
                  </ul>
                </Card>
              </Col>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="South"
                  onClick={() => onCardClickHandler('South')}
                >
                  <h5>SOUTH</h5>
                  <hr />
                  <ul>
                    {listData[7].RoomList.map((item) => {
                      return <li>{[item]}</li>
                    })}
                  </ul>
                </Card>
              </Col>
              <Col sm={4} md={4} lg={4} key={Math.random()}>
                <Card
                  className="MyCard"
                  item="South East"
                  onClick={() => onCardClickHandler('South East')}
                >
                  <h5>SOUTH EAST</h5>
                  <hr />
                  <ul>
                    {listData[8].RoomList.map((item) => {
                      return <li>{[item]}</li>
                    })}
                  </ul>
                </Card>
              </Col>
            </Row>

            <div style={{ display: 'flex' ,marginTop:'10 rem'}}>
              <Button
                style={{
                  display: 'inline-block',
                  marginRight: '150px',

                  flex: '1',

                  background: '#FF7021',
                  borderRadius: '4px',
                  color: 'white',
                }}
                onClick={() => {
                  resetValue()
                }}
              >
                RESET
              </Button>
              <Button
                style={{
                  display: 'inline-block',
                 flex:'1',
                  background: '#FF7021',
                  borderRadius: '4px',
                  color: 'white',
                }}
                onClick={() => {
                  CalculateVastuScore(listData)
                }}
              >
                CALCULATE
              </Button>
            </div>
          </Container>
        </MainContent>
      )}{' '}
      {VastuScoreChecked && (
        <VastuScoreCalculate
          ScoreData={ScoreData}
          goBack={goBack}
          resetValue={resetValue}
        >
          {props.children}
        </VastuScoreCalculate>
      )}
    </Fragment>
  )
}
export default VastuscoreCheck
