import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./CharFind.scss";

const CharFind = () => {
    const [success, setSuccess] = useState();
    return (
        <Formik
            initialValues={{ charName: "" }}
            validationSchema={Yup.object({
                charName: Yup.string()
                    .min(2, "Minimum 2 characters")
                    .required("This field is required"),
            })}
            onSubmit={(values) => console.log(JSON.stringify(values.charName))}
        >
            <Form className="charFind">
                <div className="charFind__text">
                    Or find a character by name:
                </div>
                <Field
                    id="charName"
                    name="charName"
                    type="text"
                    placeholder="Enter name"
                />
                <button type="submit" className="button button__main">
                    <div className="inner">FIND</div>
                </button>
                <ErrorMessage
                    className="error"
                    name="charName"
                    component="div"
                />
            </Form>
        </Formik>
    );
};

// const SuccessMessage = () => {

// };

export default CharFind;
