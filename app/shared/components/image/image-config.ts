export interface CustomImageConfig {
    src: string;
    alt: string;
    width: string;
    height: string;
    class: string;
    fallback: string; // Optional default fallback
    loading: 'lazy' | 'eager';

}
