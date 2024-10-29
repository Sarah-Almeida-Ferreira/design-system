import { Input, InputProps } from "@lib/components/Input";
import type { Meta, StoryFn } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";

const meta = {
  title: "Example/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    type: "text",
    name: "text-input",
    placeholder: "Type text",
    label: "Text",
    value: "",
    id: "test",
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;

export const Template: StoryFn<InputProps> = (args: InputProps) => {
  const [value, setValue] = useState("");

  return (<Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />);
};
export const Text = Template.bind({});
Text.args = {
  id: "text-input",
  type: "text",
  placeholder: "Type your text",
  label: "Text",
};

export const Email = Template.bind({});
Email.args = {
  id: "email-input",
  type: "email",
  placeholder: "Type your e-mail",
  label: "E-mail",
};

export const Password = Template.bind({});
Password.args = {
  id: "password-input",
  type: "password",
  placeholder: "Type your password",
  label: "Password",
};
