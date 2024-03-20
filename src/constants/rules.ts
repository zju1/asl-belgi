import { Rule } from "../@types";

export const requiredRule: Rule = {
  required: {
    value: true,
    message: "required",
  },
};

export const maxRule = (value: number): Rule => ({
  maxLength: {
    value,
    message: `maxLen-${value}`,
  },
});

export const emailRule: Rule = {
  pattern: {
    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
    message: "invalidEmail",
  },
};
