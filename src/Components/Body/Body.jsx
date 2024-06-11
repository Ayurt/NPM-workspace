import React from 'react';
import { Typography } from 'antd';
import './Body.css'; 
const { Title } = Typography;

const Body = () => {
  return (
    <div className="body-container">
      <Title level={2} style={{ textAlign: 'center', color: 'white' }}>
        <span style={{ fontWeight: 'bold', fontSize: '70px' }}>Build Amazing Things</span><br/><br/>
        <p style={{ fontSize: '20px' }}>We're GitHub, the company behind the npm Registry and npm CLI.
        We offer those to the community for free, but our day job is building and selling useful tools for developers like you.</p> <br/>
        <span style={{ fontWeight: 'bold' , fontSize: '45px' }}>Take your JavaScript development up a notch</span><br/><br/>
     
      </Title>
      
    </div>
  );
};

export default Body;
