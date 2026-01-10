export interface NavLink {
  label: string;
  href: string;
}

export interface SliderImage {
    id: string;
    src: string;
    alt: string;

}

export interface SocialLink {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  flyerUrl: string;
  description?: string;
}

export interface Artist {
  id: string
  name: string
  genre: string
  image: string
  socials?: {
    spotify?: string
    soundcloud?: string
    instagram?: string
  }
}

export interface BaseProps {
  className?: string
  children?: React.ReactNode
}