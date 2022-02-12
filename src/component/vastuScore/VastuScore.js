import { Fragment, useEffect, useState } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import BreadCrumb from '../UI/BreadCrumb/BreadCrumb'
import MyModal from '../UI/Modal/Modal'
import Sidebar from '../UI/SideBar/Sidebar'
import './VastuScore.css'
const VastuScore = () => {
  const [modalShow, setModalShow] = useState(false);
  const [RoomList, setRoomList] = useState([])
  const [isLoading, setIsLoading] = useState(false);
console.log(isLoading)

  useEffect(() => {
    setIsLoading(true);
    console.log(isLoading)
    fetch(
      'https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getRoomList',
    )
      .then((response) => {
        return response.json()
      })
      .then((responceData) => {
        setIsLoading(false);
        setRoomList(
          responceData.payload.data.roomList.map((item) => {
            return item
          }),
        )
      })
     

    //   console.log('Test')
    //   const fetchMeals = async () => {
    //     console.log('respo')
    //     const response = await fetch(
    //       'https://foodorder-5f947-default-rtdb.firebaseio.com/meals.json',
    //     )
    //    // const Response = await fetch('https://luayn58dm9.execute-api.ap-south-1.amazonaws.com/stage/vastu/getRoomList');
    //     console.log(Response);

    //     const ResponseData = await Response.json();
    //     console.log(ResponseData);
    //    // const RoomListArray = ResponseData.payload.data.roomList;
    //    for(const key in ResponseData){
    //      console.log(key);
    //    }
    //     //setRoomList(RoomListArray);
    //    // console.log(RoomListArray);

    //   }
 

  }, [setIsLoading])
 

  console.log(RoomList)

  const chunk = (Listarr1, chunkSize = 1, cache = []) => {
    const tmp = [...Listarr1]
    if (chunkSize <= 0) return cache
    while (tmp.length) cache.push(tmp.splice(0, chunkSize))
    return cache
  }

  let val = chunk([...RoomList], 2)

  return (
    <Fragment>
      <Sidebar>
        <div className="vastuSidebar">
          <BreadCrumb style={{ marginleft: '1rem' }}></BreadCrumb>
          <p>
            Tap on a room below to see the suitable direction for it in your
            home alongside additional information
          </p>
          <h1>{isLoading}</h1>
          {isLoading&&<p className='isLoading'>Loading Data...Please Wait</p>}
         {!isLoading&& <div>
           
           {val.map((items) => {
             return (
               <Row key={Math.random()}>
                 {items.map((item) => {
                   return (
                     <Col key={item}>
                       <Card className="MyCard" key={item}  onClick={() => setModalShow(true)}>
                         {item}
                       </Card>
                     </Col>
                   )
                 })}
               </Row>
             )
           })}
         

         </div>} 
          
         
        </div>
      </Sidebar>
       
      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Fragment>
  )
}
export default VastuScore
