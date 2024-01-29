import { useEffect, useState } from "react";
import { Table, DatePicker } from "antd";
import useStore from "../../store/hooks";
import historyExpStyle from "./HistoryExpenseStyle.module.scss";
import action from "../../store/actions";
import { DELETE_EXPENSE } from "../../store";
import ModalExpenseItem from "../ModalExpenseItem";
const { RangePicker } = DatePicker;

function HistoryExpense() {
    //Để truy cập dữ liệu từ global state của ứng dụng. 
    //exp_types là một mảng chứa các loại khoản chi và exp_list là một mảng chứa danh sách các khoản chi đã được tạo ra trong ứng dụng.
    const [{ exp_types, exp_list }, dispatch] = useStore();
    //được sử dụng để quản lý việc hiển thị hay ẩn modal (cửa sổ giao diện) để xem chi tiết khoản chi.
    //Ban đầu, showModal được đặt thành false, tức là modal sẽ không được hiển thị.
    const [showModal, setShowModal] = useState(false);
//dùng để lưu trữ ID của khoản chi mà người dùng muốn xem chi tiết
// Ban đầu, giá trị của expId là undefined, tức là không có khoản chi nào được chọn để xem chi tiết.
    const [expId, setExpId] = useState();
    //dùng để lưu trữ dữ liệu hiển thị trong danh sách lịch sử khoản chi
    //Ban đầu, data được khởi tạo với một mảng rỗng, tức là không có dữ liệu nào hiển thị ban đầu.
    const [data, setData] = useState([]);
//Nó định nghĩa một hàm callback được chạy khi exp_list (danh sách các khoản chi) thay đổi. 
//Cụ thể, nó sẽ chạy mỗi khi exp_list thay đổi.
    useEffect(() => {
//đoạn này cập nhật trạng thái data bằng cách sử dụng mảng exp_list (danh sách khoản chi) và exp_types (danh sách các loại khoản chi)
//Nó sử dụng .filter() để lọc danh sách exp_list và chỉ bao gồm các khoản chi có loại tương ứng đã được định nghĩa trong exp_types.
//  !!exp_types[exp.exp_type] đảm bảo rằng loại khoản chi đã tồn tại trong danh sách exp_types
        setData(exp_list.filter((exp) => !!exp_types[exp.exp_type]));
    }, [exp_list]);
//để định dạng số tiền theo định dạng tiền tệ Việt Nam (VND)
//Nó sẽ được sử dụng để hiển thị số tiền theo đúng định dạng tiền tệ của Việt Nam.
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
//Tham số đầu tiên (e) là sự kiện (event) xảy ra khi người dùng thực hiện hành động trên giao diện
//Tham số thứ hai (id) là ID của khoản chi mà người dùng muốn chỉnh sửa.
    function handleOpenEditExpense(e, id) {
        if (
            !(
                //Đoạn này so sánh lớp (class) của phần tử mục tiêu (e.target) với lớp của một phần tử khác trong DOM.
                e.target.className ===
        //Đoạn này sử dụng document.querySelector để chọn phần tử trong DOM có lớp (class) tương ứng với một lớp được xác định trong biến 
                document.querySelector(`.${historyExpStyle.detele_exp_icon}`)
                    .className
            )
        ) {
            //hiển thị thông tin chi tiết hoặc cho phép chỉnh sửa khoản chi
            setShowModal(true);
            // Hàm này được sử dụng để đặt giá trị của biến expId bằng ID của khoản chi mà người dùng muốn chỉnh sửa
            // /ID này sẽ được sử dụng để xác định khoản chi cụ thể cần chỉnh sửa.
            setExpId(id);
        }
    }
//Hàm này nhận một tham số id, đó là ID của khoản chi mà người dùng muốn xóa.
    function handleDeleteExp(id) {
        //nó gửi một action đến global state của ứng dụng để thông báo rằng một khoản chi cần phải bị xóa.
        dispatch(action(DELETE_EXPENSE, id));
    }

    const columns = [
        {
            title: "Tên khoản chi",
            dataIndex: "exp_name",
            width: "25%",
            render: (name) => (
                <span className={historyExpStyle.limit_text}>{name}</span>
            ),
        },
        {
            title: "Loại khoản chi",
            dataIndex: "exp_type",
            render: (typeId) => exp_types[typeId],
            filters: exp_types
                .map((type) => type && { text: type, value: type })
                .filter((type) => !!type),
            onFilter: (value, record) => {
                console.log(value, record, exp_types[record.exp_type])
                return exp_types[record.exp_type].startsWith(value)
            },
            filterSearch: true,
        },
        {
            title: "Ngày tạo",
            dataIndex: "exp_date",
        },
        {
            title: "Số tiền",
            dataIndex: "exp_spend",
            render: (spend) => VND.format(spend),
            // Hàm sắp xếp dữ liệu trong cột
            sorter: (a, b) => a.exp_spend - b.exp_spend,
        },
        {
            title: "Thao tác",
            dataIndex: "id",
            render: (id) => {
                return (
                    <i
                        className={`fa-regular fa-trash-can ${historyExpStyle.detele_exp_icon}`}
                        onClick={() => handleDeleteExp(id)}
                    ></i>
                );
            },
            // Định dạng vị trí căn giữa của dữ liệu trong cột (center).
            align: "center",
        },
    ];

    return (
        //định nghĩa thành phần giao diện của trang lịch sử chi tiêu
        <div>
            <h1 className={historyExpStyle.expense_history_heading}>
                Lịch sử chi tiêu
            </h1>
            //Đoạn này chứa các phần tử gom nhóm các chức năng tìm kiếm và lọc dữ liệu. 
            <div className={historyExpStyle.search_group}>
                <div>
                    //Hiển thị biểu tượng (icon) kính lúp cho chức năng tìm kiếm.
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        id="search"
                        placeholder="Tên khoản chi..."
                        onChange={(e) =>
                            setData(
                                exp_list.filter(
                                    (exp) =>
                                        !!exp_types[exp.exp_type] &&
                                        exp.exp_name
                                            .toLowerCase()
                                            .includes(e.target.value)
                                )
                            )
                        }
                    />
                </div>
                //Dùng để chọn khoảng thời gian (ngày tháng) để lọc dữ liệu
                <RangePicker
                    onChange={(moment, [startDate, endDate]) => {
                        const filterDateDate = exp_list.filter(
                            (exp) =>
                                !!exp_types[exp.exp_type] &&
                                exp.exp_date >= startDate &&
                                exp.exp_date <= endDate
                        );
                        return filterDateDate.length === 0
                            ? setData(exp_list.filter((exp) => !!exp_types[exp.exp_type]))
                            : setData(filterDateDate);
                    }}
                />
            </div>
            //hiển thị dữ liệu trong một bảng với cấu hình được định nghĩa trong biến columns
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 6,
                    position: ["bottomCenter"],
                }}
                rowKey={(record) => record.id}
                onRow={(record) => {
                    return {
                        onClick: (e) => handleOpenEditExpense(e, record.id),
                        onMouseOver: (e) => (e.target.style.cursor = "pointer"),
                    };
                }}
            />
            //Đây là một thành phần modal (cửa sổ popup) để hiển thị thông tin chi tiết của khoản chi hoặc để chỉnh sửa khoản chi
            //Thành phần này được hiển thị khi người dùng muốn xem thông tin hoặc chỉnh sửa một khoản chi cụ thể
            <ModalExpenseItem
                modalState={{ showModal, setShowModal }}
                expId={expId}
            />
        </div>
    );
}

export default HistoryExpense;
