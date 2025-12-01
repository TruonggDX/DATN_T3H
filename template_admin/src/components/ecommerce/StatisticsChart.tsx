import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import { RevenueStatistics } from "../../core/RevenueStatistics.ts";
import { revenueByDay, revenueByMonth, revenueByYear } from "../../service/OrderDetailService.ts";

type PeriodType = "day" | "month" | "year";

export default function StatisticsChart() {
  const [periodType, setPeriodType] = useState<PeriodType>("month");
  const [chartData, setChartData] = useState<{ categories: string[]; series: number[] }>({
    categories: [],
    series: [],
  });
  const [loading, setLoading] = useState(true);

  // Lấy thời gian hiện tại một lần để dùng chung
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 1-12

  // Format tiền VND đẹp
  const formatVND = (value: number) =>
      new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);

  // Tạo danh sách đầy đủ các khoảng thời gian (ngày/tháng/năm) và điền 0 nếu không có dữ liệu
  const generateFullPeriod = (type: PeriodType, dataMap: Map<string, number>) => {
    const categories: string[] = [];
    const values: number[] = [];

    if (type === "day") {
      // Luôn lấy đúng số ngày của tháng HIỆN TẠI (tự động xử lý 28/29/30/31 ngày + năm nhuận)
      const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        categories.push(`Ngày ${day}`);
        values.push(dataMap.get(dateStr) || 0);
      }
    }
    else if (type === "month") {
      for (let month = 1; month <= 12; month++) {
        const periodKey = `${currentYear}-${String(month).padStart(2, "0")}`;
        categories.push(`Tháng ${month}`);
        values.push(dataMap.get(periodKey) || 0);
      }
    }
    else if (type === "year") {
      // Hiển thị 6 năm gần nhất (bao gồm năm hiện tại)
      for (let year = currentYear - 5; year <= currentYear; year++) {
        categories.push(`Năm ${year}`);
        values.push(dataMap.get(String(year)) || 0);
      }
    }

    return { categories, values };
  };

  // Fetch dữ liệu theo loại
  const fetchAndProcess = async (type: PeriodType) => {
    setLoading(true);
    try {
      let rawData: RevenueStatistics[] = [];

      const res =
          type === "day" ? await revenueByDay() :
              type === "month" ? await revenueByMonth() :
                  await revenueByYear();

      if (res?.code === 200 && Array.isArray(res.data)) {
        rawData = res.data;
      }

      // Chuyển sang Map để dễ tra cứu
      const dataMap = new Map<string, number>();
      rawData.forEach((item) => {
        dataMap.set(item.period, item.totalRevenue);
      });

      const { categories, values } = generateFullPeriod(type, dataMap);
      setChartData({ categories, series: values });
    } catch (err) {
      console.error("Lỗi tải dữ liệu thống kê:", err);
      const empty = generateFullPeriod(type, new Map());
      setChartData({ categories: empty.categories, series: empty.values });
    } finally {
      setLoading(false);
    }
  };

  // Gọi lại khi đổi tab
  useEffect(() => {
    fetchAndProcess(periodType);
  }, [periodType]);

  // Cấu hình biểu đồ ApexCharts
  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 380,
      fontFamily: "Outfit, sans-serif",
      toolbar: { show: false },
      animations: { enabled: true, easing: "easeinout", speed: 800 },
    },
    colors: ["#6366F1"],
    stroke: { curve: "smooth", width: 3 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 5,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    markers: {
      size: 5,
      hover: { size: 7 },
      colors: ["#6366F1"],
      strokeColor: "#fff",
      strokeWidth: 3,
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: { fontSize: "13px", fontWeight: 500, colors: "#6B7280" },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (value) => formatVND(value),
        style: { fontSize: "12px", colors: "#6B7280" },
      },
    },
    tooltip: {
      y: { formatter: (value) => formatVND(value) },
      x: {
        formatter: (_, { dataPointIndex }) => chartData.categories[dataPointIndex] || "",
      },
    },
    noData: {
      text: loading ? "Đang tải dữ liệu..." : "Chưa có dữ liệu doanh thu",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: { color: "#9CA3AF", fontSize: "16px" },
    },
  };

  const series = [{ name: "Doanh thu", data: chartData.series }];

  const totalRevenue = chartData.series.reduce((sum, val) => sum + val, 0);

  return (
      <div className="rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 p-6 shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Thống kê doanh thu
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {periodType === "day" && `Tháng ${currentMonth}/${currentYear}`}
              {periodType === "month" && `Năm ${currentYear}`}
              {periodType === "year" && "6 năm gần nhất"}
            </p>
          </div>

          {/* Tabs chuyển đổi */}
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl shadow-sm">
            {(["day", "month", "year"] as const).map((key) => (
                <button
                    key={key}
                    onClick={() => setPeriodType(key)}
                    className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                        periodType === key
                            ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-md"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                >
                  {key === "day" ? "Ngày" : key === "month" ? "Tháng" : "Năm"}
                </button>
            ))}
          </div>
        </div>

        {/* Loading overlay */}
        {loading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
              <div className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg animate-pulse">
                Đang tải biểu đồ...
              </div>
            </div>
        )}

        {/* Biểu đồ */}
        <div className="relative">
          <Chart options={options} series={series} type="area" height={380} />
        </div>

        {/* Tổng doanh thu */}
        {!loading && totalRevenue > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400 font-medium">
            Tổng doanh thu{" "}
            {periodType === "day" ? "tháng này" : periodType === "month" ? "năm nay" : "hiển thị"}
          </span>
              <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {formatVND(totalRevenue)}
          </span>
            </div>
        )}
      </div>
  );
}