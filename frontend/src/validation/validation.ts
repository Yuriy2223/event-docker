import * as yup from "yup";

export const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(
      /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ'’\-\s]+$/,
      " Сan contain only letters, spaces, apostrophes or hyphens"
    )
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be at most 50 characters")
    .required("Full name is required"),

  email: yup
    .string()
    .email("Email is invalid")
    .max(100, "Email is too long")
    .required("Email is required"),

  dob: yup
    .date()
    .typeError("Invalid date format")
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required"),

  referral: yup
    .string()
    .oneOf(["Social media", "Friends", "Found myself"], "Invalid source")
    .required("Please select a source"),
});
