import React from 'react'
import style from './FormsControls.module.css'
import { WrappedFieldProps } from 'redux-form';


export const Textarea: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {

    const hasError = meta.error && meta.touched;

    return (
        <div className={style.formControl + " " + (hasError ? style.error : "")} >
            <div><textarea  {...input} {...props} /></div>
            {hasError && <span>{meta.error} </span>}
        </div>
    )
}