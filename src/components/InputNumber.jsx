import React, {forwardRef} from 'react';
import './InputNumber.module.css'

const InputNumber = forwardRef(({label = 'LABEL', error = false, errorMsg = 'Error', ...props}, ref) => {
  return (
    <div className={'space-y-2 lg:w-32 w-full'}>
      <label className={'font-semibold text-gray-500 uppercase block text-xs tracking-widest'}>
        {label}
      </label>
      <input
        ref={ref}
        type={'number'}
        inputMode={'numeric'}
        className={'caret-purple-800 outline-none border rounded border-gray-200 p-3 font-bold text-lg w-full hover:border-purple-400 active:border-gray-100 focus:border-purple-500 transition-all'}
        {...props}
      />
      {
        error && <p className={'italic text-xs text-pink-600'}>{errorMsg}</p>
      }
    </div>
  );
})

export default InputNumber;