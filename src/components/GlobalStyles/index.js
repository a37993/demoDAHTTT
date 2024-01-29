//GlobalStyles là một thành phần React đơn giản được sử dụng để áp dụng kiểu CSS toàn cầu (global styles) cho ứng dụng React của bạn.
//Bằng cách sử dụng nó, bạn có thể đảm bảo rằng các kiểu CSS toàn cầu được áp dụng cho toàn bộ ứng dụng, 
//đồng thời cho phép bạn quản lý kiểu CSS một cách hiệu quả.

//Tệp kiểu SCSS này chứa các kiểu CSS toàn cầu (global styles) mà bạn muốn áp dụng cho toàn bộ ứng dụng React.
import './GlobalStyles.scss'
//Đây là một thành phần React có tên GlobalStyles
//Nó có một tham số children, đại diện cho nội dung con mà bạn muốn bao bọc trong các kiểu CSS toàn cầu.
function GlobalStyles({ children }) {
    // trả về nội dung con (children) mà nó nhận vào
    return children
}

export default GlobalStyles