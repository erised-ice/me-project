import { ActionIcon } from '@mantine/core';
import { IconStopwatch, IconToolsKitchen2, IconTrash } from '@tabler/icons-react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
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
  canDelete,
  onDelete,
  deleteAriaLabel,
  className,
}: CardProps) => {
  const { t } = useTranslation();

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
        <div className={styles.tips}>
          <IconStopwatch />
          <span className={styles.tipText}>time</span>
          <IconToolsKitchen2 />
          <span className={styles.tipText}>{t(`mainPage.categories.other`)}</span>
        </div>
      </div>
    </div>
  );
};
