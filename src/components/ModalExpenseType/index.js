import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import useStore from "../../store/hooks";
import action from "../../store/actions";
import { DELETE_EXPENSE_TYPE } from "../../store";

//xác nhận việc xóa một loại khoản chi
function ModalExpenseType({ modalState, typeIndex }) {
//Nó sử dụng biến showModal để kiểm soát việc hiển thị và ẩn modal và biến setShowModal để cập nhật trạng thái của modal.    
    const [{ exp_list, exp_types }, dispatch] = useStore();

    const { showModal, setShowModal } = modalState;
    const handleCloseModal = () => setShowModal(false);

    return (
        <div>
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="sm"
            >
                <Modal.Header>Bạn có muốn xóa loại khoản chi này?</Modal.Header>
                <Modal.Body>
                    <p>
                        Khi xóa loại khoản chi tất cả các lịch sử chi tiêu của
                        khoản chi này sẽ bị xóa?{" "}
                    </p>
                </Modal.Body>
                <Modal.Footer>
//hàm này được gọi khi người dùng nhấn nút "Đóng" hoặc đóng modal bằng cách nhấn vào nút đóng (X) trên modal
//Hàm này sẽ cập nhật trạng thái của modal để ẩn nó.                       
                    <Button variant="dark" onClick={handleCloseModal} size="lg">
                        Đóng
                    </Button>
// Khi người dùng nhấn nút "Xóa," một hàm dispatch sẽ được gọi để thực hiện việc xóa loại khoản chi
// bằng cách gọi hành động DELETE_EXPENSE_TYPE , Sau đó, modal sẽ được đóng.               
                    <Button variant="danger" size="lg" onClick={() => {
                        dispatch(action(DELETE_EXPENSE_TYPE, typeIndex))
                        handleCloseModal()
                    }}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalExpenseType;
