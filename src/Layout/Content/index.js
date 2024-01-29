//thư viện react-router-dom để quản lý định tuyến trong ứng dụng React.
import { Routes, Route } from "react-router-dom";
//Đoạn mã này nhập các thành phần trang (page components) từ các tệp (files) khác trong ứng dụng
import ExpensePage from "../../pages/ExpensePage";
import ExpenseTypePage from "../../pages/ExpenseTypePage";
import StatisticPage from "../../pages/StatisticPage";

function Content() {
    return (
        //Thuộc tính style được sử dụng để tùy chỉnh kiểu dáng của phần tử, trong đó thiết lập marginLeft, height, và width
        <div className="content" style={{
            marginLeft: 250,
            height: '100%',
            width: '100%',
        }}>
            //Đoạn mã này đánh dấu vùng chứa các tuyến đường (routes) của ứng dụng
            <Routes>
                //đoạn mã này xác định một tuyến đường dành cho trang quản lý loại khoản chi (expense types)
                <Route path="/" element={<StatisticPage />} />
                <Route
                    path="/expense-types"
                    element={<ExpenseTypePage />}
                />
                <Route path="/expense" element={<ExpensePage />} />
            </Routes>
        </div>
    );
}
// Như vậy, Content định tuyến các trang con khác nhau dựa trên URL và hiển thị chúng trong khu vực nội dung của trang web.
export default Content;
