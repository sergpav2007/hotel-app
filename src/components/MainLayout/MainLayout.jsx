import React from 'react';
import { Button, Layout, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser } from '../../store/selectors/usersSelectors';
import { logOut } from '../../store/actions/usersActions';
import './MainLayout.scss';

const MainLayout = () => {
  const user = useSelector(getAuthUser);
  const dispatch = useDispatch();

  const { Header, Content } = Layout;
  const { image, username } = user;

  const handleLogOut = () => dispatch(logOut());

  return (
    <Layout className="main-layout">
      <Header className="header">
        <Link to="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/hotel-da9e2.appspot.com/o/logo.svg?alt=media&token=6fc01e64-7f46-411a-a0b4-242e9fa3e6b6"
            alt="Logo"
            className="header__logo"
          />
        </Link>
        <div>
          <Tooltip title={username} placement="bottom">
            <img src={image} alt={username} className="header__user-image" />
          </Tooltip>
          <Button type="link" onClick={handleLogOut} className="header__logout-btn">
            Log Out
          </Button>
        </div>
      </Header>
      <Content>Content</Content>
    </Layout>
  );
};

export default MainLayout;