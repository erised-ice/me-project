import { Center, Loader as MantineLoader } from '@mantine/core';

export const LoaderBlock = () => {
  return (
    <Center py="xl">
      <MantineLoader color="cyan" />
    </Center>
  );
};
