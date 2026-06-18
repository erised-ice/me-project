import {
  SegmentedControl as MantineSegmentedControl,
  type SegmentedControlProps as MantineSegmentedControlProps,
} from '@mantine/core';
import styles from './SegmentedControl.module.scss';

type SegmentedControlProps = MantineSegmentedControlProps;

export const SegmentedControl = ({ ...props }: SegmentedControlProps) => {
  return (
    <MantineSegmentedControl
      classNames={{
        label: styles.label,
      }}
      bg="#fff"
      color="#262626"
      size="md"
      radius="xl"
      {...props}
    />
  );
};
