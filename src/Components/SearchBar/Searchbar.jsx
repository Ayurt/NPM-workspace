import React, { useState, useEffect } from 'react';
import { Input, Button, Spin, Card, Typography, Space, Row, Col } from 'antd';
import axios from 'axios';
import './SearchBar.css';
import { marked } from 'marked';
import { CopyOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;

const Searchbar = ({ setShowSearchResult }) => {
    const [query, setQuery] = useState('');
    const [packageInfo, setPackageInfo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [readmeHtml, setReadmeHtml] = useState('');

    useEffect(() => {
        if (query && !selectedPackage) {
            handleSearch();
        } else {
            setSearchResults([]);
        }
    }, [query, selectedPackage]);

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${query}`);
            setSearchResults(response.data.objects);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePackageClick = async (packageName) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`https://registry.npmjs.org/${packageName}`);
            console.log(response.data); // Log the entire package data
            setPackageInfo(response.data);
            setSearchResults([]);
            setSelectedPackage(packageName);
          //  const readmeResponse = await axios.get(`https://registry.npmjs.org/${packageName}/${response.data['dist-tags'].latest}/readme`);
            const readmeHtml = packageInfo.readme;
            setReadmeHtml(readmeHtml);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Command copied to clipboard:', text);
            })
            .catch((error) => {
                console.error('Failed to copy command:', error);
            });
    };

    const renderLinks = (packageInfo) => {
        const links = [];

        if (packageInfo.repository?.url) {
            links.push({ label: 'Repository', url: packageInfo.repository.url });
        }

        if (packageInfo.homepage) {
            links.push({ label: 'Homepage', url: packageInfo.homepage });
        }

        if (packageInfo.bugs?.url) {
            links.push({ label: 'Bug Tracker', url: packageInfo.bugs.url });
        }

        if (packageInfo.links) {
            Object.entries(packageInfo.links).forEach(([label, url]) => {
                links.push({ label, url });
            });
        }

        return links;
    };

    return (
        <div>
            <div className="search-bar">
                <h1>NPM</h1>
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectedPackage(null);  // Reset selected package when query changes
                    }}
                    placeholder="Search packages..."
                    style={{ fontSize: '20px' }}
                />
                <Button type="primary" onClick={handleSearch} disabled={!query || loading}>
                    {loading ? <Spin /> : 'Search'}
                </Button>
                <Button className="signup-btn">Sign Up</Button>
                <Button className="signin-btn">Sign In</Button>
            </div>
            {error && <div className="error"><p>Error: {error}</p></div>}
            {!selectedPackage && (
                <div className="search-results">
                    {searchResults.slice(0, 10).map((result, index) => (
                        <div key={index} onClick={() => handlePackageClick(result.package.name)}>
                            <h3>{result.package.name}</h3>
                            <p className="description">{result.package.description}</p>
                        </div>
                    ))}
                </div>
            )}
            {packageInfo && selectedPackage && (
                <Card title="Package Details" style={{ marginTop: 20 }}>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Space direction="vertical" size="middle" style={{ fontSize: '18px' }}>
                                <Title level={4}>{packageInfo.name}</Title>
                                <Text><strong>Description:</strong> {packageInfo.description}</Text>
                                <Text>
                                    <strong>Installation:</strong> npm install {packageInfo.name}
                                    <Button 
                                        onClick={() => copyToClipboard(`npm install ${packageInfo.name}`)} 
                                        icon={<CopyOutlined />} 
                                        style={{ marginLeft: 10 }} 
                                    />
                                </Text>
                                <Text>
                                    <strong>Usage:</strong> {packageInfo.readme ? packageInfo.readme.split('\n')[0] : 'No usage information available.'}
                                </Text>
                            </Space>
                        </Col>
                        <Col span={12}>
                            <Space direction="vertical" size="middle" style={{ fontSize: '18px' }}>
                                {renderLinks(packageInfo).map((link, index) => (
                                    <Text key={index}>
                                        <strong>{link.label}:</strong> <Link href={link.url} target="_blank">{link.url}</Link>
                                    </Text>
                                ))}
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Text><strong>Version:</strong> {packageInfo['dist-tags']?.latest}</Text>
                                    </Col>
                                    <Col span={12}>
                                        <Text><strong>License:</strong> {packageInfo.license}</Text>
                                    </Col>
                                </Row>
                                <Text>
                                    <strong>Requirements:</strong> {packageInfo.engines ? Object.entries(packageInfo.engines).map(([engine, version]) => `${engine}: ${version}`).join(', ') : 'No requirements specified.'}
                                </Text>
                            </Space>
                        </Col>
                    </Row>
                    <Row>
                            <Card title="README">
                                <div dangerouslySetInnerHTML={{ __html: readmeHtml}} />
                            </Card>
                    </Row>
                </Card>
            )}
        </div>
    );
};

export default Searchbar;
