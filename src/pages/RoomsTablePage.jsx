import React, { useEffect, useMemo, useState } from 'react';
import { Button, Table, Row, Col, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import MainLayout from '../components/MainLayout';
import { ROOMS_TYPES, ROOM_TYPE_LABEL, ROOM_OCCUPANCY_LIST } from '../constants/rooms';
import { getRoomsState } from '../store/selectors/roomsSelectors';
import { checkOutRoom, getRooms } from '../store/actions/roomsActions';



const RoomsTablePage = () => {
  const roomsState = useSelector(getRoomsState);
  const rooms = useMemo(() => roomsState, [roomsState]);
  const dispatch = useDispatch();

  const [isFreeRooms, setIsFreeRooms] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const filteredRooms = useMemo(() => (isFreeRooms ? rooms.filter((room) => room.isCheckedIn !== isFreeRooms) : rooms), [rooms, isFreeRooms]);
  // const filteredRooms = isFreeRooms ? rooms.filter((room) => room.isCheckedIn !== isFreeRooms) : rooms;
  const guestsOptions = useMemo(() => (!isFreeRooms
    ? rooms
      .filter((room) => room.guest)
      .map((room) => ({ text: room.guest, value: room.guest }))
    : []
  ), [isFreeRooms, rooms]);
  // const guestsOptions = !isFreeRooms ? rooms.filter((room) => room.guest).map((room) => ({ text: room.guest, value: room.guest })) : [];

  const columns = [
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <span>{ROOM_TYPE_LABEL[type]}</span>,
      filters: Object.values(ROOMS_TYPES).map((type) => ({ text: ROOM_TYPE_LABEL[type], value: type })),
      onFilter: (type, record) => record.type === type,
      filteredValue: filteredInfo.type || null,
    },
    {
      title: 'Occupancy',
      dataIndex: 'occupancy',
      key: 'occupancy',
      filters: ROOM_OCCUPANCY_LIST.map((occupancy) => ({ text: occupancy, value: occupancy })),
      onFilter: (occupancy, record) => record.occupancy === occupancy,
      filteredValue: filteredInfo.occupancy || null,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <span>{`${text}$`}</span>,
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
    },
    {
      title: 'Guest',
      dataIndex: 'guest',
      key: 'guest',
      filters: guestsOptions,
      onFilter: (text, record) => record.guest.startsWith(text),
      filteredValue: filteredInfo.guest || null,
    },
    {
      title: '',
      key: 'operation',
      width: 100,
      render: (text, record) => (
        <Button type="primary">
          <Link to={`/rooms?${record.id}`}>
            More information
          </Link>
        </Button>
      ),
    },
  ];

  const handleCheckboxChange = (event) => {
    setIsFreeRooms(event.target.checked);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setIsFreeRooms(false);
  };

  useEffect(() => {
    if (!rooms.length) {
      dispatch(getRooms());
    }
  }, [dispatch, rooms.length]);

  useEffect(() => {
    if (rooms.length) {
      rooms.forEach((room) => {
        if (room.checkOutDate && moment(room.checkOutDate) < moment().endOf('day')) {
          dispatch(checkOutRoom(room.id));
        }
      });
    }
  }, [dispatch, rooms]);

  return (
    <MainLayout>
      <Row gutter={[24, 40]} align="middle">
        <Col span={2}>
          <Button type="primary" onClick={clearAll}>Clear all filters</Button>
        </Col>
        <Col span={6}>
          <Checkbox onChange={handleCheckboxChange} checked={isFreeRooms}>
            Free rooms only
          </Checkbox>
        </Col>
        <Col span={24}>
          <Table
            dataSource={filteredRooms}
            columns={columns}
            pagination={{ defaultPageSize: 10, position: ['bottomCenter'] }}
            hasData={!!filteredRooms.length}
            rowKey="id"
            onChange={handleTableChange}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default RoomsTablePage;