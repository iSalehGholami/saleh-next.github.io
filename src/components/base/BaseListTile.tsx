import React from "react";

interface BaseListTileProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const BaseListTile: React.FC<BaseListTileProps> = (props) => {
  return (
    <div className="flex items-center justify-between w-full h-10 rounded gap-3 bg-background my-2">
      <div className="flex gap-1">
        <div className="firstname text-base font-light">{props.firstName}</div>
        <div className="lastname text-base font-light">{props.lastName}</div>
      </div>
      <div className="phonenumber text-lg font-bold">{props.phoneNumber}</div>
    </div>
  );
};

export default BaseListTile;
