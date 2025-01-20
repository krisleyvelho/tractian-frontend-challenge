import Image, { StaticImageData } from "next/image";

export function SvgImage({svg}: {svg: StaticImageData}) {
  return (
    <Image
        src={svg.src}
        width={20}
        height={1}
        alt="svg icon"
      />
    
  );
}