import {
  SegmentedControl as MantineSegmentedControl,
  type SegmentedControlProps as MantineSegmentedControlProps,
} from '@mantine/core';

type SegmentedControlProps = MantineSegmentedControlProps;

export const SegmentedControl = ({ ...props }: SegmentedControlProps) => {
  return <MantineSegmentedControl color="cyan" radius="md" size="sm" {...props} />;
};
