import chainCoing from '@/chainConfig';
import useStyles from '@/components/ChainIcon/useStyles';
import Image, { type ImageProps } from 'next/image';
import nucleusIconLight from 'shared-utils/assets/icons/nucleus-light.svg?url';
import nucleusIconDark from 'shared-utils/assets/icons/nucleus-dark.svg?url';

interface IconProps extends Omit<ImageProps, 'id' | 'src'> {
  type: 'icon' | 'logo';
  chainName?: string;
}

const ChainIcon = ({
  className,
  type,
  chainName = chainCoing().chainName,
  ...props
}: IconProps) => {
  const { classes, cx } = useStyles();

  let [iconDark, iconLight] =
    type === 'icon' ? [nucleusIconLight, nucleusIconDark] : [nucleusIconLight, nucleusIconDark];
  switch (chainName) {
    case 'nucleus':
      [iconDark, iconLight] =
        type === 'icon'
          ? [nucleusIconDark, nucleusIconLight]
          : [nucleusIconDark, nucleusIconLight]
      break;
    default:
      throw new Error(`chain ${chainName} not supported`);
  }
  return (
    <span className={cx(className, classes.container)}>
      <Image width={0} height={0} src={iconDark} {...props} className={classes.dark} unoptimized />
      <Image
        width={0}
        height={0}
        src={iconLight}
        {...props}
        className={classes.light}
        unoptimized
      />
    </span>
  );
};

export default ChainIcon;
