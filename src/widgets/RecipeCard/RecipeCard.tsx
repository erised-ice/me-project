import { ActionIcon, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import cx from 'classnames';
import { Link } from '@/shared/components';
import { getRandomNumber } from '@/shared/utils.ts';
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

const recipeCardPictureAmount = 6;

export const RecipeCard = ({
  link,
  title,
  instruction,
  canDelete,
  onDelete,
  deleteAriaLabel,
  className,
}: CardProps) => {
  const recipeCardPictureNumber = getRandomNumber(1, recipeCardPictureAmount);
  const safeRecipeCardPictureNumber =
    recipeCardPictureNumber === 'error' ? 1 : recipeCardPictureNumber;
  const recipeCardPictureAddress = `/pictures/category-${safeRecipeCardPictureNumber}.png`;

  return (
    <div className={cx(styles.card, className)}>
      <Link className={cx(styles.imageWrapper)} to={link}>
        <img className={styles.image} src={recipeCardPictureAddress} alt="cheese" />
      </Link>
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
    </div>
  );
};
