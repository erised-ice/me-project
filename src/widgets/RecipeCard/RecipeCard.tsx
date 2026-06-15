import { ActionIcon, Paper, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import cx from 'classnames';
import { Link, Title } from '@/shared/components';
import styles from './RecipeCard.module.scss';

type CardProps = {
  link: string;
  title: string;
  instruction: string;
  canDelete?: boolean;
  onDelete?: () => void;
  deleteAriaLabel: string;
  className?: string;
};

export const RecipeCard = ({
  link,
  title,
  instruction,
  canDelete,
  onDelete,
  deleteAriaLabel,
  className,
}: CardProps) => {
  return (
    <Paper radius="md" withBorder className={cx(styles.card, className)}>
      <Link className={cx(styles.imageWrapper)} to={link}></Link>
      <div className={cx(styles.content)}>
        <Title className={cx(styles.title)} order={3}>
          {title}
        </Title>
        <Text className={cx(styles.text)}>{instruction}</Text>
      </div>
      {canDelete && (
        <ActionIcon
          className={cx(styles.button)}
          onClick={onDelete}
          color="red"
          variant="light"
          aria-label={deleteAriaLabel}
        >
          <IconTrash size={18} />
        </ActionIcon>
      )}
    </Paper>
  );
};
