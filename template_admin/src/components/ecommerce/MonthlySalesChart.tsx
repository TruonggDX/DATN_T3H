import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import { RevenueBrand } from "../../core/RevenueBrand.ts";
import { revenueByBrand } from "../../service/BrandService.ts";
import { RevenuePayment } from "../../core/RevenuePayment.ts";
import { revenueByPayment } from "../../service/PaymentService.ts";

export default function MonthlySalesChart() {
  const [brands, setBrands] = useState<RevenueBrand[]>([]);
  const [payments, setPayments] = useState<RevenuePayment[]>([]);

  useEffect(() => {
    revenueByBrand().then((res) => setBrands(res.data));
    revenueByPayment().then((res) => setPayments(res.data));
  }, []);

  const DonutChart = ({
                        data,
                        title,
                      }: {
    data: { id?: number; name: string; totalRevenue: number }[];
    title: string;
  }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const series = data.map((d) => d.totalRevenue);
    const labels = data.map((d) => d.name);

    const displayIndex = hoveredIndex;
    const displayValue = displayIndex !== null ? series[displayIndex] : null;
    const displayLabel = displayIndex !== null ? labels[displayIndex] : null;

    const options: ApexOptions = {
      chart: {
        type: "donut",
        fontFamily: "Outfit, sans-serif",
        toolbar: { show: false },
        events: {
          dataPointMouseEnter: (_: any, __: any, config: any) => setHoveredIndex(config.dataPointIndex),
          dataPointMouseLeave: () => setHoveredIndex(null),
        },
      },
      labels,
      colors: ["#465FFF", "#39B54A", "#FFB400", "#FF5C5C", "#9B5DE5", "#F15BB5", "#00BBF9", "#00C49A", "#FF8042"],
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "13px",
        height: 120, // cao hơn để chứa nhiều item
        offsetY: 0,
        labels: { useSeriesColors: true },
        itemMargin: { horizontal: 6, vertical: 3 },
        scroll: { enabled: true },
      },
      tooltip: { enabled: false },
      plotOptions: {
        pie: {
          donut: {
            size: "75%", // lớn hơn để chart to ra
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "16px", // lớn hơn
                fontWeight: 600,
                color: "#6b7280",
                offsetY: -10,
                formatter: () => (displayLabel ? displayLabel : title),
              },
              value: {
                show: true,
                fontSize: "20px", // lớn hơn
                fontWeight: 700,
                color: "#1f2937",
                offsetY: 10,
                formatter: () => (displayValue !== null ? displayValue.toLocaleString("vi-VN") + " VNĐ" : ""),
              },
            },
          },
        },
      },
      dataLabels: { enabled: false },
      states: { hover: { filter: { type: "none" } } },
    };

    return (
        <div className="flex flex-col items-center">
          <Chart options={options} series={series} type="donut" height={300} /> {/* tăng height */}
        </div>
    );
  };

  return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-5 pt-5 sm:px-6 sm:pt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
            Doanh thu theo thương hiệu và phương thức thanh toán
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 pb-6"> {/* tăng gap */}
            <DonutChart
                data={brands.map(b => ({ id: b.brandId, name: b.brandName, totalRevenue: b.totalRevenue }))}
                title="Thương hiệu"
            />
            <DonutChart
                data={payments.map(p => ({ id: p.paymentId, name: p.paymentName, totalRevenue: p.totalRevenue }))}
                title="Phương thức thanh toán"
            />
          </div>
        </div>
      </div>
  );
}
