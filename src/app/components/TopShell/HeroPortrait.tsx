import Image from 'next/image';

import profilePhoto from '../../../../WIN_20260329_16_44_00_Pro.jpg';

const heroBlurDataURL =
  'https://res.cloudinary.com/dmefzpaea/image/upload/f_blur:2000,e_grayscale,q_1,w_20/v1776524472/portfolio/profile/lukas-portrait';

/**
 * Hero portrait with responsive art direction:
 * - Mobile (sm): square crop, face-centered
 * - Desktop (lg): landscape crop
 */
export function HeroPortrait() {
  return (
    <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-full border border-surface bg-secondary shadow-xl sm:h-52 sm:w-52 lg:h-64 lg:w-64">
      <Image
        src={profilePhoto}
        alt="Professional portrait of Lukas Bohez"
        fill
        priority
        placeholder="blur"
        blurDataURL={heroBlurDataURL}
        sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 256px"
        className="object-cover object-[50%_20%]"
      />
    </div>
  );
}
