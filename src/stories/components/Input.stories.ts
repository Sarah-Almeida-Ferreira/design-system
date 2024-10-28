import { Input } from "@lib/components/Input";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

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
    value: "",
    id: "test",
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Template: Story = {
  args: {
    id: "default-input",
    value: "Text",
    label: "Text input",
    onChange: fn(),
  },
};

export const Text = {
  args: {
    id: "text-input",
    type: "text",
    value: "",
    placeholder: "Text input",
    label: "Text",
    onChange: fn(),
  },
};

export const Email = {
  args: {
    id: "email-input",
    type: "email",
    value: "",
    placeholder: "E-mail input",
    label: "E-mail",
    onChange: fn(),
  },
};

export const Password = {
  args: {
    id: "password-input",
    type: "password",
    value: "",
    placeholder: "Password input",
    label: "Password",
    onChange: fn(),
  },
};
