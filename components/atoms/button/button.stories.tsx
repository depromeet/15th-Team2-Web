import type { Meta, StoryObj } from '@storybook/react';

import { css } from '@/styled-system/css';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={css({ margin: 10 })}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    disabled: {
      control: 'boolean',
    },
    variant: {
      control: { type: 'select', options: ['solid', 'outlined', 'text'] },
    },
    buttonType: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'assistive'],
      },
    },
    interaction: {
      control: {
        type: 'select',
        options: ['normal', 'hovered', 'focused', 'pressed'],
      },
    },
    label: {
      control: 'text',
    },
    leftIconSrc: {
      control: 'text',
    },
    rightIconSrc: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Label',
    size: 'large',
    interaction: 'normal',
  },
};

export const outlined: Story = {
  args: {
    ...Default.args,
    variant: 'outlined',
  },
};

export const text: Story = {
  args: {
    ...Default.args,
    variant: 'text',
  },
};
