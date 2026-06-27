import cx from 'classnames';
import styles from './CategoryCard.module.scss';

type CategoryCardProps = {
  title: string;
  img: string;
  gradientNumber: number;
};

export const CategoryCard = ({ title, img, gradientNumber = 1 }: CategoryCardProps) => {
  const safeGradientNumber = gradientNumber > 0 && gradientNumber < 7 ? gradientNumber : 1;

  return (
    <div className={cx(styles.wrapper, styles[`gradient-${safeGradientNumber}`])}>
      <div className={cx(styles.imageWrapper)}>
        <img className={styles.image} src={img} alt={title} />
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};
