import React from "react";

import { Button, Text } from "components";

const PricingscreenPage = () => {
  return (
    <>
      <div className="bg-blue-A700 flex flex-col font-urbanist gap-[53px] items-center justify-start mx-auto p-[89px] md:px-10 sm:px-5 w-full">
        <Text
          className="sm:text-4xl md:text-[42px] text-[46px] text-white-A700"
          size="txtUrbanistRomanBlack46"
        >
          Our Software is free
        </Text>
        <div className="bg-gray-900 border border-solid flex flex-col items-center justify-start mb-[127px] p-[15px] md:px-5 rounded-[9px] w-[31%] md:w-full white_A700_8c_black_900_00_border">
          <Text
            className="text-base text-center text-white-A700 w-[56%] sm:w-full"
            size="txtUrbanistRomanBlack16"
          >
            But you can pay what you can afford
          </Text>
          <Button className="cursor-pointer font-bold leading-[normal] min-w-[178px] mt-[312px] text-center text-sm">
            Process Payment
          </Button>
          <div className="flex flex-col h-[54px] md:h-auto items-start justify-start mb-1.5 mt-[31px] w-auto">
            <Text
              className="leading-[18.00px] text-blue_gray-400_99 text-center text-xs"
              size="txtUrbanistRomanRegular12"
            >
              <span className="text-blue_gray-400 font-urbanist text-[10.5px] font-bold">
                <>
                  Payment Terms and Conditions
                  <br />
                </>
              </span>
              <span className="text-blue_gray-400 font-urbanist text-[8.25px] font-normal">
                By utilizing our payment services, you agree to the following
                terms and conditions
              </span>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingscreenPage;
