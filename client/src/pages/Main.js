import React, { useEffect } from 'react';
import { Layout, Input, Button, List, Row, Col, Typography, Menu, Dropdown } from 'antd';
import { PlusOutlined, SearchOutlined, DeleteOutlined, CheckSquareTwoTone, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const { Header, Content } = Layout;
const { Title } = Typography;

const MainPage = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  useEffect(() => {
    // Check if JWT token exists
    const token = localStorage.getItem("jwtToken"); 
    // console.log('JWT Token:', token);  
    if (!token) {
      navigate('/signin'); // Redirect to login if token is not found
    }
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // Clear the token
    navigate('/signin'); // Redirect to login
  };

  // Sample tasks
  const tasks = [
    { id: 1, text: 'Make a cup of coffee or tea.', completed: false },
    { id: 2, text: 'Check and prioritize your calendar for the day.', completed: false },
    { id: 3, text: 'Respond to important emails.', completed: true },
    { id: 4, text: 'Start with the most important task first.', completed: false },
  ];

  // Dropdown options
  const handleMenuClick = (e) => {
    console.log('Selected:', e.key);
    // Add your logic for filter action based on the key
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Default</Menu.Item>
      <Menu.Item key="2">Important</Menu.Item>
      <Menu.Item key="3">Urgent</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Header */}
      <Header style={{ backgroundColor: 'transparent', padding: 0, marginTop: '20px' }}>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12}>
            {/* Responsive Header with space-between layout */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px', alignItems: 'center' }}>
              <Title level={3} style={{ margin: 0, fontSize: '18px' }}>PERSONAL TODO APP</Title>
              <Button 
                type="primary" 
                icon={<LogoutOutlined />} 
                danger 
                style={{ padding: '0 16px', fontSize: '14px' }} 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </Col>
        </Row>
      </Header>

      {/* Content */}
      <Content>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12}>
            {/* Responsive Content Box */}
            <div style={{ backgroundColor: '#f0f2f5', padding: '20px', borderRadius: '8px' }}>
              {/* Input area */}
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Input placeholder="Add Todo" style={{ flex: 1, marginRight: '10px' }} />
                <Button type="primary" icon={<PlusOutlined />} />
              </div>

              {/* Filter and mark all */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Dropdown menu={menu} trigger={['click']}>
                  <Button>Default</Button>
                </Dropdown>

                {/* Search Box */}
                <Input
                  placeholder="Search Todos"
                  style={{ width: '200px', marginRight: '10px' }}
                  suffix={<SearchOutlined />}
                />
                <Button type="primary" style={{ backgroundColor: '#722ed1', borderColor: '#722ed1' }}>
                  Mark All Completed
                </Button>
              </div>

              {/* Task list */}
              <List
                bordered
                dataSource={tasks}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        icon={<CheckSquareTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px' }} />}
                      />,
                      <Button type="text" icon={<DeleteOutlined style={{ fontSize: '20px' }} />} danger />,
                    ]}
                  >
                    <span style={{ fontSize: '16px' }}>{item.text}</span>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default MainPage;
