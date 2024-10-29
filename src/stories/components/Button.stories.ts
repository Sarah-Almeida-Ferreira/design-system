import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "@lib/components/Button";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { label: "Button", onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "Primary button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Large button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Small button",
  },
};

export const TextOnly: Story = {
  args: {
    textOnly: true,
    label: "Text only button",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: "Full width button",
  },
};
