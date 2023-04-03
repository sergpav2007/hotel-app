import React, { useMemo } from 'react';
import { Button, Card, Checkbox, Col, Form, Input, Layout, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountsState } from '../../store/selectors/usersSelectors';
import { logIn } from '../../store/actions/usersActions';
import './AuthPage.scss';

const AuthPage = () => {
  const accounts = useSelector(getAccountsState);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const isEmptyAccounts = useMemo(() => {
    if (!accounts) return false;

    return !Object.keys(accounts).length;
  }, [accounts]);

  const onFinish = (values) => {
    dispatch(logIn(values));
    form.resetFields();
  };

  return (
    <Layout>
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col span={8}>
          <Card title="Authentication">
            <Form
              form={form}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              name="basic"
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
                <Checkbox className="auth-checkbox">Remember me</Checkbox>
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