//được import từ thư viện React Bootstrap để tạo ra một modal cùng với nút.
import { Modal, Button } from 'react-bootstrap'
//được import từ React để thực hiện các hiệu ứng sau khi thành phần được render.
import { useEffect } from 'react';
//được import từ store để sử dụng khi cần chỉnh sửa một khoản chi.
import { EDIT_EXPENSE } from '../../store'
//được import từ thành phần Validator để kiểm tra và xác nhận dữ liệu nhập vào modal.
import Validator from '../Validator';
import './ModalExpenseItem.scss'
import useStore from '../../store/hooks';
import action from '../../store/actions';
//trả về JSX để hiển thị modal và các nút điều khiển
// chỉnh sửa thông tin khoản chi cùng với các nút "Lưu" và "Hủy" để thực hiện hoặc hủy chỉnh sửa.
function ModalExpenseItem({ modalState, expId = 0 }) {
    const [{ exp_list, exp_types }, dispatch] = useStore();

    // Modal state
    //lưu trữ trạng thái hiển thị của modal. Khi showModal là true, modal sẽ hiển thị; khi showModal là false, modal sẽ bị ẩn.
    const {showModal, setShowModal} = modalState
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        //kiểm tra dữ liệu như yêu cầu nhập tên khoản chi, số tiền, kiểm tra số hợp lệ, yêu cầu chọn ngày và chọn loại khoản chi.
        Validator({
            form: '#form-edit',
            errorSelector: '.form_message',
            formGroupSelector: '.form_group',
            rules: [
                Validator.isRequired('#exp_name_edit', 'Vui lòng nhập tên khoản chi'),
                Validator.isRequired('#exp_spend_edit', 'Vui lòng nhập số tiền'),
                Validator.isNumber('#exp_spend_edit', 'Vui lòng nhập số'),
                Validator.isRequired('#exp_date_edit', 'Vui lòng chọn ngày'),
                Validator.isRequired('#exp_type_edit', 'Vui lòng chọn loại khoản chi')
            ],
            onSubmit: function(newExp) {
                //hàm dispatch để gửi yêu cầu chỉnh sửa thông tin khoản chi qua API,
              // Call API
              dispatch(action(EDIT_EXPENSE, {expId, newExp}))
              handleCloseModal();
            }
        });
    })

    return (
        <>
        //Thuộc tính này quyết định xem modal có được hiển thị hay không dựa trên giá trị của showModal
        //Nếu showModal là true, thì modal sẽ hiển thị, ngược lại thì ẩn đi.
        // onHide Sự kiện này được gọi khi người dùng đóng modal bằng cách nhấn nút "Đóng".
            <Modal show={showModal} onHide={handleCloseModal}
            //Đây là các thuộc tính để căn chỉnh tiêu đề modal theo giữa và tránh việc sử dụng các thuộc tính tùy chỉnh.
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='my-modal'
                // size='lg'
            >
                //nó chứa một biểu mẫu form cho việc chỉnh sửa thông tin khoản chi.
                <Modal.Body>
//Mỗi trường dữ liệu cho tên khoản chi, số tiền, ngày tạo, loại khoản chi và ghi chú được hiển thị trong các phần riêng biệt của biểu mẫu.
                    <form action="" className="form" id="form-edit" style={{ margin: 'auto', boxShadow: '0px 3px 20px 6px #000' }}>
                    <h3>Chỉnh sửa</h3>
                    <div className="form_group">
                        <label htmlFor="exp_name_edit" className="form_label">Tên khoản chi:</label>
                        <input id="exp_name_edit" name="exp_name" type="text" placeholder="VD: Coffee..." className="form_control" 
                            defaultValue={(exp_list.filter((exp) => exp.id == expId)[0] || {}).exp_name}
                        />
                        <span className="form_message"></span>
                    </div>
                    
                    <div className='grid'>
                        <div className='row'>
                            <div className='col l-6 m-6 c-12'>
                                <div className="form_group">
                                    <label htmlFor="exp_spend_edit" className="form_label">Số tiền:</label>
                                    <input id="exp_spend_edit" name="exp_spend"  type="text" placeholder="VD: 20000..." className="form_control" 
                                        defaultValue={(exp_list.filter((exp) => exp.id == expId)[0] || {}).exp_spend}
                                    />
                                    <span className="form_message"></span>
                                </div>
                            </div>
                            <div className='col l-6 m-6 c-12'>
                                <div className="form_group">
                                    <label htmlFor="exp_date_edit" className="form_label">Ngày tạo:</label>
                                    <input id="exp_date_edit" name="exp_date"  type="date" className="form_control" 
                                        defaultValue={(exp_list.filter((exp) => exp.id == expId)[0] || {}).exp_date}
                                    />
                                    <span className="form_message"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="form_group">
                        <label htmlFor="exp_type_edit" className="form_label">Loại khoản chi:</label>
                        <select id="exp_type_edit" name='exp_type' className="form_control" defaultValue={(exp_list.filter((exp) => exp.id == expId)[0] || {}).exp_type}>
                            <option value=''>---Chọn loại khoản chi---</option>
                            {exp_types
                                .map((type, index) => 
                                <option 
                                    key={index} 
                                    value={index}
                                >{type}</option>)
                                .filter((element, index) => !!exp_types[index])
                            }
                        </select>
                        <span className="form_message"></span>
                    </div>
                    <div className="form_group">
                        <label htmlFor="exp_note_edit" className="form_label">Ghi chú:</label>
                        <input id="exp_note_edit" name='exp_note' type="text" placeholder="VD: Mua ở WinMart..." className="form_control" 
                            defaultValue={(exp_list.filter((exp) => exp.id == expId)[0] || {}).exp_note}
                        />
                        <span className="form_message"></span>
                    </div>
                    //sử dụng để đóng modal. Khi người dùng nhấn nút này, hàm handleCloseModal được gọi.
                    <Button variant="danger" onClick={handleCloseModal} size='lg'>
                        Đóng
                    </Button>
                    <Button variant="info" type='submit' size='lg' 
                        style={{ marginLeft: 12 }}
                    >
                        Lưu
                    </Button>
                </form>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default ModalExpenseItem;