import { Card as MantineCard, type CardProps as MantineCardProps } from "@mantine/core";

type CardProps = MantineCardProps & {
  link: string;
}

export const Card = ({link, ...props}: CardProps) => {
  return (
    <MantineCard {...props} shadow="sm" padding="lg" withBorder /*orientation="horizontal"*/ >
      <MantineCard.Section component="a" href={link}>
        Image
      </MantineCard.Section>

    </MantineCard>
  )
}