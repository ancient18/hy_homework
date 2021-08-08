import { connect } from "react-redux";
import HeaderUI from "../../component/Header";
import { addTodo } from "../../redux/action.js";

function mapStateToProps(state) {
  return { state: state };
}

function mapDispatchToProps(dispatch) {
  return {
    add: (event) => {
      const { target, keyCode } = event;
      if (keyCode === 13) {
        if (target.value.trim() === "") {
          alert("输入不能为空");
          return;
        } else {
            dispatch(addTodo(target.value));
            console.log(target.value);
        }
      }
      
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUI);
