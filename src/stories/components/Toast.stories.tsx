import type { Meta, StoryFn } from "@storybook/react";
import { fn } from "@storybook/test";
import { Toast, ToastProps } from "@lib/components/Toast";
import { useEffect, useState } from "react";

const meta = {
  title: "Example/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { message: "Toast", onClick: fn() },
} satisfies Meta<typeof Toast>;

export default meta;

export const Template: StoryFn<ToastProps> = (args: ToastProps) => {
  const [message, setMessage] = useState(args.message);

  useEffect(() => {
    setMessage(args.message);
  }, [args]);

  return (<Toast {...args} message={message} onClose={() => setMessage("")} />);
};

export const Info = Template.bind({});
Info.args = {
  type: "info",
  message: "This is an info toast."
};

export const Success = Template.bind({});
Success.args = {
  type: "success",
  message: "This is a success toast."
};

export const Danger = Template.bind({});
Danger.args = {
  type: "danger",
  message: "This is a danger toast."
};

export const Warning = Template.bind({});
Warning.args = {
  type: "warning",
  message: "This is an warning toast."
};
