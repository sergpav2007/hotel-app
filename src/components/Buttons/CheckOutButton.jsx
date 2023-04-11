import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { checkOutRoom } from '../../store/actions/roomsActions';
import { ROOM_OCCUPANCY_LIST, ROOMS_TYPES } from '../../constants/rooms';

const propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    type: PropTypes.oneOf(Object.values(ROOMS_TYPES)).isRequired,
    occupancy: PropTypes.oneOf(ROOM_OCCUPANCY_LIST).isRequired,
    isCheckedIn: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    checkInDate: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    checkOutDate: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    guest: PropTypes.string,
  }).isRequired,
};

const CheckOutButton = ({ room }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };
  const handleModalOk = async () => {
    setIsLoading(true);
    await dispatch(checkOutRoom(room.id));
    setIsModalOpen(false);
    setIsLoading(false);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" disabled={!room.isCheckedIn} onClick={handleClick}>
        Check Out
      </Button>
      <Modal
        visible={isModalOpen}
        title="Check Out"
        okText="Confirm"
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={isLoading}
        closable
      >
        <p>{`Do you confirm the check-out Room ${room.number}?`}</p>
      </Modal>
    </>
  );
};

CheckOutButton.propTypes = propTypes;

export default CheckOutButton;