import React from 'react';
import { Layout, Menu, Card, Statistic, Row, Col, Button, List, Avatar, Typography } from 'antd';
import { UserOutlined, DashboardOutlined, TeamOutlined, RiseOutlined, CalendarOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const HomePage = () => {
  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: 'team', icon: <TeamOutlined />, label: 'Team' },
    { key: 'calendar', icon: <CalendarOutlined />, label: 'Calendar' },
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
  ];

  const recentActivities = [
    { title: 'John Doe commented on your post', when: '2 hours ago' },
    { title: 'New team member added: Jane Smith', when: '4 hours ago' },
    { title: 'Project X deadline updated', when: '1 day ago' },
    { title: 'You have a new message', when: '2 days ago' },
  ];

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Row justify="center">
          <Col xs={22} sm={22} md={22} lg={20} xl={18}>
            <div className="logo" style={{ float: 'left', width: 120, height: 31, background: 'rgba(255, 255, 255, 0.2)', margin: '16px 24px 16px 0' }} />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['dashboard']} items={menuItems} />
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={20} xl={18}>
            <div style={{ padding: '24px 0' }}>
              <Title level={2}>Dashboard</Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic title="Active Users" value={1128} prefix={<TeamOutlined />} />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic title="Revenue" value={9280} prefix="$" precision={2} />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic title="Growth" value={25.8} prefix={<RiseOutlined />} suffix="%" />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic title="Tasks" value={134} suffix="/ 200" />
                  </Card>
                </Col>
              </Row>
              <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
                <Col xs={24} md={16}>
                  <Card title="Recent Activities">
                    <List
                      itemLayout="horizontal"
                      dataSource={recentActivities}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar icon={<UserOutlined />} />}
                            title={item.title}
                            description={item.when}
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card title="Quick Actions">
                    <Button type="primary" block style={{ marginBottom: '8px' }}>Create New Task</Button>
                    <Button block style={{ marginBottom: '8px' }}>Schedule Meeting</Button>
                    <Button block>Generate Report</Button>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default HomePage;