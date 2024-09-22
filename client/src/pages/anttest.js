import React from 'react';
import { Layout, Menu, Form, Input, Button, DatePicker, Row, Col } from 'antd';
import { UserOutlined, CalendarOutlined, MailOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const ResponsiveLayout = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>Profile</Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />}>Calendar</Menu.Item>
          <Menu.Item key="3" icon={<MailOutlined />}>Messages</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Row justify="center" style={{ marginTop: '2rem' }}>
          <Col xs={24} sm={20} md={16} lg={12}>
            <Form
              form={form}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input prefix={<MailOutlined />} />
              </Form.Item>

              <Form.Item
                name="dob"
                label="Date of Birth"
                rules={[{ required: true, message: 'Please select your date of birth!' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
      <div>
        <p>hsgdvhjsgd</p>
      </div>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default ResponsiveLayout;