import "./styles.css";
import van from "vanjs-core";
import App from "./app";

const Main = () => {
    van.add(document.getElementById("app")!, App);
};

export default Main;
