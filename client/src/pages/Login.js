import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // For redirection

  // Handle form submission
  const onFinish = async (values) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: values.username,
        password: values.password,
      });

      // console.log(res.data); // Check the response here

      if (res.data.status === 'success') {
        message.success('Login successful!');
        localStorage.setItem('jwtToken', res.data.token); // Store using 'jwtToken'
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        message.error('Login failed. Please try again.');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: '20px' }}>
      <Col xs={24} sm={16} md={12} lg={8} xl={6}>
        <div className="login-container">
          <h1 style={{ textAlign: 'center' }}>Login</h1>
          <Form
            name="login"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            layout="vertical"
          >
            {/* Username input field */}
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>

            {/* Password input field */}
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            {/* Remember me checkbox */}
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {/* Submit button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ width: '100%' }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
