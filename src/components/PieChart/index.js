import { Pie } from "@ant-design/plots";
import useStore from "../../store/hooks";
function PieChart() {
    const [{ exp_list, exp_types }, dispatch] = useStore();

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
//list là danh sách các khoản chi và types là một mảng chứa các loại khoản chi.
//tính tổng số tiền đã được chi cho mỗi loại khoản chi 
    function amountForEachType(list, types) {
        const result = [];
        for (let type of types) {
            if (type) {
                result.push({
                    type,
                    value: +list
                    // lọc danh sách
                        .filter((cur) => types[cur.exp_type] === type)
 // với danh sách đã lọc, nó sử dụng phương thức reduce để tính tổng số tiền bằng cách cộng dồn giá trị exp_spend của từng khoản chi.
                        .reduce((acc, cur) => +acc + +cur.exp_spend, 0),
                });
            }
        }
        return result;
    }
    //Biến data sẽ chứa thông tin về tổng số tiền đã được chi cho mỗi loại khoản chi.
    const data = amountForEachType(exp_list, exp_types)
// biến config chứa các cấu hình cho biểu đồ bánh:
    const config = {
        appendPadding: 10,
        //Chứa dữ liệu đã được tính toán    
        data,
//Xác định trường dữ liệu sẽ được sử dụng để xác định góc của mỗi phần của biểu đồ bánh, ở đây là "value" (tổng số tiền).        
        angleField: "value",
//Xác định trường dữ liệu sẽ được sử dụng để đặt màu cho từng phần của biểu đồ, ở đây là "type" (loại khoản chi).        
        colorField: "type",
        // Xác định bán kính của biểu đồ bánh.
        radius: 1,
        // Cấu hình hiển thị nhãn trên biểu đồ bánh
        label: {
            autoRotate: false,
            offset: -60,
            style: {
                fill: "var(--text-color)", // Đổi màu của nhãn thành màu đỏ
                fontSize: 14,
                textAlign: "center",
            },
            type: "inner",
            labelHeight: 10,
            //sẽ hiển thị tỷ lệ phần trăm của mỗi phần
            content: "{percentage}",
        },
        // Cấu hình hiển thị chú thích của biểu đồ bánh
        legend: {
            itemName: {
                style: {
                    fill: "var(--text-color)",
                },
            },
            marker: {
                symbol: "diamond",
            },
        },
        //: Cấu hình hiệu ứng tương tác khi người dùng tương tác với biểu đồ.
        interactions: [
            {
                type: "element-selected",
            },
            {
                type: "element-active",
            },
        ],
        // Cấu hình trạng thái khi một phần được chọn.
        state: {
            active: {
                animate: { duration: 100, easing: "easeLinear" },
                style: {
                    lineWidth: 2,
                    stroke: "var(--text-color)",
                },
            },
                },
        //Cấu hình cho tooltip (chú thích khi rê chuột qua phần của biểu đồ). 
        //Nó hiển thị tên loại và giá trị dưới dạng tiền tệ đã được định dạng.        
        tooltip: {
            formatter: (datum) => {
                return { name: datum.type, value: VND.format(datum.value) };
            },
            fields: ["type", "value"],
        },
    };
    return (
        <div style={{ width: "100%", paddingTop: 50 }}>
            <Pie {...config} />
        </div>
    );
}

export default PieChart;
