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
    <>
      {/* Mobile: square crop */}
      <div className="relative flex h-44 w-44 shrink-0 overflow-hidden rounded-full border border-surface bg-secondary shadow-xl sm:hidden">
        <Image
          src={profilePhoto}
          alt="Professional portrait of Lukas Bohez"
          fill
          priority
          placeholder="blur"
          blurDataURL={heroBlurDataURL}
          sizes="176px"
          className="object-cover object-[50%_18%]"
        />
      </div>

      {/* Tablet: medium square */}
      <div className="relative hidden h-52 w-52 shrink-0 overflow-hidden rounded-full border border-surface bg-secondary shadow-xl sm:flex lg:hidden">
        <Image
          src={profilePhoto}
          alt="Professional portrait of Lukas Bohez"
          fill
          priority
          placeholder="blur"
          blurDataURL={heroBlurDataURL}
          sizes="208px"
          className="object-cover object-[50%_20%]"
        />
      </div>

      {/* Desktop: landscape crop */}
      <div className="relative hidden h-64 w-64 shrink-0 overflow-hidden rounded-full border border-surface bg-secondary shadow-xl lg:flex">
        <Image
          src={profilePhoto}
          alt="Professional portrait of Lukas Bohez"
          fill
          priority
          placeholder="blur"
          blurDataURL={heroBlurDataURL}
          sizes="(max-width: 1280px) 208px, 256px"
          className="object-cover object-[50%_20%]"
        />
      </div>
    </>
  );
}
