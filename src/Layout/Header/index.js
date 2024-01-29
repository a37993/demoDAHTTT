function Header() {
    //hàm themeSwitch làm việc chuyển đổi giữa chế độ sáng và chế độ tối của trang web khi được gọi
    function themeSwitch() {
        //Dòng này lấy tham chiếu đến phần tử body trong DOM
        // Phần tử này thường được sử dụng để định dạng toàn bộ giao diện trang web.
        const body_theme = document.querySelector("body");
        //Dòng này kiểm tra xem phần tử body có chứa lớp (class) CSS "dark-mode"
        body_theme.classList.contains("dark-mode")
       // Nếu phần tử body đã có lớp này (điều này ngụ ý rằng trang web đang ở chế độ tối), 
       // thì mã trong phần sau dấu ? sẽ được thực hiện. Nếu không, mã trong phần sau dấu : sẽ được thực hiện.
            ? body_theme.classList.remove("dark-mode")
            : body_theme.classList.add("dark-mode");
    }

    return (
        <>
            <header
            //Đặt lớp CSS cho phần tử header là "header".
                className="header"
                //Đây là thuộc tính kiểu dáng dùng để thiết lập các thuộc tính CSS của phần tử header.
                style={{
    //Đặt phần tử header ở vị trí cố định (fixed) trên cùng của trang web, giúp nó luôn hiển thị ở đầu trang khi bạn cuộn trang web.               
                    position: "fixed",
    //Phần tử header được căn chỉnh từ mép trái tới mép phải của trang web, chiếm toàn bộ chiều rộng.                
                    left: 0,
                    right: 0,
    //Đặt chỉ số độ sâu (z-index) của header là 3, để xác định thứ tự hiển thị của nó so với các phần tử khác trên trang.
                    zIndex: 3,
                    // backgroundColor: "#fff",
                    backgroundColor: "var(--bg-primary-color)",
                    // color: '#333',
                    color: "var(--text-color)",
                    //Thêm đường viền phía dưới header với chiều rộng 1px và màu sắc #d1d1d1.
                    borderBottom: "1px solid #d1d1d1",
                    height: 70,
                    // Đặt hiệu ứng bóng đổ cho header bằng biến CSS --box-shadow-color.
                    boxShadow: "var(--box-shadow-color)",
                }}
            >//được sử dụng để chia cột trên header.
                <div className="grid">
                    //Bên trong div.row, có một phần tử div khác với một số thuộc tính kiểu dáng:
                    <div className="row">
                        <div
                        //style: Điều này được sử dụng để tùy chỉnh kiểu dáng của phần tử div
                            style={{
                                //"flex": Sử dụng mô hình hiển thị dạng flexbox.
                                display: "flex",
                                ///"center": Căn chỉnh các phần tử con theo chiều dọc để căn giữa.
                                alignItems: "center",
                                //Đặt chiều cao của phần tử div là 70px.
                                height: 70,
                            }}
                        >//được sử dụng để chứa biểu tượng icon cho việc mở hộp thoại 
                            <label
                                htmlFor="open-btn"
                                className="open-nav-btn"
                                style={{
                                    fontSize: "3rem",
                                    marginLeft: 12,
                                    display: "none",
                                }}
                            >//Đây là một phần tử i chứa biểu tượng icon của một danh sách công việc clipboard list
                                <i className="fa-solid fa-bars"></i>
                            </label>
                            <i
                                className="fa-solid fa-clipboard-list"
                                style={{
                                    fontSize: 30,
                                    marginRight: 12,
                                    marginLeft: 24,
                                    color: 'var(--primary-color)'
                                }}
                            ></i>
                            <h1>Quản lý chi tiêu</h1>
                        </div>
                    </div>
                </div>
            </header>
            <input type="checkbox" id="open-btn" style={{ display: "none" }} />
        </>
    );
}

export default Header;
