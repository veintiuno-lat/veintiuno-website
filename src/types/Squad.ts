export interface Squad {
  id: string;
  name: string;
  leader: string;
  soldiers: number;
  profileImage: string;
  description?: string;
}

export interface Satellite {
  id: string;
  username: string;
  role: string;
  profileImage: string;
  description?: string;
}
