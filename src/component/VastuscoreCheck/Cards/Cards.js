import './Cards.css'
import { Row, Col, Card, ul, li } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'

const Cards = (props) => {
  
  console.log(props.reload)
  const arr =[]
  props.selectedData.map((key)=>{
    if(key.Direction==props.item){
      key.RoomList.map((item)=>{
        arr.push(item)
      })
    }

  })
  


  return (
    <Card
      className="MyCard"
      key={props.item}
      onClick={() => props.onCardClickHandler(props.item)}
    >
      {props.item}
      <hr />
     
      {arr.map((list)=>{
        return<li >{list}</li>

      })}
     
      {/* <div >
        {props.selectedData.map((key) => {
         // console.log(key.Direction)
          if (key.Direction == props.item) {
           // console.log(key.Direction)
            key.RoomList.map((singleRoom) => {
            //  console.log(singleRoom)
              return <li>{singleRoom}</li>
            })
          }
        })}
      </div> */}
    </Card>


    
  )
}
export default Cards
