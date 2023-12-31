import React from 'react'
import style from './FormsControls.module.css'
import { Field, WrappedFieldProps, BaseFieldProps, WrappedFieldMetaProps } from 'redux-form';
import { FieldValidatorType } from '../../../utils/validators/validators';

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}

const FormControl: React.FC<FormControlPropsType> = ({ meta: { touched, error } , children}) => {
    const hasError = error && touched;
    
    return (
        <div className={style.formControl + " " + (hasError ? style.error : "")} >

            <div>{children}</div>

            {hasError && <span>{error} </span>}
        </div>
    )
}


export const Textarea: React.FC<WrappedFieldProps > = (props) => {
    const { input, meta,  ...restProps } = props;

    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}


// const funcName= <T extends string> (name: T) =>{...}

export const createField = <NameEnum extends string>(placeholder: string | undefined,
    name: NameEnum,
    validators: Array<FieldValidatorType>,
    component: React.FC<WrappedFieldProps>,
    props = {},
    text = "") => {

    return (
        <div>
            <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props} /> {text}
        </div>
    )
}