import LinkWrapper from "components/LinkWrapper";
import Image from "next/image";

import * as S from "./style";

import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { useRouter } from "next/dist/client/router";

import { NextSeo } from "next-seo";

type ImageProps = {
  url: string;
  height: number;
  width: number;
};

export type PlacesTemplateProps = {
  place: {
    slug: string;
    name: string;
    description: {
      html: string
      text: string;
    };
    gallery: ImageProps[];
  };
};

export default function PlacesTemplate({ place }: PlacesTemplateProps) {
  const router = useRouter();

  if (router.isFallback) return null;

  return (
    <>
      <NextSeo
        title={`${place.name} - My Trips`}
        description={
          place.description?.text ||
          "A simple project to show in a map the places that I went and show more informations and photos when clicked."
        }
        canonical="https://mytrips.com"
        openGraph={{
          url: "https://mytrips.com",
          title: `${place.name} - My Trips`,
          description:
            place.description?.text ||
            "A simple project to show in a map the places that I went and show more informations and photos when clicked.",
          images: [
            {
              url: place.gallery[0].url,
              width: place.gallery[0].width,
              height: place.gallery[0].height,
              alt: `${place.name}`,
            },
          ],
        }}
      />
      <LinkWrapper href="/">
        <CloseOutline size={32} aria-label="Go back to map" />
      </LinkWrapper>

      <S.Wrapper>
        <S.Container>
          <S.Heading>
            <h1>{place.name}</h1>
          </S.Heading>
          <S.Body>
            <div
              dangerouslySetInnerHTML={{ __html: place.description?.html }}
            ></div>
          </S.Body>

          <S.Gallery>
            {place.gallery.map((image, index) => (
              <Image
                objectFit="cover"
                quality={75}
                key={`photo-${index}`}
                width="1000"
                height="600"
                src={image.url}
                alt={place.name}
              />
            ))}
          </S.Gallery>
        </S.Container>
      </S.Wrapper>
    </>
  );
}
