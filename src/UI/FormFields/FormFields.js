import React from 'react'
import FormField from "./FormField"

export default function FormFields({ loginForm, onChange }) {

    return (
        <>
            {
                loginForm.map(({ value, type, label }, key) => <FormField {...{
                    index: key,
                    type,
                    label,
                    key,
                    onChange,
                    value
                }} />)
            }
        </>
    )


}
