import React from "react";
import "./App.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordErrorMessage from "";
import { validateEmail } from "./utils/emailUtil";

function App() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "role",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string(), // Opsiyonel
      email: Yup.string()
        .required("Email is required")
        .test("is-valid", "Invalid email", validateEmail),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      role: Yup.string().notOneOf(["role"], "Please select a role"),
    }),
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
  });

  return (
    <div className="App">
      <form onSubmit={formik.handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>

          <div className="Field">
            <label>
              First name <sup>*</sup>
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="Error">{formik.errors.firstName}</div>
            )}
          </div>

          <div className="Field">
            <label>Last name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
          </div>

          <div className="Field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="Error">{formik.errors.email}</div>
            )}
          </div>

          <div className="Field">
            <label>
              Password <sup>*</sup>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <PasswordErrorMessage />
            ) : null}
          </div>

          <div className="Field">
            <label>
              Role <sup>*</sup>
            </label>
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <div className="Error">{formik.errors.role}</div>
            )}
          </div>

          <button type="submit" disabled={!formik.isValid || !formik.dirty}>
            Create account
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
