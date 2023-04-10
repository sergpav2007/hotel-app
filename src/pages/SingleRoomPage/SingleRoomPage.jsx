import React from 'react';
import { Button, Carousel, Col, Descriptions, List, Row, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckOutlined, HomeOutlined } from '@ant-design/icons';
import MainLayout from '../../components/MainLayout';
import { getSingleRoom } from '../../store/selectors/roomsSelectors';
import { ROOM_TYPE_LABEL } from '../../constants/rooms';
import './SingleRoomPage.scss';

const propTypes = {};

const SingleRoomPage = () => {
  const { search } = useLocation();
  const room = useSelector((state) => getSingleRoom(state, search.substr(1)));

  return (
    <MainLayout>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Button type="link">
            <Link to="/">
              <HomeOutlined />
              &nbsp;
              Back Home
            </Link>
          </Button>
        </Col>
        <Col span={12}>
          <Carousel>
            {room.gallery.map((imageUrl) => <img key={imageUrl} src={imageUrl} alt={room.type} className="slider-image" />)}
          </Carousel>
        </Col>
        <Col span={12}>
          <Row justify="space-between">
            <Col>
              <Typography.Title level={2} underline>{`Room ${room.number}`}</Typography.Title>
            </Col>
            <Col>
              <Button type="primary" className="room-button" disabled={room.isCheckedIn}>Check In</Button>
              <Button type="primary" className="room-button" disabled={!room.isCheckedIn}>Check Out</Button>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Descriptions
                labelStyle={{ fontWeight: 'bold', alignSelf: 'center' }}
                column={1}
              >
                <Descriptions.Item label="Type">{ROOM_TYPE_LABEL[room.type]}</Descriptions.Item>
                <Descriptions.Item label="Occupancy">{room.occupancy}</Descriptions.Item>
                <Descriptions.Item label="Price">{`${room.price}$`}</Descriptions.Item>
                <Descriptions.Item label="Quest">{room.guest}</Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={12}>
              <Descriptions
                layout="vertical"
                labelStyle={{ fontWeight: 'bold' }}
              >
                <Descriptions.Item label="Features">
                  <List
                    size="small"
                    dataSource={room.features}
                    renderItem={(item) => (
                      <List.Item>
                        <CheckOutlined />
                        &nbsp;
                        {item}
                      </List.Item>
                    )}
                  />
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Descriptions labelStyle={{ fontWeight: 'bold' }} column={2}>
            <Descriptions.Item label="Description">{room.description}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </MainLayout>
  );
};

SingleRoomPage.propTypes = propTypes;

export default SingleRoomPage;