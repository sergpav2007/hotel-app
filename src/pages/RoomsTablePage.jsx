import React, { useEffect, useState } from 'react';
import { Button, Table, Row, Col, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../components/MainLayout';
import { ROOMS_TYPES, ROOM_TYPE_LABEL, ROOM_OCCUPANCY_LIST } from '../constants/rooms';
import { getRoomsState } from '../store/selectors/roomsSelectors';
import { getRooms } from '../store/actions/roomsActions';

const RoomsTablePage = () => {
  const rooms = useSelector(getRoomsState) || [];
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  // const filteredRooms = useMemo(() => (isChecked ? rooms.filter((room) => room.isCheckedIn !== isChecked) : rooms), [rooms, isChecked]);
  // const guestsOptions = useMemo(() => (!isChecked ? rooms.filter((room) => room.guest).map((room) => ({ text: room.guest, value: room.guest })) : []), [rooms, isChecked]);
  const filteredRooms = (isChecked ? rooms.filter((room) => room.isCheckedIn !== isChecked) : rooms);
  const guestsOptions = (!isChecked ? rooms.filter((room) => room.guest).map((room) => ({ text: room.guest, value: room.guest })) : []);
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
    setIsChecked(event.target.checked);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
    setIsChecked(false);
  };

  useEffect(() => {
    if (!rooms.length) {
      dispatch(getRooms());
    }
  }, [rooms]);

  return (
    <MainLayout>
      <Row gutter={[24, 40]} align="middle">
        <Col span={2}>
          <Button type="primary" onClick={clearAll}>Clear all filters</Button>
        </Col>
        <Col span={6}>
          <Checkbox onChange={handleCheckboxChange} checked={isChecked}>
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