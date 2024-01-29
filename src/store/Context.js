//sử dụng để tạo một ngữ cảnh (context) trong ứng dụng React.
import { createContext } from 'react'
//Đối tượng này sẽ chứa Provider và Consumer components để chia sẻ giá trị trong toàn bộ ứng dụng.
const Context = createContext()
//đối tượng ngữ cảnh này để có thể sử dụng nó trong các phần khác của ứng dụng React.
export default Context