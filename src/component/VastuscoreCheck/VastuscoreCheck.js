import { Fragment, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import BreadCrumb from '../UI/BreadCrumb/BreadCrumb'
import MainContent from '../UI/MainContent/MainContent'
import Sidebar from '../UI/SideBar/Sidebar'
import Listitems from './ListItem/ListItem'
import './VastuscoreCheck.css'
import axios from 'axios'
import Cards from './Cards/Cards'
import VastuScoreCalculate from './VastuScoreCalculate/VastuScoreCalculate'

const chunk = (Listarr1, chunkSize = 1, cache = []) => {
  const tmp = [...Listarr1]
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}

let val = chunk([], 3)

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
  const [cardData, setCardData] = useState({})
  const [isCardClicked, setCardClicked] = useState(false)
  const [selectedData, setSelectedData] = useState([{}])
  const [VastuScoreChecked, setVastuScoreChecked] = useState(false)
  const [ScoreData, setScoreData] = useState({
    overAllVastuScore: '',
    roomWiseVastuScore: [{}],
    vastuScoreStatus: '',
  })
 

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

  // const fetchListData = async (cardTitle) => {
  //   // console.log(cardTitle)
  //   axios
  //     .get(
  //       'https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getRoomList',
  //     )
  //     .then((Responsedata) => {
  //       let roomListData = {
  //         Direction: cardTitle,
  //         listData: Responsedata.data.payload.data.roomList,
  //       }

  //       if (roomListData.listData) {
  //         setCardData(roomListData)
  //         setCardClicked(true)
  //       }
  //     })
  // }

  const onCardClickHandler = (item) => {
    //  fetchListData(item)

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

    console.log(selectedData)
  }

  const showSelectedItem = (item) => {
   // console.log(item.reload);
  //  reload.push(item.reload);
    
    for (let key in SelectedListValues) {
      if (SelectedListValues[key].Direction == item.direction) {
        if (item.checked) {
          SelectedListValues[key].RoomList.push(item.value)
          setSelectedData((prevSate) => {
            return [...prevSate], SelectedListValues
          })
          console.log(SelectedListValues)
        } else {
          for (let i = 0; i <= SelectedListValues[key].RoomList.length; i++) {
            if (SelectedListValues[key].RoomList[i] === item.value) {
              console.log(item.value)
              SelectedListValues[key].RoomList.splice(i, 1)
              setSelectedData((prevSate) => {
                return [...prevSate], SelectedListValues
              })
              console.log(SelectedListValues)
            }
          }
        }
        //   console.log(selectedData)
      }
    }
  }
  const goBack=(value)=>{
    setVastuScoreChecked(value.value)

  }
//  console.log(reload)

  const CalculateVastuScore = (DataToalculate) => {
    let obj = {}

    console.log(DataToalculate)
    for (let i in DataToalculate) {
      obj[DataToalculate[i].Direction] = DataToalculate[i].RoomList

      // console.log(DataToalculate[i].Direction)
    }

    const fetchScore = {
      "selectedRoomsAndDirection": obj,
    }
    // console.log(fetchScore)
   

    axios
      .post(
        'https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getVastuScore',
        fetchScore
      )
      .then((Response) => {
       // console.log(Response.data.payload.data)
        setScoreData(Response.data.payload.data)
        setVastuScoreChecked(true)
      })
  }

  const resetValue=()=>{
    setSelectedData([{}])

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
                <Listitems data={cardData} selectedItem={showSelectedItem}>
                  {props.children}
                </Listitems>
              )}
            </div>
          </div>
          {/* <p>{cardData}</p> */}
        </Sidebar>
      )}
      {!VastuScoreChecked && (
        <MainContent>
          <Container>
            <Row key={Math.random()}>
              {DirectionArray.map((item) => {
                return (
                  <Col sm={4} md={4} lg={4} key={Math.random()}>
                    <Cards
                    // reload ={reload}
                      selectedData={selectedData}
                      item={item}
                      onCardClickHandler={onCardClickHandler}
                    ><ul> {props.children}</ul>
                     
                    </Cards>
                  </Col>
                )
              })}
            </Row>

            <Button
              onClick={() => {
                CalculateVastuScore(selectedData)
              }}
            >
              Calculate
            </Button>
          </Container>
        </MainContent>
      )}{' '}
      {VastuScoreChecked && (
        <VastuScoreCalculate ScoreData={ScoreData} goBack={goBack} resetValue={resetValue}>
          {props.children}
        </VastuScoreCalculate>
      )}
    </Fragment>
  )
}
export default VastuscoreCheck
