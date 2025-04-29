export interface SettingsSectionProps {
  onSave?: (data: any) => Promise<void>;
}

export interface AccountData {
  name: string;
  email: string;
  phone: string;
  username: string;
  bio: string;
  visibility: 'public' | 'friends' | 'private';
  language: string;
  timezone: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
