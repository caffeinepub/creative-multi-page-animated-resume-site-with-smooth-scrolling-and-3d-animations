import { useUploads } from '../onboarding/UploadsContext';

export default function ProfilePhotoCard() {
  const { profilePhoto } = useUploads();
  const photoSrc = profilePhoto || '/assets/generated/profile-photo.dim_800x800.png';

  return (
    <div className="relative">
      <div className="relative rounded-2xl overflow-hidden border-4 border-accent/20 shadow-2xl">
        <img
          src={photoSrc}
          alt="Profile"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>
      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
    </div>
  );
}
