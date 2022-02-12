import { propTypes } from 'react-bootstrap/esm/Image'
import './MainContent.css'

const MainContent = (props) =>{
    return(<div className='main'>{props.children}</div>)
}
export default MainContent