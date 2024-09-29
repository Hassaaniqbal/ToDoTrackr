import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, List, Row, Col, Typography, message, Card } from 'antd';
import { PlusOutlined, DeleteOutlined, CheckSquareTwoTone, CloseSquareTwoTone, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Header, Content } = Layout;
const { Title } = Typography;

const MainPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/signin');
    } else {
      getUsername(token);
      getTasks(token);
    }
  }, [navigate]);

  const getUsername = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(response.data.data.username);
    } catch (error) {
      message.error('Error fetching user info.');
    }
  };

  const getTasks = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      message.error('Error fetching tasks.');
    }
  };

  const handleAddTask = async () => {
    if (typeof newTask !== 'string' || !newTask.trim()) {
      return message.error('Task description is required.');
    }

    const token = localStorage.getItem('jwtToken');
    try {
      const response = await axios.post('http://localhost:5000/api/tasks/add',
        { description: newTask }, // Ensure this is passed as a string
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, response.data]);
      setNewTask(''); // Clear input after task is added
      message.success('Task added successfully.');
    } catch (error) {
      message.error('Error adding task.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem('jwtToken');
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(task => task._id !== taskId));
      message.success('Task deleted successfully.');
    } catch (error) {
      message.error('Error deleting task.');
    }
  };

  const handleToggleComplete = async (task) => {
    const token = localStorage.getItem('jwtToken');
    try {
      const updatedTask = await axios.patch(
        `http://localhost:5000/api/tasks/${task._id}`,
        { completed: !task.completed }, // Toggle the completed status
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map(t => (t._id === task._id ? updatedTask.data : t)));
      message.success(task.completed ? 'Task marked as incomplete.' : 'Task marked as completed.');
    } catch (error) {
      message.error('Error updating task.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/signin');
  };

  // Voice Command Handling with Web Speech API
  const handleVoiceCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      message.info('Voice recognition activated. Try speaking into the microphone.');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      message.info(`Voice command detected: "${transcript}"`);

      // Parsing the voice command for specific actions
      if (transcript.includes('add task')) {
        const taskDescription = transcript.replace('add task', '').trim();
        handleAddTask(taskDescription);
      } else if (transcript.includes('delete task')) {
        const taskNumber = transcript.match(/\d+/);
        if (taskNumber && tasks[taskNumber[0] - 1]) {
          handleDeleteTask(tasks[taskNumber[0] - 1]._id);
        } else {
          message.error('Invalid task number.');
        }
      } else if (transcript.includes('complete task')) {
        const taskNumber = transcript.match(/\d+/);
        if (taskNumber && tasks[taskNumber[0] - 1]) {
          handleToggleComplete(tasks[taskNumber[0] - 1]);
        } else {
          message.error('Invalid task number.');
        }
      } else if (transcript.includes('incomplete task')) {
        const taskNumber = transcript.match(/\d+/);
        if (taskNumber && tasks[taskNumber[0] - 1]) {
          handleToggleComplete(tasks[taskNumber[0] - 1]); // Call the same toggle function
        } else {
          message.error('Invalid task number.');
        }
      } else {
        message.error('Command not recognized.');
      }
    };

    recognition.onerror = (event) => {
      message.error(`Error occurred in recognition: ${event.error}`);
    };

    recognition.start();
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Header style={{ backgroundColor: 'transparent', padding: 0, marginTop: '20px', marginBottom: '30px' }}>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 20px' }}>
              <Title level={3} style={{ margin: 0, fontSize: '20px', textAlign: 'center' }}>PERSONAL TODO APP</Title>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: '10px' }}>
                <span style={{ marginRight: '20px', fontSize: '14px' }}>User: {username}</span>
                <Button type="primary" icon={<LogoutOutlined />} danger onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Header>

      <Content>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12}>
            <div style={{ backgroundColor: '#f0f2f5', padding: '20px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Input
                  placeholder="Add Todo"
                  style={{ flex: 1, marginRight: '10px' }}
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTask} />
              </div>

              {/* Scrollable Task List */}
              <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                <List
                  bordered
                  dataSource={tasks}
                  renderItem={(task, index) => (
                    <List.Item
                      actions={[
                        <Button
                          type="text"
                          icon={task.completed ? <CloseSquareTwoTone twoToneColor="#ff4d4f" /> : <CheckSquareTwoTone twoToneColor="#52c41a" />}
                          onClick={() => handleToggleComplete(task)}
                        />,
                        <Button type="text" icon={<DeleteOutlined />} danger onClick={() => handleDeleteTask(task._id)} />,
                      ]}
                    >
                      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {`${index + 1}. ${task.description}`} {/* Task Numbering */}
                      </span>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </Col>
        </Row>


        <Row justify="center" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Card
            bordered={false}
            style={{
              width: 400,
              textAlign: 'center',
              backgroundColor: '#f0f2f5' // Set the background color
            }}
          >
            <Title level={4} style={{ marginBottom: '15px' }}>Voice Task Management</Title>
            <Button type="primary" onClick={handleVoiceCommand}>
              Start Listening
            </Button>
            <div style={{ marginTop: '15px' }}>
              <strong>Sample Voice Commands:</strong>
              <ul style={{ marginTop: '10px', paddingLeft: '15px' }}>
                <li>Add task: <code>Add task I want to go to basketball match tomorrow</code></li>
                <li>Delete task: <code>Delete task number 1</code></li>
                <li>Complete task: <code>Complete task 3</code></li>
                <li>Incomplete task: <code>Incomplete task 2</code></li>
              </ul>
            </div>
          </Card>
        </Row>

      </Content>
    </Layout>
  );
};

export default MainPage;
