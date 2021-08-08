import {connect} from "react-redux"
import ListUI from "../../component/List"
import {removeTodo} from "../../redux/action.js"

function mapStateToProps(state:{[propName:string]:any}) {
    return {state: state}
}

function mapDispatchToProps(dispatch:any) {
    return {remove:()=>{
        dispatch(removeTodo())
    }}
}

export default connect(mapStateToProps,mapDispatchToProps)(ListUI)