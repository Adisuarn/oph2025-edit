// import { Field, ErrorMessage } from 'Formik'
// //import TextError from './TextError'

// interface SelectProps {
//     name: string;
//     options: { key: string; value: string }[];
//     [key: string]: any;
// }

// const Select: React.FC<SelectProps> = (props) => {
//     const { name, options, ...rest } = props
//   return (
//     <div>
//         <Field as='select' id={name} name={name} {...rest}>
//             {
//                 // options.map((option) => {
//                     return (
//                         <option key={option.value} value={option.value} className=' bg-emerald-200 rounded-xl'>
//                             {option.key}
//                         </option>
//                     )
//                 })
//             }
//         </Field>
//         <ErrorMessage name={name}  />
//     </div>
//   )
// }

// export default Select