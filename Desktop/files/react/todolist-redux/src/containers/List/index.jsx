import {connect} from "react-redux"
import ListUI from "../../component/List"
import {removeTodo} from "../../redux/action.js"

function mapStateToProps(state) {
    return {state: state}
}

function mapDispatchToProps(dispatch) {
    return {remove:()=>{
        dispatch(removeTodo())
    }}
}

export default connect(mapStateToProps,mapDispatchToProps)(ListUI)