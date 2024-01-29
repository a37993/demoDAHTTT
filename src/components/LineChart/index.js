import { Line } from "@ant-design/charts";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import useStore from "../../store/hooks";

function LineChart({ timeOption }) {
    const { timeType, month, year } = timeOption;
    const [{ exp_list, exp_types }, dispatch] = useStore();
    const [data, setData] = useState([]);

    const formatDate = "YYYY-MM-DD";
    const formatMonth = "YYYY-MM";

    function spendInADayInWeekByType(day) {
        const weekDays = [
            "Chủ nhật",
            "Thứ hai",
            "Thứ ba",
            "Thứ tư",
            "Thứ năm",
            "Thứ sáu",
            "Thứ bảy",
        ];
        //Khởi tạo một mảng rỗng result để lưu trữ dự liệu chi tiêu của các loại khoản chi trong ngày cụ thể.
        const result = [];
        //ùng phương thức filter để lọc ra các khoản chi từ exp_list có ngày trùng khớp với ngày được truyền vào 
        const expListByDay = exp_list.filter((exp) => exp.exp_date === day);
        //Tạo một đối tượng Date để biểu diễn ngày truyền vào, và gán cho biến date.
        const date = new Date(day);
        // Duyệt qua từng loại khoản chi trong exp_types và thực hiện các bước tính toán cho từng loại:
        exp_types.forEach((type, index) => {
            // Kiểm tra xem loại khoản chi hiện tại có tồn tại
            if (type) {
                result.push({
                    day:
                    //Dùng để lấy tên của ngày trong tuần,Điều này giúp xác định ngày trong tuần của ngày hiện tại.
                        weekDays[date.getDay()] +
                        //Kiểm tra xem ngày hiện tại có phải là ngày được truyền vào không.
                        (date.getDate() === new Date().getDate()
                            ? " (Hôm nay)"
                            : ""),
                            //tính tổng chi tiêu của loại khoản chi hiện tại trong ngày đó.
                    spend: expListByDay.reduce(
                        (acc, exp) =>
                            exp.exp_type == index ? acc + +exp.exp_spend : acc,
                        0
                    ),
                    //: Lưu trữ tên loại khoản chi trong thuộc tính type.
                    type: type,
                });
            }
        });
        return result;
    }
// tính toán tổng chi tiêu trong một tuần gần đây theo từng loại khoản chi
    function spendInAWeekByType() {
        //Đầu tiên, khởi tạo một mảng rỗng result để lưu trữ dữ liệu về chi tiêu theo từng loại trong tuần gần đây.
        const result = [];
        //Điều này sẽ trả về ngày trong tháng hiện tại.
        const today = new Date().getDate();
        //để lưu trữ các ngày trong tuần gần đây.
        const recentWeek = [];
        //duyệt qua 7 ngày trong tuần (ngày hiện tại và 6 ngày trước đó) 
        for (let i = 6; i >= 0; i--) {
            const day = `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
            }-${today - i}`;
            recentWeek.push(dayjs(day, formatDate).format(formatDate));
        }
        //duyệt qua từng ngày trong mảng recentWeek
        recentWeek.forEach((day) => {
            //được gọi để tính toán chi tiêu theo từng loại trong ngày đó
            const spendInADay = spendInADayInWeekByType(day);
            //để ghép mảng kết quả của ngày này vào mảng result tổng cộng.
            result.push(...spendInADay);
        });
        //Mảng này bao gồm thông tin về tổng chi tiêu theo từng loại trong tuần gần đây.
        return result;
    }

    // tính toán tổng chi tiêu trong một ngày cụ thể theo từng loại khoản chi
    function getSpendInADayByType(day) {
        //Đầu tiên, khởi tạo một mảng rỗng result để lưu trữ dữ liệu về chi tiêu theo từng loại trong ngày cụ thể.
        const result = [];
//Tạo một mảng mới bằng cách lọc danh sách exp_list,chỉ giữ lại các khoản chi có ngày trùng khớp với ngày được truyền vào hàm (day).
        const expListByDay = exp_list.filter((exp) => exp.exp_date === day);
        // sau đó duyệt qua từng loại khoản chi 
        exp_types.forEach((type, index) => {
            if (type) {
                result.push({
                    day,
                    //tính tổng chi tiêu của tất cả các khoản chi thuộc loại này trong danh sách đã lọc (expListByDay).
                    spend: expListByDay.reduce(
                        (acc, exp) =>
                        //hàm reduce để tính tổng chi tiêu của loại khoản chi đó trong ngày cụ thể
                        //Hàm này sẽ thực hiện việc so sánh exp.exp_type với index
                            exp.exp_type == index ? acc + +exp.exp_spend : acc,
                        0
                    ),
                    type: type,
                });
            }
        });
        return result;
    }
//tính toán số ngày trong một tháng cụ thể của một năm cụ thể
    function numdaysInAMonth(month, year) {
        //Đầu tiên, hàm khởi tạo một mảng rỗng numDays để lưu trữ danh sách các ngày trong tháng.
        const numDays = [];
        //Tạo một đối tượng Date bằng cách sử dụng năm (year) và tháng (month) truyền vào.
        const date = new Date(year, month, 0);
        //Lấy số ngày cuối cùng trong tháng bằng cách gọi phương thức getDate() trên đối tượng date.
        const numDay = date.getDate();

        for (let i = 1; i <= numDay; i++) {
            //Trong mỗi lần lặp, hàm tạo một đối tượng Date mới để biểu diễn một ngày cụ thể trong tháng
            const day = new Date(year, month - 1, i);
            numDays.push(dayjs(day).format(formatDate));
        }
        //hàm trả về mảng numDays chứa danh sách các ngày trong tháng
        return numDays;
    }
//tính toán số tiền chi tiêu hàng ngày cho mỗi loại khoản chi trong tháng hiện tại
    function getSpendInCurMonthByType() {
        const result = [];
        //biểu diễn ngày hiện tại.
        const today = new Date();
        //lấy danh sách các ngày trong tháng hiện tại bằng cách sử dụng hàm
        const days = numdaysInAMonth(
            today.getUTCMonth() + 1,
            today.getUTCFullYear()
        );
        for (const day of days) {
            const spendADayByType = getSpendInADayByType(day);
            result.push(...spendADayByType);
        }
        //chứa thông tin về số tiền chi tiêu hàng ngày cho mỗi loại khoản chi trong tháng hiện tại.
        return result;
    }
//dùng để tính toán số tiền chi tiêu hàng ngày cho mỗi loại khoản chi trong một tháng cụ thể
    function getSpendInMonthByType(month, year) {
        const result = [];
        //Điều này giúp xác định số ngày trong tháng đó.
        const days = numdaysInAMonth(month, year);
        for (const day of days) {
            const spendADayByType = getSpendInADayByType(day);
            result.push(...spendADayByType);
        }
        //chứa tất cả các khoản chi tiêu hàng ngày cho mỗi loại trong tháng cụ thể.
        return result;
    }

    // Year
    //tính toán số tiền chi tiêu hàng tháng cho mỗi loại khoản chi trong một tháng cụ thể
    function getSpendInAMonthByType(month, year) {
        const result = [];
        //Hàm này lọc danh sách các khoản chi tiêu để chỉ bao gồm những khoản chi tiêu trong tháng được chỉ định    
        const expInAMonth = exp_list.filter(
            (exp) =>
                dayjs(exp.exp_date, formatDate).format(formatMonth) ===
                dayjs(`${year}-${month}`, formatMonth).format(formatMonth)
        );
        exp_types.forEach((type, index) => {
            if (type) {
                result.push({
                    month: "Tháng " + month,
                    //lọc các khoản chi tiêu hàng tháng cho từng loại trong danh sách khoản chi tiêu
                    //nó tính tổng số tiền chi tiêu cho loại khoản chi đó trong tháng cụ thể bằng cách sử dụng expInAMonth.reduce
                    spend: expInAMonth.reduce((acc, exp) => {
                        return exp.exp_type == index ? acc + +exp.exp_spend : acc;
                    }, 0),
                    type,
                });
            }
        });
        //thông tin về số tiền chi tiêu hàng tháng cho mỗi loại khoản chi trong tháng cụ thể 
        return result;
    }
//tính toán số tiền chi tiêu cho mỗi loại khoản chi trong tất cả các tháng của năm hiện tại.
    function getSpendInCurYearByType() {
        const result = [];
        for (let i = 1; i <= 12; i++) {
            //Đối với mỗi tháng, nó gọi hàm getSpendInAMonthByType(i, new Date().getFullYear()) để tính 
            result.push(...getSpendInAMonthByType(i, new Date().getFullYear()));
        }
        return result;
    }
//tính toán số tiền chi tiêu cho mỗi loại khoản chi trong tất cả các tháng của một năm cụ thể
    function getSpendInAYearByType(year) {
        const result = [];
        for (let i = 1; i <= 12; i++) {
            //tính toán số tiền chi tiêu cho mỗi loại khoản chi trong tháng đó và thêm kết quả vào mảng result.
            result.push(...getSpendInAMonthByType(i, year));
        }
        return result;
    }
//Khi bất kỳ trong số các giá trị này thay đổi, 
//useEffect sẽ thực thi lại một loạt các câu lệnh để xác định dữ liệu cần được hiển thị trong biểu đồ.
    useEffect(() => {
        switch (timeType) {
// thì nó gọi hàm spendInAWeekByType() để tính toán số tiền chi tiêu cho từng loại khoản chi trong tuần và gán kết quả vào data            
            case "week":
                setData(spendInAWeekByType());
                break;
            case "month":
// thì nó kiểm tra xem month và year có giá trị hay không. Nếu có, nó gọi hàm getSpendInMonthByType(month, year) để tính                
                if (month) {
                    setData(getSpendInMonthByType(month, year));
 //Nếu không có, nó gọi hàm getSpendInCurMonthByType() để tính toán số tiền chi tiêu cho từng loại khoản chi trong tháng hiện tại
                } else setData(getSpendInCurMonthByType());
                break;
            case "year":
                //Nếu có tính toán số tiền chi tiêu cho từng loại khoản chi trong năm và gán kết quả vào data
                if (year) {
                    setData(getSpendInAYearByType(year));
                    //Nếu không có tính toán số tiền chi tiêu cho từng loại khoản chi trong năm hiện tại
                } else setData(getSpendInCurYearByType());
                break;
            default:
                break;
        }
    }, [timeType, month, year]);
    // const data = spendInAWeekByType();

    // const data = getSpendInCurMonthByType();
//hiển thị biểu đồ dựa trên dữ liệu đã được tính toán trong data
    const config = {
        // Dữ liệu đầu vào cho biểu đồ.
        data,
        // Khoảng cách giữa biểu đồ và khung vẽ.
        padding: [20, 0, 0, 30],
        //Khoảng cách được thêm vào các phía của biểu đồ.
        appendPadding: 50,
        //Trường dữ liệu cho trục x của biểu đồ. Nếu timeType không phải "year," trường x là "day," ngược lại là "month."        
        xField: timeType !== "year" ? "day" : "month",
        //Trường dữ liệu cho trục y của biểu đồ, chứa giá trị số tiền chi tiêu.
        yField: "spend",
        //Trường dữ liệu để phân chia biểu đồ thành các dòng dựa trên các loại khoản chi (loại dữ liệu).
        seriesField: "type",
        //Cấu hình cho trục y, bao gồm định dạng nhãn trục và vị trí của trục y.
        yAxis: {
            label: {
                formatter: (v) =>
                    `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
                style: {
                    fill: "var(--text-color)",
                },
            },
            position: "left",
        },
        //Cấu hình cho trục x, bao gồm định dạng nhãn trục x.
        xAxis: {
            label: {
                style: {
                    fill: "var(--text-color)",
                    fontSize: 12,
                },
            },
        },
        //Định cấu hình cho đường dự kiến hiển thị trên biểu đồ, bao gồm độ dày của đường.
        lineStyle: {
            lineWidth: 3, // Độ dày của đường
        },
        //Cấu hình cho hướng dẫn (legend) hiển thị trên biểu đồ, bao gồm vị trí và kiểu dữ liệu hiển thị
        legend: {
            position: "top",
            padding: [0, 0, 50, 0],
            itemName: {
                style: {
                    fill: "var(--text-color)",
                },
            },
        },
        //Cấu hình cho hiệu ứng xuất hiện của biểu đồ.
        animation: {
            appear: {
                animation: "path-in",
                duration: 2000,
            },
        },
        //Cấu hình cho tooltip (công cụ gợi ý) hiển thị khi di chuột qua biểu đồ.
        tooltip: {},
//Điều khiển thanh cuộn ngang (scrollbar) 
//nếu timeType là "month." Thanh cuộn này cho phép người dùng dễ dàng di chuyển trong trường hợp có nhiều ngày trong tháng.        
        scrollbar: () => {
            return (
                timeType === "month" && {
                    type: "horizontal",
                    categorySize: 70,
                    style: {
                        trackColor: "#c9cacd",
                        thumbColor: "#93959a",
                        thumbHighlightColor: "#93959a",
                    },
                }
            );
        },
    };
//là biến sẽ được sử dụng làm đối số cho thành phần Line, nó kế thừa tất cả thuộc tính từ config và thêm thanh cuộn
//nếu timeType là "month." Thành phần Line sẽ hiển thị biểu đồ dựa trên finalConfig.
    const finalConfig = { ...config, scrollbar: config.scrollbar() };
    return <Line {...finalConfig} />;
}

export default LineChart;
