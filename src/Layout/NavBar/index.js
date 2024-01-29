// import { Button } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./NavBar.scss";
function NavBar() {
    // Biến này được sử dụng để tham chiếu đến dòng (line) trong thanh điều hướng
    const lineDiv = useRef();
//hàm JavaScript được sử dụng để thực hiện hiệu ứng vị trí của dòng
// Hàm này sẽ thay đổi chiều cao (height) và vị trí top của dòng để nó khớp với mục trong thanh điều hướng hiện tại.
    const lineAnimation = () => {
        const line = lineDiv.current;
        const activeItem = document.querySelector(".active");
        line.style.height = activeItem.offsetHeight + "px";
        line.style.top = activeItem.offsetTop + "px";
    };
//Điều này đảm bảo rằng hiệu ứng vị trí của dòng được thực hiện khi trang được tải.
    useEffect(lineAnimation);

    const handleLinkOnClick = (e) => {
//Tìm một phần tử với lớp CSS "active" (đã được chọn) và loại bỏ lớp "active" khỏi nó. Điều này đảm bảo rằng mục trước đó mất tính nổi bật.        
        document.querySelector(".active").classList.remove("active");
        //Tìm phần tử mục nav_item gần nhất mà người dùng đã nhấp vào.
        const navLink = e.target.closest(`.nav_item`);
        //Nếu có một phần tử mục được tìm thấy 
        if (navLink) navLink.classList.add("active");
        //Gọi hàm lineAnimation để thực hiện hiệu ứng vị trí của dòng dưới mục đã được chọn.
        lineAnimation();
    };

    return (
        <>
        //được sử dụng để tạo thanh điều hướng của trang web.
            <nav className="nav_">
                //Đây là một danh sách không sắp xếp (unordered list) được sử dụng để liệt kê các mục trong thanh điều hướng.
                <ul className="nav_list">
                //kích hoạt khi người dùng nhấp vào mục và gọi hàm handleLinkOnClick để xử lý sự kiện.
                    <li className="nav_item active" onClick={handleLinkOnClick}>
                        //sử dụng để chuyển hướng đến các trang khác trong ứng dụng
                        <Link className="nav_link" to="/">
                //tạo dòng dưới mục đang được chọn trong thanh điều hướng. 
                //Tham chiếu đến phần tử DOM này được thực hiện thông qua thuộc tính ref với giá trị lineDiv
                            <i className="fa-solid fa-chart-line"></i>
                            Thống kê
                        </Link>
                    </li>
                    <li className="nav_item" onClick={handleLinkOnClick}>
                        <Link className="nav_link" to="/expense-types">
                            <i className="fa-solid fa-filter-circle-dollar"></i>
                            Loại khoản chi
                        </Link>
                    </li>
                    <li className="nav_item" onClick={handleLinkOnClick}>
                        <Link className="nav_link" to="/expense">
                            <i className="fa-solid fa-circle-dollar-to-slot"></i>
                            Khoản chi
                        </Link>
                    </li>
                    <div className="line" ref={lineDiv}></div>
                </ul>
            </nav>
            //được sử dụng để ẩn/mo dấu vết khi màn hình nhỏ
            //Nó được kết nối với một phần tử input được đặt với id là "open-btn".
            <label htmlFor="open-btn" className="fade_"></label>
        </>
    );
}

export default NavBar;
