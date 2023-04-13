import React, { useEffect, useMemo } from 'react';
import { Button, Card, Checkbox, Col, Form, Input, Layout, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAccountsState, getIsAuthorized } from '../../store/selectors/usersSelectors';
import { logIn } from '../../store/actions/usersActions';
import './AuthPage.scss';

const AuthPage = () => {
  const accounts = useSelector(getAccountsState);
  const isAuthorized = useSelector(getIsAuthorized);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const isEmptyAccounts = useMemo(() => {
    if (!accounts) return true;

    return !Object.keys(accounts).length;
  }, [accounts]);

  const onFinish = (values) => {
    dispatch(logIn(values));
    form.resetFields();
  };

  useEffect(() => {
    if (isAuthorized) {navigate('/')};
  }, [isAuthorized, navigate]);

  return (
    <Layout>
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col span={8}>
          <Card title="Authentication">
            <Form
              form={form}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              name="auth_form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="pass"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 9, span: 6 }}>
                <Button type="primary" htmlType="submit" disabled={isEmptyAccounts} className="auth-btn">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default AuthPage;