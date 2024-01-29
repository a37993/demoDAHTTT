import { useEffect, useRef, memo } from 'react'
// import { Button } from 'react-bootstrap'
import Validator from '../Validator'
import useStore from '../../store/hooks';
import action from '../../store/actions';
import { ADD_EXPENSE_TYPE } from '../../store';


function AddExpenseType() {
    //Đoạn mã này sử dụng hook useStore để lấy trạng thái và hàm dispatch từ store.
    //là việc lấy trạng thái exp_types từ store. exp_types có thể chứa danh sách các loại khoản chi.
    //dispatch là hàm được sử dụng để gửi các hành động đến store, để cập nhật trạng thái ứng dụng.
    const [{ exp_types }, dispatch] = useStore()
    //để tạo một tham chiếu đến một phần tử DOM.
    const inputRef = useRef()
    //để thực hiện các tác vụ phụ thuộc vào hiệu ứng. Mã này sẽ được thực thi sau khi thành phần được render.
    useEffect(() => {
        //hàm Validator để xác thực biểu mẫu.
        Validator({
            // định rõ rằng biểu mẫu cần xác thực có id là "form_2".
            form: '#form_2',
            // cho biết rằng thông báo lỗi sẽ được hiển thị trong các phần tử có lớp CSS "form_message".
            errorSelector: '.form_message',
            // cho biết rằng các nhóm trường dữ liệu trong biểu mẫu nằm trong các phần tử có lớp CSS "form_group".
            formGroupSelector: '.form_group',
            // một mảng các quy tắc kiểm tra dữ liệu trong biểu mẫu. Trong trường hợp này, có hai quy tắc:
            rules: [
               // để đảm bảo rằng nó không trống. Nếu trống, hiển thị thông báo lỗi "Vui lòng nhập loại khoản chi".
                Validator.isRequired('#exp_type_name', 'Vui lòng nhập loại khoản chi'),
                // để đảm bảo rằng nó không trùng với bất kỳ giá trị nào trong danh sách 
                Validator.isExist('#exp_type_name', exp_types, 'Loại khoản chi này đã tồn tại')
            ],
            //Đoạn mã này là một callback được gọi khi biểu mẫu được gửi.
            onSubmit: function(data) {
              // Call API
//Trong phần này, bạn gửi một hành động ADD_EXPENSE_TYPE với dữ liệu là data?.exp_type_name (tức là tên loại khoản chi).
//Sau đó, bạn xóa giá trị trong trường dữ liệu và đặt lại trọng tâm vào trường dữ liệu để chuẩn bị cho việc nhập loại khoản chi tiếp theo.
              dispatch(action(ADD_EXPENSE_TYPE, data?.exp_type_name))
              inputRef.current.value = ''
              inputRef.current.focus()
            }
        });
    }) 
// Đoạn mã này trả về phần giao diện của thành phần AddExpenseType. 
// Giao diện này có thể chứa các phần tử HTML và trường dữ liệu để người dùng nhập tên loại khoản chi và gửi nó đi.
    return (
// Nó được sử dụng để tạo một phần giao diện riêng cho việc thêm loại khoản chi.        
        <div className="add_expense_type">
// Đây là một phần tử biểu mẫu form   
// Thuộc tính action xác định URL hoặc đường dẫn mà biểu mẫu sẽ gửi dữ liệu đến,
// để trống, có nghĩa rằng biểu mẫu không gửi dữ liệu đến bất kỳ URL cụ thể nào.        
            <form action="" className="form" id="form_2">
//Đây là một tiêu đề  h3 với lớp CSS "heading".                
                <h3 className="heading">Thêm loại khoản chi</h3>
// Phần tử này có thể được sử dụng để tạo một khoảng cách hoặc dấu phân cách giữa các phần tử giao diện khác.                
                <div className="spacer"></div>
// Nó được sử dụng để nhóm các phần tử HTML liên quan đến việc nhập tên loại khoản chi.                
                <div className="form_group">
// một phần tử nhãn label dùng để tạo một nhãn cho trường dữ liệu "Tên loại khoản chi"
//  Thuộc tính htmlFor liên kết nhãn với trường dữ liệu có id là "exp_type_name". Nội dung của nhãn là "Tên loại khoản chi".
                    <label htmlFor="exp_type_name" className="form_label">Tên loại khoản chi:</label>
//  để người dùng nhập tên loại khoản chi
// Thuộc tính ref được sử dụng để kết nối trường dữ liệu với biến inputRef, được khai báo trước đó với useRef
// Điều này cho phép bạn thao tác với trường dữ liệu từ mã JavaScript.
// Thuộc tính id để định danh trường dữ liệu. Nó giúp liên kết nhãn với trường dữ liệu và thực hiện xác thực trong mã JavaScript.
// Thuộc tính name là tên của trường dữ liệu, sẽ được gửi khi biểu mẫu được gửi. 
// Thuộc tính className được sử dụng để thêm lớp CSS cho trường dữ liệu.                   
                    <input ref={inputRef} id="exp_type_name" name="exp_type_name" type="text" placeholder="VD: Tiền nhà, Tiền học..." className="form_control" />
// dùng để hiển thị thông báo lỗi hoặc thông tin sau khi người dùng nhập tên loại khoản chi.                     
                    <span className="form_message"></span>
                </div>
// dùng để gửi biểu mẫu và thêm loại khoản chi mới. 
// Thuộc tính className được sử dụng để thêm lớp CSS cho nút.
// Loại của nút là "submit", có nghĩa rằng nó sẽ gửi biểu mẫu khi người dùng nhấn vào nút này.               
                <button className="form_submit" type="submit">Thêm loại khoản chi</button>
            </form>
        </div>
    )
}

export default memo(AddExpenseType)