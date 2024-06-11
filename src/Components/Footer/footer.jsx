import React from 'react';
import { Layout, Row, Col, Typography, Divider } from 'antd';
import './footer.css';

const { Footer } = Layout;
const { Title, Link, Text } = Typography;

const CustomFooter = () => {
    return (
        <Footer className="footer-container">
            <Row gutter={16}>
                <Col span={8}>
                    <Title level={4}>Support</Title>
                    <div> <Link href="#">Help</Link> </div>
                   <div><Link href="#">Advisories</Link></div>
                    <div><Link href="#">Status</Link></div>
                </Col>
                <Col span={8}>
                    <Title level={4}>Company</Title>
                    <div> <Link href="#">About</Link> </div>
                   <div><Link href="#">Blog</Link></div>
                    <div><Link href="#">Press</Link></div>
                </Col>
                <Col span={8}>
                    <Title level={4}>Terms and Policies</Title>
                    <div> <Link href="#">Policies</Link> </div>
                    <div><Link href="#">Term of Use</Link></div>
                    <div><Link href="#">Privacy</Link></div>
                </Col>
            </Row>
            <Divider />
            <Text style={{ textAlign: 'center', display: 'block' }}>© 2024 Your Company Name. All rights reserved.</Text>
        </Footer>
    );
};

export default CustomFooter;
