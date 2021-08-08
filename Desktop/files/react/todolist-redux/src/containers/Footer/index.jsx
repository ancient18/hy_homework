import { connect } from "react-redux";
import FooterUI from "../../component/Footer";
import { removeTodo, allAddTodo,allDeleTodo } from "../../redux/action.js";

function mapStateToProps(state) {
  return { state: state };
}

function mapDispatchToProps(dispatch) {
  return {
    remove: () => {
      dispatch(removeTodo());
    },
    allAdd: () => {
      dispatch(allAddTodo());
    },
    allDele: () => {
        dispatch(allDeleTodo());
      },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterUI);
