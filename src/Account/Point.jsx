import React, { useEffect, useState, useMemo } from "react";
import { useDataProduct } from "../Context";

function Point() {
  const { userPoints, isSidebarOpen, createAccount, currentAccount } =
    useDataProduct();
  const [spentedPoint, setSpentedPoint] = useState(0);
  useEffect(() => {
    const index = createAccount.find((acc) => acc.id === currentAccount.id);
    const spentPoint = index?.spentpoint || 0;

    setSpentedPoint(spentPoint);
  }, [createAccount, currentAccount]);
  // Calculate totalPoint from current user's points
  const totalPoint = useMemo(() => {
    return userPoints?.reduce((sum, item) => sum + item?.point, 0);
  }, [userPoints]);
  return (
    <div className={`container_point ${isSidebarOpen ? "" : "active"}`}>
      <h2 className="text_container_point">Point</h2>
      <div className="chil_any_point">
        {userPoints.map((item, index) => (
          <div className="render_point" key={index}>
            <div className="save_txt_point">
              <h2 className="save_txt">Save</h2>
              <h2 className="date_point">{item.date}</h2>
            </div>
            <h2 className="point_geted">+{item.point} Point</h2>
          </div>
        ))}
      </div>

      <div className="totalPoint">
        <div className="child_total_point">
          <h2 className="text_total_point">Total</h2>
          <h2 className="save_total_point">{totalPoint} Point</h2>
        </div>
        <div className="border_total_point"></div>
        <div className="child_total_point2">
          <h2 className="total_point2">Total</h2>
          <h2 className="total_point2">{totalPoint} Point</h2>
        </div>
        <div className="child_Spent_point">
          <h2 className="text_Spent_point">Spent</h2>
          <h2 className="save_Spent_point">{spentedPoint} Point</h2>
        </div>
      </div>
    </div>
  );
}

export default Point;
