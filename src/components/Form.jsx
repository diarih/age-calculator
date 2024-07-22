import React from 'react';
import InputNumber from "./InputNumber.jsx";
import {useForm} from "react-hook-form";
import ArrowIcon from "../assets/icon-arrow.svg";


const isValidDate = (day, month, year) => {
  if (!month || !year) return true;
  const lastDay = new Date(year, month, 0).getDate();
  return day >= 1 && day <= lastDay;
};

const Form = ({onSubmitForm}) => {

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm()

  const onSubmit = (e) => {
    onSubmitForm(e)
  }

  const month = watch('month');
  const year = watch('year');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex gap-6 lg:mr-24'}>
        <InputNumber
          {...register("day", {
            required: "The field is required",
            min: {value: 1, message: "Day must be at least 1"},
            max: {value: 31, message: "Day cannot be more than 31"},
            validate: value => {
              return isValidDate(value, month, year) || "Invalid day for the given month and year"
            }
          })}
          label={'Day'}
          placeholder={'DD'}
          error={errors.day}
          errorMsg={errors.day && errors.day.message}
        />
        <InputNumber
          {...register("month", {
            required: "The field is required",
            min: {value: 1, message: "Month must be at least 1"},
            max: {value: 12, message: "Month cannot be more than 12"}
          })}
          label={'Month'}
          placeholder={'MM'}
          error={errors.month}
          errorMsg={errors.month && errors.month.message}
        />
        <InputNumber
          {...register("year", {
            required: "The field is required",
            min: {value: 1900, message: "Year must be at least 1900"},
            max: {value: new Date().getFullYear(), message: `Year cannot be more than ${new Date().getFullYear()}`}
          })}
          label={'Year'}
          placeholder={'YYYY'}
          error={errors.year}
          errorMsg={errors.year && errors.year.message}
        />
      </div>
      <div className="relative flex lg:justify-end justify-center items-center mt-8 lg:mt-0">
        <button className="relative z-10 bg-purple-600 inline-block p-4 rounded-full hover:bg-black transition-all">
          <img className="lg:h-12 lg:w-12 h-4 w-4" src={ArrowIcon}/>
        </button>
        <hr className="absolute w-full top-1/2 transform -translate-y-1/2 z-0"/>
      </div>
    </form>
  );
};

export default Form;