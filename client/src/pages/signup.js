import React from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate(); // Initialize navigate

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username: values.username,
        email: values.email,
        password: values.password,
      }, {
        withCredentials: true, // Important: Allow cookies to be sent and received
      });

      if (response.data.status === 'success') {
        message.success('Registration successful!');
        navigate('/signin'); // Redirect to login page
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

    // Handler to redirect to the registration page
    const redirectToLogin = () => {
      navigate('/signin');
    };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: '20px' }}>
      <Col xs={24} sm={16} md={12} lg={8} xl={6}>
        <div className="registration-container">
          <h1 style={{ textAlign: 'center' }}>Register</h1>
          <Form
            name="registration"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            layout="vertical"
          >
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

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input your Email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ width: '100%' }}
              >
                Register
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
              <span>Already registered? </span>
              <Button
                type="link"
                onClick={redirectToLogin}
                style={{ padding: 0 }}
              >
                Sign in
              </Button>
            </Form.Item>
            
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Signup;