import { connect } from "react-redux";
import ItemUI from "../../component/Item";
import { updateTodo,deleteTodo } from "../../redux/action.js";

function mapStateToProps(state:{[propName:string]:any}) {
  return { state: state };
}

function mapDispatchToProps(dispatch:any) {
  return {
    handleChecked: (id:number|string) => {
      
      return () => {
        dispatch(updateTodo(id));
      };
    },
    handleDelete: (id:number|string) => {
      return () => {
        dispatch(deleteTodo(id));
      };
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemUI);
