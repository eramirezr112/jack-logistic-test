import React from "react";
import PackageList from "./PackageList";
import MyOrders from "./MyOrders";

const Main = ({ signal, showPackageList }) => {
  return showPackageList ? (
    <PackageList signal={signal} />
  ) : (
    <MyOrders trackingInfo={null} />
  );
};

export default Main;
