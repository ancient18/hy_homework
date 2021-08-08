import { connect } from "react-redux";
import ItemUI from "../../component/Item";
import { updateTodo,deleteTodo } from "../../redux/action.js";

function mapStateToProps(state) {
  return { state: state };
}

function mapDispatchToProps(dispatch) {
  return {
    handleChecked: (id) => {
      
      return () => {
        dispatch(updateTodo(id));
      };
    },
    handleDelete: (id) => {
      return () => {
        dispatch(deleteTodo(id));
      };
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemUI);
