// một thành phần dùng để tạo biểu đồ cột.
import { Column } from "@ant-design/charts";
//Dòng mã này import hai hook từ thư viện React.
//useState: Hook này cho phép bạn quản lý trạng thái cục bộ trong thành phần React. 
import { useEffect, useState } from "react";
//Hook này có thể được sử dụng để truy cập trạng thái ứng dụng.
import useStore from "../../store/hooks";
//để làm việc với thời gian và ngày tháng trong ứng dụng
import dayjs from "dayjs";
//Điều này có thể được thực hiện để đảm bảo dayjs có thể được sử dụng toàn cục trong ứng dụng.
window.dayjs = dayjs;
//Đây là khai báo của thành phần React BarChar chứa thông tin về tùy chọn thời gian
function BarChar({ timeOption }) {
    //Dòng mã này sử dụng "destructuring" để trích xuất các trường timeType, month, và year từ đối số timeOption
    //  Điều này giúp dễ dàng truy cập thông tin về thời gian trong thành phần
    const { timeType, month, year } = timeOption;
    // Dòng mã này sử dụng hook useStore để truy cập trạng thái ứng dụng và hàm dispatch để gửi hành động đến store.
    // trích xuất hai trường exp_list và exp_types từ trạng thái ứng dụng.
    const [{ exp_list, exp_types }, dispatch] = useStore();
    //Dòng mã này sử dụng hook useState để khởi tạo một trạng thái cục bộ với biến data và hàm setData. 
    //data sẽ chứa dữ liệu cho biểu đồ cột.Ban đầu, nó được khởi tạo với một mảng rỗng [].
    const [data, setData] = useState([]);
    //formatDate được sử dụng để định dạng ngày 
    const formatDate = 'YYYY-MM-DD';
    //formatMonth để định dạng tháng theo dạng "YYYY-MM".
    const formatMonth = 'YYYY-MM'
// Đây là một hàm JavaScript tên là spendInADay, dùng để tính tổng số tiền chi tiêu trong một ngày cụ thể.
    function spendInADay(day) {
        //Hàm này lặp qua danh sách chi tiêu (exp_list) và sử dụng reduce để tính tổng số tiền chi tiêu trong ngày day. 
        return exp_list.reduce((acc, cur) => {
            // Nếu ngày của chi tiêu (exp_date) trùng với day, thì nó sẽ cộng số tiền chi tiêu (exp_spend) vào biến acc.
            return cur.exp_date === day
                ? acc + +cur.exp_spend
                : acc;
        }, 0);
    }
// mục đích chính của hàm spendInAWeek là tính tổng số tiền chi tiêu trong một tuần, dựa trên dữ liệu chi tiêu và thời gian hiện tại.
    function spendInAWeek() {
        //Tạo một mảng rỗng result để lưu trữ kết quả (tổng số tiền chi tiêu trong tuần).
        const result = [];
        //Đây là một mảng chứa tên các ngày trong tuần, bắt đầu từ Chủ nhật (index 0) đến Thứ bảy (index 6).
        const weekDays = [
            "Chủ nhật",
            "Thứ hai",
            "Thứ ba",
            "Thứ tư",
            "Thứ năm",
            "Thứ sáu",
            "Thứ bảy",
        ];
        //Lấy ngày hiện tại (số ngày trong tháng) từ đối tượng Date và lưu trữ trong biến today.
        const today = new Date().getDate();
        //Tạo một mảng rỗng recentWeek để lưu trữ ngày trong tuần gần đây.
        const recentWeek = [];
        //Vòng lặp này điều tra qua 7 ngày trong tuần gần đây (từ ngày hiện tại ngược lại 6 ngày) và lưu trữ ngày này vào mảng recentWeek.
        for (let i = 6; i >= 0; i--) {
            //tính toán ngày trong tháng hiện tại bằng cách sử dụng năm, tháng và ngày
            const day = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${today - i}`
            // biến đổi định dạng của ngày sử dụng thư viện dayjs và đặt nó theo định dạng "YYYY-MM-DD".
            recentWeek.push(dayjs(day,formatDate).format(formatDate));
        }
//Vòng lặp này đi qua 7 ngày trong tuần và tính tổng số tiền chi tiêu trong mỗi ngày.
        for (let i = 0; i < 7; i++) {
// tạo một đối tượng Date từ ngày trong mảng recentWeek.
            const date = new Date(recentWeek[i]);
            result.push({
                day:
                // lấy tên của ngày trong tuần (Chủ nhật, Thứ hai, ...) dựa trên getDay() của đối tượng Date.
                    weekDays[date.getDay()] +
                    //kiểm tra xem ngày trong tuần có phải là ngày hiện tại không
                    //Nếu là ngày hiện tại, thì thêm chuỗi " (Hôm nay)" vào tên ngày, nếu không thì giữ nguyên.
                    (recentWeek[i].split('-')[2] == today ? " (Hôm nay)" : ""),
                    //gọi hàm spendInADay để tính tổng số tiền chi tiêu trong ngày và đưa vào trường spend.
                spend: spendInADay(recentWeek[i]),
            });
        }
        // Hàm trả về mảng result chứa thông tin về tổng số tiền chi tiêu trong mỗi ngày trong tuần.
        return result;
    }

    // get data in a month
    //tính toán và trả về một mảng chứa tất cả các ngày trong tháng hiện tại dựa trên thông tin về tháng (month) và năm (year) được truyền vào.
    function daysInCurrentMonth(month, year) {
        //Tạo một mảng rỗng có tên numDays để lưu trữ các ngày trong tháng.
        const numDays = [];
        //Tạo một đối tượng Date bằng cách sử dụng thông tin về year và month
        //Đối tượng Date này được tạo với ngày cuối cùng của tháng trước tháng được truyền vào (để lấy số ngày trong tháng hiện tại).
        const date = new Date(year, month, 0);
        //Lấy ngày trong tháng từ đối tượng date và lưu trữ trong biến numDay. Biến này chứa số ngày trong tháng hiện tại
        const numDay = date.getDate();
        // Vòng lặp này đi qua các ngày từ 1 đến numDay (số ngày trong tháng).
        for (let i = 1; i <= numDay; i++) {
            //Tạo một đối tượng Date mới cho mỗi ngày trong tháng bằng cách sử dụng thông tin year, month, và i.
            // Lưu ý rằng month - 1 được sử dụng để đảm bảo rằng tháng được tính từ 0 (tháng 1 là 0, tháng 2 là 1, v.v.).
            const day = new Date(year, month - 1, i);
            // Biến đối tượng Date thành một chuỗi có định dạng "YYYY-MM-DD" bằng cách sử dụng thư viện dayjs
            //Sau đó, chuỗi này được thêm vào mảng numDays.
            numDays.push(dayjs(day).format(formatDate));
        }
        // Hàm trả về mảng numDays chứa các ngày trong tháng hiện tại dưới dạng chuỗi có định dạng "YYYY-MM-DD".
        return numDays;
    }
//tính tổng số tiền chi tiêu trong tháng hiện tại bằng cách lặp qua danh sách các ngày trong tháng và tính tổng số tiền chi tiêu trong từng ngày
    function getSpendInCurMonth() {
        //Tạo một mảng rỗng có tên result để lưu trữ kết quả (tổng số tiền chi tiêu trong tháng).
        const result = [];
        //Tạo một đối tượng Date bằng cách sử dụng thời gian hiện tại. Đối tượng today đại diện cho ngày và giờ hiện tại.
        const today = new Date();
        //Gọi hàm daysInCurrentMonth để lấy danh sách các ngày trong tháng hiện tại
        //Đối số thứ nhất (today.getUTCMonth() + 1) là tháng hiện tại (được lấy từ đối tượng today)
        //đối số thứ hai (today.getUTCFullYear()) là năm hiện tại.
        const days = daysInCurrentMonth(
            today.getUTCMonth() + 1,
            today.getUTCFullYear()
        );
//Vòng lặp này đi qua từng ngày trong danh sách days (các ngày trong tháng hiện tại).
        for (const day of days) {
            // Sử dụng hàm reduce để tính tổng số tiền chi tiêu trong ngày đó
            const daySpend = exp_list.reduce((acc, exp) => {
                //Hàm reduce lặp qua danh sách chi tiêu (exp_list) và kiểm tra nếu ngày của chi tiêu (exp.exp_date)
                // trùng với ngày đang xét (day), thì nó cộng số tiền chi tiêu (exp.exp_spend) vào biến acc
                //Nếu không, nó giữ nguyên giá trị acc. Kết quả được lưu trữ trong biến daySpend
                return exp.exp_date === day ? acc + +exp.exp_spend : acc;
            }, 0);
            // Thêm một đối tượng vào mảng result,Đối tượng này có hai trường là day (ngày) và spend (tổng số tiền chi tiêu trong ngày).
            result.push({
                day,
                spend: daySpend,
            });
        }
        //Hàm trả về mảng result chứa thông tin về tổng số tiền chi tiêu trong từng ngày của tháng hiện tại.
        return result;
    }
    //tính tổng số tiền chi tiêu trong một tháng cụ thể 
    //bằng cách lặp qua danh sách các ngày trong tháng và tính tổng số tiền chi tiêu trong từng ngày
    function getSpendByMonth(month, year) {
        //Tạo một mảng rỗng có tên result để lưu trữ kết quả (tổng số tiền chi tiêu trong tháng)
        const result = [];
        // Gọi hàm daysInCurrentMonth để lấy danh sách các ngày trong tháng cụ thể. 
        //Đối số thứ nhất (month) là tháng cần tính toán và đối số thứ hai (year) là năm cần tính toán.
        const days = daysInCurrentMonth(month, year);
        //Vòng lặp này đi qua từng ngày trong danh sách days (các ngày trong tháng cụ thể).
        for (const day of days) {
            //ử dụng hàm reduce để tính tổng số tiền chi tiêu trong ngày đó.
            //Hàm reduce lặp qua danh sách chi tiêu (exp_list) và kiểm tra nếu ngày của chi tiêu (exp.exp_date)
            //trùng với ngày đang xét (day), thì nó cộng số tiền chi tiêu (exp.exp_spend) vào biến acc. Nếu không, nó giữ nguyên giá trị acc. 
            //Kết quả được lưu trữ trong biến daySpend.
            const daySpend = exp_list.reduce((acc, exp) => {
                return exp.exp_date === day ? acc + +exp.exp_spend : acc;
            }, 0);
            //Thêm một đối tượng vào mảng result. Đối tượng này có hai trường là day (ngày) và spend (tổng số tiền chi tiêu trong ngày).
            result.push({
                day,
                spend: daySpend,
            });
        }
        //return result;: Hàm trả về mảng result chứa thông tin về tổng số tiền chi tiêu trong từng ngày của tháng cụ thể.
        return result;
    }
    //hàm này là tính tổng số tiền chi tiêu trong một tháng cụ thể dựa trên thông tin về tháng (month) và năm (year) được truyền vào
    function getSpendInAMonth(month, year) {
        //Sử dụng hàm reduce để lặp qua danh sách chi tiêu (exp_list) và tính tổng số tiền chi tiêu trong tháng cụ thể.
        //Biến acc là biến tích luỹ, ban đầu được thiết lập thành 0.
        return exp_list.reduce((acc, exp) => {
//dùng thư viện dayjs để đổi ngày trong dữ liệu chi tiêu  từ định dạng "YYYY-MM-DD" thành định dạng "YYYY-MM" (chỉ lấy tháng và năm).
            return dayjs(exp.exp_date, formatDate).format(formatMonth) ===
            //Chuyển đổi tháng và năm được truyền vào hàm thành định dạng "YYYY-MM" bằng cách kết hợp chuỗi
            //bằng cách kết hợp chuỗi "${year}-${month}" và định dạng formatMonth.
                dayjs(`${year}-${month}`, formatMonth).format(formatMonth)
                //Nếu ngày trong chi tiêu (exp.exp_date) tương tự với tháng và năm được truyền vào
                //số tiền chi tiêu (exp.exp_spend) được chuyển đổi thành số (+exp.exp_spend) và cộng vào biến tích luỹ acc.
                ? acc + +exp.exp_spend
                // Nếu không, giá trị acc được giữ nguyên.
                : acc;
        }, 0);
    }
//hàm này là tính tổng số tiền chi tiêu trong từng tháng của năm hiện tại và trả về kết quả dưới dạng một mảng các đối tượng
    function getSpendInCurYear() {
        //Tạo một mảng rỗng có tên result để lưu trữ kết quả (tổng số tiền chi tiêu trong từng tháng của năm).
        const result = [];
        // Vòng lặp này đi qua từng tháng của năm (từ tháng 1 đến tháng 12).
        for (let i = 0; i < 12; i++) {
            //Thêm một đối tượng vào mảng result cho mỗi tháng. 
            //Đối tượng này có hai trường là month (tháng) và spend (tổng số tiền chi tiêu trong tháng đó).
            result.push({
                //Tạo tên tháng bằng cách kết hợp chuỗi "Tháng" với số thứ tự tháng (i + 1) để đặt tên tháng dễ đọc (Tháng 1, Tháng 2, ...).
                month: "Tháng " + (i + 1),
                // Gọi hàm getSpendInAMonth để tính tổng số tiền chi tiêu trong tháng đó.
                //Đối số đầu tiên (i + 1) là tháng hiện tại (dựa trên vòng lặp), và đối số thứ hai (new Date().getFullYear()) là năm hiện tại.
                spend: getSpendInAMonth(i + 1, new Date().getFullYear()),
            });
        }
        //Hàm trả về mảng result chứa thông tin về tổng số tiền chi tiêu trong từng tháng của năm hiện tại.
        return result;
    }
//hàm này là tính tổng số tiền chi tiêu trong từng tháng của một năm cụ thể 
    function getSpendByYear(year) {
        // /Tạo một mảng rỗng có tên result để lưu trữ kết quả (tổng số tiền chi tiêu trong từng tháng của năm).
        const result = [];
        //Vòng lặp này đi qua từng tháng của năm (từ tháng 1 đến tháng 12).
        for (let i = 0; i < 12; i++) {
            //Thêm một đối tượng vào mảng result cho mỗi tháng. 
            //Đối tượng này có hai trường là month (tháng) và spend (tổng số tiền chi tiêu trong tháng đó).
            result.push({
                month: "Tháng " + (i + 1),
                //Gọi hàm getSpendInAMonth để tính tổng số tiền chi tiêu trong tháng đó.
                spend: getSpendInAMonth(i + 1, year),
            });
        }
        //Hàm trả về mảng result chứa thông tin về tổng số tiền chi tiêu trong từng tháng của năm được chỉ định
        return result;
    }

    

//Mục tiêu chính của mã là cập nhật dữ liệu hiển thị trên biểu đồ dựa trên thời gian được chọn.
    useEffect(() => {
        // Giá trị này xác định thời gian hiển thị trên biểu đồ, có thể là "week" (tuần), "month" (tháng), hoặc "year" (năm).
        switch (timeType) {
            case "week":
                //Hàm spendInAWeek được gọi để tính toán tổng số tiền chi tiêu trong từng ngày trong tuần gần nhất.
                // Kết quả được lưu trữ bằng setData để cập nhật dữ liệu trên biểu đồ.
                setData(spendInAWeek());
                break;
            case "month":
                if (month) {
                    //hàm getSpendByMonth được gọi để tính tổng số tiền chi tiêu trong tháng và năm đã chọn
                    setData(getSpendByMonth(month, year));
                    ////Nếu không, hàm getSpendInCurMonth được gọi để tính tổng số tiền chi tiêu trong tháng hiện tại.
                } else setData(getSpendInCurMonth());
                break;
            case "year":
                if (year) {
                    // Nếu có, hàm getSpendByYear được gọi để tính tổng số tiền chi tiêu trong từng tháng của năm đã chọn
                    setData(getSpendByYear(year))
                    //Nếu không, hàm getSpendInCurYear được gọi để tính tổng số tiền chi tiêu trong từng tháng của năm hiện tại
                } else
                    setData(getSpendInCurYear());
                break;
            default:
                //Nếu timeType không khớp với bất kỳ giá trị nào
                break;
        }
    }, [timeType, month, year]);
//mã code này tạo và hiển thị một biểu đồ cột dựa trên dữ liệu và cấu hình được định nghĩa trong config.
//Biểu đồ sẽ thể hiện tổng số tiền chi tiêu theo thời gian (ngày hoặc tháng) dựa trên giá trị timeType.
//Đây là định nghĩa cấu hình cho biểu đồ.
    const config = {
        //Dữ liệu dùng để hiển thị trên biểu đồ.
        data,
        // Xác định khoảng cách giữa biểu đồ và biên của khu vực hiển thị. Đây là một mảng chứa giá trị top, right, bottom, left.
        padding: [20, 0, 0, 30],
        //Khoảng cách bổ sung được thêm vào biểu đồ ở phía dưới.    
        appendPadding: 50,
        //Cho phép biểu đồ tự động điều chỉnh kích thước để vừa với khu vực hiển thị.
        autoFit: true,
        //Độ cao của biểu đồ
        height: 400,
        //Chiều rộng tối thiểu của cột.
        minColumnWidth: 20,
        //Chiều rộng tối đa của cột.
        maxColumnWidth: 40,
        color: "#4a69bd",
        //Trường dữ liệu trên trục x của biểu đồ, có thể là "day" hoặc "month" tùy theo thời gian được chọn.
        xField: timeType !== "year" ? "day" : "month",
        //Trường dữ liệu trên trục y của biểu đồ, là "spend" (tổng số tiền chi tiêu).
        yField: "spend",
        // Cấu hình trục y, bao gồm định dạng số liệu và kiểu hiển thị.
        yAxis: {
            label: {
                formatter: (v) =>
                    `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
                style: {
                    fill: "var(--text-color)",
                },
            },
        },
        //Cấu hình trục x, bao gồm định dạng số liệu, kiểu hiển thị và cỡ chữ.
        xAxis: {
            label: {
                autoRotate: false,
                style: {
                    fill: "var(--text-color)",
                    fontSize: 12,
                },
            },
        },
//Cấu hình cho dữ liệu metadata, bao gồm định danh ("alias") cho trường dữ liệu "spend".
        meta: {
            spend: {
                alias: "Chi tiêu",
            },
        },
//Cấu hình cho thanh cuộn (scrollbar) khi timeType là "month". Thanh cuộn cho phép người dùng cuộn qua các tháng nếu có nhiều dữ liệu.
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
//Tạo một bản sao của cấu hình ban đầu (config) và ghi đè giá trị cho thuộc tính scrollbar
    const finalConfig = { ...config, scrollbar: config.scrollbar() };
    // Biểu đồ sẽ hiển thị dữ liệu được xác định trong data và các cấu hình khác đã được thiết lập.
    return <Column {...finalConfig} />;
}

export default BarChar;
