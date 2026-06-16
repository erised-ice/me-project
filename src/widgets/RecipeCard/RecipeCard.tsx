import { ActionIcon, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import cx from 'classnames';
import { Link } from '@/shared/components';
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
    <Link className={cx(styles.card, className)} to={link}>
      <div className={cx(styles.imageWrapper)}>
        <img className={styles.image} src="public/pictures/cheese.png" alt="cheese" />
      </div>
      <div className={cx(styles.content)}>
        <h3 className={cx(styles.title)}>{title}</h3>
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
    </Link>
  );
};
