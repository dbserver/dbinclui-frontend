export interface UserEntity {
  _id?: string;
  uid: string | null;
  photoURL: string | null;
  displayName: string | null;
  email: string | null;
  token: string;
  admin?: boolean;
}
