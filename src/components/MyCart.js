import { Button, Space } from "antd";
import React, { useState } from "react";

const MyCart = (props) => {
  const [showPackageList, setShowPackageList] = useState(true);

  const onShowOrders = () => {
    setShowPackageList(false);
    props.setShowPackageList(false);
  };

  const onShowPackageList = () => {
    setShowPackageList(true);
    props.setShowPackageList(true);
  };

  return (
    <>
      <Space>
        {showPackageList ? (
          <Button
            type="primary"
            shape="round"
            onClick={onShowOrders}
            style={{ marginRight: 10 }}
          >
            Track Packages
          </Button>
        ) : (
          <Button
            type="primary"
            shape="round"
            onClick={onShowPackageList}
            style={{ marginRight: 10 }}
          >
            Manage Packages
          </Button>
        )}
      </Space>
    </>
  );
};

export default MyCart;
