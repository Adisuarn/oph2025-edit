// import { Field, ErrorMessage } from 'Formik'
// import React from 'react'


// interface RadioButtonsProps {
//     label: string;
//     name: string;
//     options: { key: string; value: string }[];
//     [key: string]: any;
// }

// // const RadioButtoxns: React.FC<RadioButtonsProps> = (props) => {
//     const { label, name, options, ...rest } = props;
//     return (
//         <div>
//             <label htmlFor={name}>{label}</label>
//             <Field name={name} {...rest}>
//                 {({ field }: { field: any }) => {
//                     return options.map(option => (
//                         <React.Fragment key={option.key}>
//                             <input
//                                 type="radio"
//                                 id={option.value}
//                                 {...field}
//                                 value={option.value}
//                                 checked={field.value === option.value}
//                             />
//                             <label htmlFor={option.value}>{option.key}</label>
//                         </React.Fragment>
//                     ));
//                 }}
//             </Field>
//             <ErrorMessage name={name} />
//         </div>
//     );
// };

// export default RadioButtons;