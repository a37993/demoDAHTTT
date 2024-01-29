import { useEffect, memo } from "react";
import Validator from "../Validator";
import action from "../../store/actions";
import { ADD_EXPENSE } from "../../store";
import useStore from "../../store/hooks";
import { v4 as uuidv4 } from "uuid";

function AddExpenseCard() {
    // Đây là việc sử dụng một hook tên useStore để truy cập trạng thái và dispatch(hành động) trong ứng dụng
    const [state, dispatch] = useStore();
    //Đây là một hook useEffect, được sử dụng để thực hiện các tác vụ phụ thuộc vào hiệu ứng (side effects) 
    //Trong trường hợp này, nó được sử dụng để thực hiện một loạt các kiểm tra và xác thực
    //trên các trường dữ liệu trước khi gửi dữ liệu lên server khi người dùng nhấn nút gửi.
    useEffect(() => {
        //Hàm này nhận một đối tượng cấu hình với các thông số sau
        Validator({
            //"form": CSS selector của biểu mẫu HTML
            form: "#form_1",
            //"errorSelector": CSS selector của vùng để hiển thị thông báo lỗi.
            errorSelector: ".form_message",
            //"formGroupSelector": CSS selector của các nhóm trường dữ liệu trong biểu mẫu.
            formGroupSelector: ".form_group",
            //"rules": Một mảng chứa các quy tắc kiểm tra dữ liệu
            rules: [

                Validator.isRequired(
                    //kiểm tra trường "#exp_name" để đảm bảo rằng nó không trống
                    "#exp_name",
                    "Vui lòng nhập tên khoản chi"
                ),
                // "#exp_spend" để đảm bảo rằng nó là một số.
                Validator.isRequired("#exp_spend", "Vui lòng nhập số tiền"),
                Validator.isNumber("#exp_spend", "Vui lòng nhập số"),
                Validator.isRequired("#exp_date", "Vui lòng chọn ngày"),
                Validator.isRequired(
                    "#exp_type",
                    "Vui lòng chọn loại khoản chi"
                ),
            ],
            //Đây là một hàm callback được gọi khi biểu mẫu được gửi
            onSubmit: function (exp) {
                // Gọi hàm dispatch để gửi một hành động với loại "ADD_EXPENSE" 
                dispatch(
                    action(ADD_EXPENSE, {
                        // đối tượng dữ liệu, bao gồm một ID duy nhất được tạo bằng uuidv4()
                        id: uuidv4(),
                        //dữ liệu từ biểu mẫu (exp).
                        ...exp,
                    })
                );
            },
        });
    });

    return (
        // Các phần tử <div> thường được sử dụng để nhóm hoặc đóng gói các phần tử HTML khác lại với nhau.
        <div className="add_expense_card">
 //         Đây là một biểu mẫu HTML form với một số thuộc tính.
            Thuộc tính action định rõ nơi dữ liệu của biểu mẫu sẽ được gửi khi nó được gửi.
            action được đặt thành rỗng, có nghĩa là dữ liệu sẽ được xử lý bằng JavaScript thay vì một trang web hoặc API khác.
            Thuộc tính className được sử dụng để thêm một lớp CSS vào biểu mẫu.
            Thuộc tính id định danh duy nhất cho biểu mẫu. Nó có thể được sử dụng để tham chiếu đến biểu mẫu bằng JavaScript.
            <form action="" className="form" id="form_1">
 //             Đây là một tiêu đề h3 với một lớp CSS là "heading"     
                <h3 className="heading">Thêm khoản chi</h3>
                {/* <p className="desc"></p> */}
                {/* <div className="spacer"></div> */}

 //              Nó được sử dụng để nhóm các phần tử HTML liên quan đến việc nhập dữ liệu trong biểu mẫu.
                <div className="form_group">
//                   laber được sử dụng để tạo nhãn cho trường dữ liệu.
//                   Thuộc tính htmlFor liên kết nhãn này với trường dữ liệu có id là "exp_name"
                    <label htmlFor="exp_name" className="form_label">
                        Tên khoản chi:
                    </label>                   
                    <input
//Thuộc tính id để định danh trường dữ liệu, giúp liên kết nhãn với trường dữ liệu và thực hiện xác thực trong mã JavaScript.
                        id="exp_name"
//Thuộc tính name là tên của trường dữ liệu, sẽ được gửi đi khi biểu mẫu được gửi.                       
                        name="exp_name"
//Loại của trường dữ liệu là văn bản (text).                        
                        type="text"
//Thuộc tính placeholder hiển thị một văn bản mô tả ngắn gợi ý cho người dùng về loại dữ liệu cần nhập vào trường.                       
                        placeholder="VD: Coffee..."
//Thuộc tính className được sử dụng để thêm lớp CSS cho trường dữ liệu.                        
                        className="form_control"
                    />
                    <span className="form_message"></span>
                </div>
//   lớp CSS như "grid" được sử dụng để tạo một lưới (grid) hoặc cơ cấu trang cho các phần tử con bên trong.
                <div className="grid">
//   Trong thiết kế grid, lớp "row" thường được sử dụng để nhóm các cột hoặc phần tử con theo hàng ngang.                    
                    <div className="row">
//   "col": Đây là lớp chung cho cột. Có thể được sử dụng để xác định các cột bên trong một lưới.
//   "l-6 m-6 c-12": Đây là các lớp concreted của cột và có thể liên quan đến các điểm cụ thể của giao diện. 
//   Thường, "l" có thể đề cập đến lớn (large), "m" đề cập đến trung bình (medium), và "c" có thể đề cập đến nhỏ (small). 
//   Số sau dấu gạch ngang "-" (ví dụ: "6") có thể đại diện cho số cột mà cột hiện đang chiếm trong lưới.                    
                        <div className="col l-6 m-6 c-12">
//  Nó được sử dụng để nhóm các phần tử HTML liên quan đến việc nhập dữ liệu cho số tiền và ngày tạo.                            
                            <div className="form_group">
//  dùng để tạo một nhãn cho trường dữ liệu "Số tiền". 
//  Thuộc tính htmlFor liên kết nhãn với trường dữ liệu có id là "exp_spend". Nội dung của nhãn là "Số tiền".                                
                                <label
                                    htmlFor="exp_spend"
                                    className="form_label"
                                >
                                    Số tiền:
                                </label>
//  Đây là một trường dữ liệu input để người dùng nhập số tiền khoản chi.                                
                                <input
                                    id="exp_spend"
                                    name="exp_spend"
                                    type="text"
                                    placeholder="VD: 20000..."
                                    className="form_control"
                                />
//  dùng để hiển thị thông báo lỗi                               
                                <span className="form_message"></span>
                            </div>
                        </div>
                        <div className="col l-6 m-6 c-12">
                            <div className="form_group">
                                <label
                                    htmlFor="exp_date"
                                    className="form_label"
                                >
                                    Ngày tạo:
                                </label>
                                <input
                                    id="exp_date"
                                    name="exp_date"
                                    type="date"
                                    className="form_control"
                                />
                                <span className="form_message"></span>
                            </div>
                        </div>
                    </div>
                </div>
//  được sử dụng để nhóm các phần tử HTML liên quan đến việc nhập loại khoản chi.
                <div className="form_group">
//  dùng để tạo một nhãn cho trường dữ liệu "Loại khoản chi". 
//  Thuộc tính htmlFor liên kết nhãn với trường dữ liệu có id là "exp_type". Nội dung của nhãn là "Loại khoản chi".                    
                    <label htmlFor="exp_type" className="form_label">
                        Loại khoản chi:
                    </label>
//  cho phép người dùng chọn loại khoản chi từ danh sách các tùy chọn.                    
                    <select
//  Đây là thuộc tính id để định danh trường dữ liệu. Nó giúp liên kết nhãn với trường dữ liệu.                    
                        id="exp_type"
//  Thuộc tính name là tên của trường dữ liệu, sẽ được gửi khi biểu mẫu được gửi.                        
                        name="exp_type"
//   Thuộc tính className được sử dụng để thêm lớp CSS cho trường dữ liệu.                        
                        className="form_control"
                    >
//  Đây là một tùy chọn mặc định để cho người dùng biết họ cần chọn loại khoản chi.                       
                        <option value="">---Chọn loại khoản chi---</option>
//  Đây là một biểu thức JavaScript được sử dụng để tạo các tùy chọn cho trường select dựa trên dữ liệu trong                        
                        {state.exp_types
//  Hàm .map() được sử dụng để lặp qua mảng state.exp_types và tạo các tùy chọn (<option>) tương ứng.                        
                            .map((type, index) => (
//  Thuộc tính key được sử dụng để định dạng duy nhất của mỗi tùy chọn trong danh sách
//  Thuộc tính value cho biết giá trị của tùy chọn, trong trường hợp này, là chỉ mục của phần tử trong mảng.                                
                            <option key={index} value={index}>{type}</option>))
//  Dòng này dùng để loại bỏ các tùy chọn có giá trị là undefined, Điều này giúp loại bỏ các tùy chọn không hợp lệ hoặc trống.                            
                            .filter((element, index) => !!state.exp_types[index])
                        }
                    </select>
// dùng để hiển thị thông báo lỗi hoặc thông tin sau khi người dùng chọn loại khoản chi.                    
                    <span className="form_message"></span>
                </div>
                <div className="form_group">
                    <label htmlFor="exp_note" className="form_label">
                        Ghi chú:
                    </label>
                    <input
                        id="exp_note"
                        name="exp_note"
                        type="text"
                        placeholder="VD: Mua ở WinMart..."
                        className="form_control"
                    />
                    <span className="form_message"></span>
                </div>
                <button className="form_submit" type="submit">
                    Thêm khoản chi
                </button>
            </form>
        </div>
    );
}

export default memo(AddExpenseCard);
