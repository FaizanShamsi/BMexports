import React, { ChangeEvent, useState } from "react";
import SelectGroupTwo from "../SelectGroup/SelectGroupTwo";

interface Props {
  inputHeading?: string;
  inputPlaceholder?: string;
  dropdownHeading?: string;
  onChangeInput?: (e: any) => void;
  onChangeImage?: (e: any) => void;
  onButtonClick?: () => void;
  setSelectedOption?: (e: any) => void;
  selectedOption?: string;
  imageHeading?: string;
  value?: string;
}
const AddDataContent: React.FC<Props> = ({
  inputHeading,
  inputPlaceholder,
  onChangeInput,
  onChangeImage,
  onButtonClick,
  dropdownHeading,
  imageHeading,
  selectedOption,
  setSelectedOption,
  value,
}) => {
  return (
    <div className=" p-4 ">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:w-full md:w-180">
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              {inputHeading}
            </label>
            <input
              value={value}
              type="text"
              onChange={onChangeInput}
              placeholder={inputPlaceholder}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          {/* <div className="flex flex-col gap-5.5 p-6.5"> */}
          {imageHeading && (
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                {imageHeading}
              </label>
              <input
                onChange={onChangeImage}
                type="file"
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </div>
          )}
          {dropdownHeading && (
            <SelectGroupTwo
              selectedOption={selectedOption ? selectedOption : ""}
              setSelectedOption={
                setSelectedOption ? setSelectedOption : () => {}
              }
              heading={dropdownHeading}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          )}
          {/* </div> */}

          <button
            className="flex w-full justify-center rounded bg-[#f90606] p-3 font-medium text-gray hover:bg-opacity-90"
            // className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            onClick={onButtonClick}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDataContent;
