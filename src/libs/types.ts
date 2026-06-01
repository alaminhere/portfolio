type ProjectItem = {
  title: string;
  description: string;
};
export interface ProjectFormData {
  id?: string;
  title: string;
  slug: string;
  image: {
    url: string;
    public_id: string;
  };
  description: string;
  techStack: string[];
  whyTheseTechnologies: ProjectItem[];
  problems: ProjectItem[];
  solutions: ProjectItem[];
  responsibilities: {
    frontend: string[];
    backend: string[];
  };
  links: {
    liveDemo: string;
    github: string;
  };

  createdAt?: Date;
  updatedAt?: Date;
}
export interface SkillFormData {
  id?: string;
  title: string;
  slug: string;
  techStack: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SimpleListEditorProps {
  className?: string;
  lable?: string;
  path: string;
  list?: string[];
  inputLable?: string;
  placeholder: string;

  addItem?: <T>(path: string, value: T) => void;
  editItem?: <T>(path: string, index: number, value: T) => void;
  deletItem: (path: string, index: number) => void;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileFormData {
  fullName: string;
  bio: string;
  github: string;
  linkedin: string;
  facebook: string;
  whatsapp: string;
  location: string;
  resume: string;
}
export interface LoginFormData {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  name: string | null;
  email: string;
  bio: string | null;
  github: string | null;
  linkedin: string | null;
  facebook: string | null;
  whatsapp: string | null;
  location: string | null;
  resume: string | null;
}
export interface User {
  id: string;
  name: string | null;
  email: string;
  bio: string | null;
  github: string | null;
  linkedin: string | null;
  facebook: string | null;
  whatsapp: string | null;
  location: string | null;
  resume: string | null;

  verifyCode: string | null;
  expiryDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
