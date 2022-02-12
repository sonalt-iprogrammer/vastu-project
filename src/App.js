
import './App.css'
import  Header from './component/CommonLayout/Header/header'
import Dashboard from './component/Dashboard/Dashboard'
import {Routes,Route} from 'react-router-dom'
import VastuScore from './component/vastuScore/VastuScore'
import VastuscoreCheck from './component/VastuscoreCheck/VastuscoreCheck'
import { Fragment } from 'react'
function App() {
  return (
  <Fragment>
    <Header></Header>


   

 <Routes>
 <Route path ='/' element={ <Dashboard className="Dashboard"></Dashboard>}>

</Route>
 <Route path='/vastuscore'  element={<VastuScore/>} />

 <Route path='/vastuscorecheck'  element={<VastuscoreCheck/>} />
 </Routes>
  
  </Fragment>
    
   
   
)
}

export default App
// import { useState } from 'react';

// import{ Modal ,Button} from'react-bootstrap'
// function MyVerticallyCenteredModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Modal heading
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Centered Modal</h4>
//         <p>
//           Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//           dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//           consectetur ac, vestibulum at eros.
//         </p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// function App() {
//   const [modalShow, setModalShow] = useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }
// export default App

