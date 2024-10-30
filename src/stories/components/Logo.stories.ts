import type { Meta, StoryObj } from "@storybook/react";
import { Logo, LogoProps } from "@lib/components/Logo";

const meta = {
  title: "Example/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<LogoProps>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Emblem: Story = {
  args: {
    type: "emblem",
  },
};

export const Title: Story = {
  args: {
    type: "title",
  },
};

export default meta;
