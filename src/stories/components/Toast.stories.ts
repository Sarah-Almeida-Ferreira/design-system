import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Toast } from "@lib/components/Toast";

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
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    type: "info",
    message: "Info Toast",
  },
};

export const Success: Story = {
  args: {
    type: "success",
    message: "Success Toast",
  },
};

export const Danger: Story = {
  args: {
    type: "danger",
    message: "Danger Toast",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    message: "Warning Toast",
  },
};
