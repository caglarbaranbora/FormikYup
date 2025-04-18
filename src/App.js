import "./App.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordErrorMessage from "./components/PasswordMessage";

export default function App() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "role",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "Password must be 8 characters or more")
        .required("Required"),
      role: Yup.string()
        .oneOf(["individual", "business"], "Select a valid role")
        .required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      alert("Account Created!");
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
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="FieldError">{formik.errors.firstName}</div>
            ) : null}
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
            {formik.touched.email && formik.errors.email ? (
              <div className="FieldError">{formik.errors.email}</div>
            ) : null}
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
            {formik.touched.role && formik.errors.role ? (
              <div className="FieldError">{formik.errors.role}</div>
            ) : null}
          </div>

          <button type="submit" disabled={!formik.isValid || !formik.dirty}>
            Create account
          </button>
        </fieldset>
      </form>
    </div>
  );
}
