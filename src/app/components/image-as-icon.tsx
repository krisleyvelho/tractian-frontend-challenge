import Image, { StaticImageData } from 'next/image';

interface ImageAsIconProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  icon: StaticImageData;
}

export function ImageAsIcon({ icon, ...props }: ImageAsIconProps) {
  return (
    <Image
      src={icon.src}
      alt="icon"
      width={icon?.width as any}
      height={icon?.height as any}
      {...props}
    />
  );
}
