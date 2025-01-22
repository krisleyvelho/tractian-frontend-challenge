import Image, { StaticImageData } from 'next/image';

interface ImageAsIconProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> {
  icon: StaticImageData;
}

export function ImageAsIcon({ icon, ...props }: ImageAsIconProps) {
  if (typeof icon.width !== 'number' || typeof icon.height !== 'number') {
    throw new Error('The icon must have numeric width and height properties.');
  }

  return <Image src={icon} alt={''} {...props} />;
}
