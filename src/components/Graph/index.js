import BarChart from '../BarChart'
import LineChart from '../LineChart'
// Đây là khai báo của thành phần React Graph
// Props này sẽ quyết định loại biểu đồ (bar chart hoặc line chart) và tùy chọn thời gian (time option) mà thành phần Graph sẽ hiển thị.
function Graph({ type, timeOption }) {
    return (
// Nó được sử dụng để bao quanh biểu đồ và đặt một số thuộc tính CSS inline.        
        <div className='graph' style={{ 
// Đây là các thuộc tính CSS inline cho phần tử <div>
//xác định rằng biểu đồ có chiều rộng là 100% của phần tử cha, chiều cao là 50% của phần tử cha và cách đỉnh của phần tử cha 30 pixel.            
            width: "100%",
            height: "50%",
            paddingTop: 30
         }}>
//Đoạn mã này sử dụng điều kiện để xác định loại biểu đồ và hiển thị phù hợp      
//Nếu type là 1, thì nó hiển thị một thành phần BarChart và truyền timeOption qua props timeOption.  
// Nếu type không phải 1, thì nó không hiển thị biểu đồ bar chart.     
            {type === 1 && <BarChart timeOption={timeOption}/>}
// nếu type là 2, thì nó hiển thị một thành phần LineChart và truyền timeOption qua props timeOption         
// Nếu type không phải 2, thì nó không hiển thị biểu đồ line chart.   
            {type === 2 && <LineChart timeOption={timeOption}/>}
        </div>
    )
}

export default Graph;