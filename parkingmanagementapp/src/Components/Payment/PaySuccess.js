import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { authApi, endpoints } from "../../configs/APIs";
import cookies from "react-cookies";

const PaymentSuccessPage = () => {
  const location = useLocation();

  const getIdSale =async (paymentId,payerId) =>{
    try{
        const formData = new FormData();
      formData.append("paymentId", paymentId);
      formData.append("PayerID", payerId);
        const url = endpoints["paypalSuccess"];
        let res = await authApi(cookies.load("access-token")).post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("Payment success response:", res.data);
      }catch(e){
        alert("Đã hoàn thành quá trình thanh toán. Vui lòng quay lại trang chủ.");
        return;
      }
  }
  useEffect(() => {
    // Parse the query string from the URL
    const queryParams = new URLSearchParams(location.search);

    // Get the paymentId and PayerID from the URL
    const paymentId = queryParams.get("paymentId");
    const payerId = queryParams.get("PayerID");
    if (paymentId && payerId) {
      
      getIdSale(paymentId,payerId);
   
    }
  }, []);

  return (
    <div style={{ textAlign: "center", padding: 20, marginTop: 100 }}>
      <h1>Thanh toán thành công!</h1>
      <p>
        Cảm ơn bạn đã thanh toán thành công. Đơn hàng của bạn đã được xác nhận.
      </p>
      <Link to="/Home">
        <button
          style={{
            backgroundColor: "#4CAF50",
            color: "#fff",
            padding: 10,
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Quay về trang chủ
        </button>
      </Link>
    </div>
  );
};

export default PaymentSuccessPage;
