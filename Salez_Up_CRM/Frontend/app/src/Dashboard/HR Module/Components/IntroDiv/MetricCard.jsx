import React from 'react';

const MetricCard = ({ imageSrc, value, label, suffix, prefix, width, height  }) => {
  return (
    <div className="bg-[#F7F7FF] rounded-lg flex flex-col items-center justify-center w-[22%] h-[120px]">
      <div className="text-gray-600">
        <img src={imageSrc} alt={label} className={`${width} ${height} mb-1.5`} />
      </div>
      <div className="flex items-center">
        {prefix && <span className="text-lg text-black/90">{prefix}</span>}
        <span className="text-md">{value}</span>
        {suffix && <span className="font-poppins font-normal text-lg leading-[22.5px] tracking-[1%] text-black/90 text-center ml-1">{suffix}</span>}
      </div>
      <div className="font-lato font-normal text-[12.81px] leading-[15.37px] tracking-[1%] text-[#000080]">{label}</div>
    </div>
  );
};

export const MetricCards = () => {
    
  const metrics = [
    { imageSrc: "/images/hr_dashboard_img/head_count.png", value: "1750", label: "Head count", width: "w-[35.14px]", height: "h-[35.14px]" },
    { imageSrc: "/images/hr_dashboard_img/average_tenure.png", value: "1.2", label: "Average Tenure", suffix: "years", width: "w-[25px]", height: "h-[27.27px]" },
    { imageSrc: "/images/hr_dashboard_img/1_warning.png", value: "175", label: "1st Warnings", suffix: "/6%", width: "w-[28.29px]", height: "h-[28.29px]" },
    { imageSrc: "/images/hr_dashboard_img/final_warning.png", value: "87", label: "Final Warnings", suffix: "/3%", width: "w-[27.67px]", height: "h-[25.86px]" },
    { imageSrc: "/images/hr_dashboard_img/commission.png", value: "3.8m", prefix: "R", label: "Commissions", width: "w-[35.14px]", height: "h-[35.14px]" },
    { imageSrc: "/images/hr_dashboard_img/incentives.png", value: "750k", prefix: "R", label: "Incentives", width: "w-[25.42px]", height: "h-[24.02px]" },
    { imageSrc: "/images/hr_dashboard_img/average_commisions.png", value: "5600", prefix: "R", label: "Average Commission", width: "w-[27.07px]", height: "h-[26.07px]" },
    { imageSrc: "/images/hr_dashboard_img/average_tenure.png", value: "65", label: "Absence days", width: "w-[28px]", height: "h-[30px]" }
  ];


  return (
    <div className="flex flex-wrap justify-between gap-4 p-6">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          imageSrc={metric.imageSrc}
          value={metric.value}
          label={metric.label}
          suffix={metric.suffix}
          prefix={metric.prefix}
          width={metric.width}
          height={metric.height}
        />
      ))}
    </div>
   
  );
};

export default MetricCards;
