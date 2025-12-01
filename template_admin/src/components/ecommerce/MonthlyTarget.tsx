import Chart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import {useEffect, useState} from "react";
import {MoreDotIcon} from "../../icons";
import {RevenueCategory} from "../../core/RevenueCategory.ts";
import {revenueByCategory} from "../../service/CategoriesService.ts";

export default function MonthlyTarget() {
    const [isOpen, setIsOpen] = useState(false);
    const [revenueCategory, setRevenueCategory] = useState<RevenueCategory[]>([]);
    const [series, setSeries] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        revenueByCategory().then((res) => {
            if (res.data) {
                setRevenueCategory(res.data);
                setSeries(res.data.map((item) => item.totalRevenue));
                setLabels(res.data.map((item) => item.categoryName));
            }
        });
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const closeDropdown = () => setIsOpen(false);

    const totalRevenue = series.reduce((sum, val) => sum + val, 0);

    const defaultIndex = series.length > 0 ? series.indexOf(Math.max(...series)) : -1;
    const shouldShowDefault = series.length === 1 || (series.length > 1 && Math.max(...series) / totalRevenue > 0.93);

    const displayIndex = hoveredIndex !== null ? hoveredIndex : (shouldShowDefault ? defaultIndex : -1);
    const displayValue = displayIndex !== -1 ? series[displayIndex] : totalRevenue;
    const displayLabel = displayIndex !== -1 ? labels[displayIndex] : "Tổng doanh thu";

    const options: ApexOptions = {
        chart: {
            type: "donut",
            fontFamily: "Outfit, sans-serif",
            toolbar: {show: false},
            events: {
                // Desktop: hover
                dataPointMouseEnter: (_: any, __: any, config: any) => {
                    setHoveredIndex(config.dataPointIndex);
                },
                dataPointMouseLeave: () => {
                    setHoveredIndex(null);
                },
                dataPointSelection: (_: any, __: any, config: any) => {
                    setHoveredIndex(prev => prev === config.dataPointIndex ? null : config.dataPointIndex);
                },
            },
        },
        labels: labels,
        colors: ["#465FFF", "#39B54A", "#FFB400", "#FF5C5C", "#7F3DFF"],
        legend: {
            position: "bottom",
            horizontalAlign: "center",
            labels: {colors: undefined},
            markers: {width: 12, height: 12, radius: 6},
            itemMargin: {horizontal: 12, vertical: 8},
        },

        tooltip: {enabled: false},

        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "#6b7280",
                            offsetY: -10,
                        },
                        value: {
                            show: true,
                            fontSize: "32px",
                            fontWeight: 700,
                            color: "#1f2937",
                            offsetY: 12,
                            formatter: (val) => `$${Number(val).toLocaleString()}`,
                        },
                        total: {
                            show: false,
                        },
                    },
                },
            },
        },

        annotations: displayIndex !== null || shouldShowDefault
            ? undefined
            : {
                position: "front",
                points: [],
            },

        dataLabels: {enabled: false},
        states: {
            hover: {filter: {type: "none"}},
            active: {allowMultipleDataPointsSelection: false},
        },
        responsive: [{
            breakpoint: 480,
            options: {legend: {position: "bottom"}}
        }],
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                            Thống kê theo danh mục
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Phân bổ doanh thu theo từng danh mục
                        </p>
                    </div>
                </div>

                <div className="mt-6 -mx-4">
                    <Chart
                        options={{
                            ...options,
                            plotOptions: {
                                ...options.plotOptions,
                                pie: {
                                    ...options.plotOptions?.pie,
                                    donut: {
                                        ...options.plotOptions?.pie?.donut,
                                        labels: {
                                            ...options.plotOptions?.pie?.donut?.labels,
                                            show: displayIndex !== -1 || shouldShowDefault,
                                            name: {...options.plotOptions?.pie?.donut?.labels?.name, show: true},
                                            value: {
                                                ...options.plotOptions?.pie?.donut?.labels?.value,
                                                formatter: () => `${displayValue.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}`,
                                            },
                                        },
                                    },
                                },
                            },
                        }}
                        series={series}
                        type="donut"
                        height={340}
                    />

                    {(displayIndex !== -1 || shouldShowDefault) && (
                        <div className="text-center -mt-20 pb-8 pointer-events-none">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {displayLabel}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}