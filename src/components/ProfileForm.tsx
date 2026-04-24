import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from './FormInput';
import { profileSchema, ProfileFormData } from '@/utils/validation';
import { notify } from '@/utils/notifications';

interface ProfileFormProps {
  initialData?: Partial<ProfileFormData>;
  onSubmit?: (data: ProfileFormData) => Promise<void>;
}

export default function ProfileForm({ initialData, onSubmit }: ProfileFormProps) {
  const initialValues: ProfileFormData = {
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    bio: initialData?.bio || '',
    website: initialData?.website || '',
    location: initialData?.location || '',
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: initialValues,
  });

  const bioValue = watch('bio') || '';

  const handleFormSubmit = async (data: ProfileFormData) => {
    if (onSubmit) {
      await onSubmit(data);
      notify.success("Profile Updated", "Your profile information has been saved successfully.");
    }
  };

  return (
    <div className="rounded-2xl border border-border-primary bg-background-primary/30 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-text-primary">Profile Information</h2>
        <p className="mt-1 text-sm text-text-muted">
          Update your personal information and profile details.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            {...register('firstName')}
            id="firstName"
            label="First Name"
            required
            error={errors.firstName}
          />
          
          <FormInput
            {...register('lastName')}
            id="lastName"
            label="Last Name"
            required
            error={errors.lastName}
          />
        </div>

        <FormInput
          {...register('email')}
          id="email"
          type="email"
          label="Email Address"
          required
          error={errors.email}
          helperText="We'll never share your email with anyone else."
        />

        <div>
          <label htmlFor="bio" className="block text-xs font-medium text-text-secondary mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            {...register('bio')}
            rows={4}
            className={`
              w-full rounded-xl border px-4 py-3 text-sm text-text-primary outline-none ring-0 
              placeholder:text-slate-500 transition-colors resize-none
              ${errors.bio
                ? 'border-red-500/70 bg-red-500/5 focus:border-red-500' 
                : 'border-border-primary bg-background-secondary/30 focus:border-axion-500/70'
              }
            `}
            placeholder="Tell us about yourself..."
            maxLength={500}
          />
          <div className="mt-1 flex justify-between">
            {errors.bio ? (
              <p className="text-xs text-red-500 dark:text-red-400">{errors.bio.message}</p>
            ) : (
              <p className="text-xs text-slate-400 dark:text-slate-500 transition-colors">Optional: Brief description about yourself</p>
            )}
            <p className="text-xs text-slate-500">
              {bioValue.length}/500
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            {...register('website')}
            id="website"
            type="url"
            label="Website"
            placeholder="https://example.com"
            error={errors.website}
            helperText="Optional: Your personal or professional website"
          />
          
          <FormInput
            {...register('location')}
            id="location"
            label="Location"
            placeholder="City, Country"
            error={errors.location}
            helperText="Optional: Your current location"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border-primary">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-text-secondary transition hover:text-text-primary"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isDirty || !isValid || isSubmitting}
            className="rounded-xl bg-axion-500 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-axion-500/20 transition hover:bg-axion-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
