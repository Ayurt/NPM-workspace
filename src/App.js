import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'antd/dist/reset.css';
import Navbar from "./Components/Navbar/Navbar";
import SearchBar from "./Components/SearchBar/Searchbar";
import Body from "./Components/Body/Body";
import Footer from "./Components/Footer/footer";

const App = () => {

    return ( <
        Router >
        <
        Navbar / >
        <
        SearchBar / >
        <
        Body /
        >
        <
        Footer /
        >
        <
        /Router>
    );
}

export default App;