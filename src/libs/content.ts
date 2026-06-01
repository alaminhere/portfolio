import {
  Database,
  ShieldCheck,
  Zap,
  Code2,
  Server,
  Cable,
  Monitor,
  LayoutDashboard,
  Plus,
  List,
  User,
  Settings,
  Undo2,
} from 'lucide-react';
import { Email, FaceBook, File, GitHub, Linkedin, Map, Whatsap } from './icon';
import { prisma } from './prisma';

export const getContactInformation = async () => {
  const user = await prisma.user.findFirst({
    select: {
      github: true,
      linkedin: true,
      facebook: true,
      email: true,
      whatsapp: true,
      location: true,
      resume: true,
    },
  });

  return [
    {
      icon: GitHub,
      title: 'GitHub',
      link: user?.github ?? '',
      label: 'view ↗',
    },
    {
      icon: Linkedin,
      title: 'Linkedin',
      link: user?.linkedin ?? '',
      label: 'view ↗',
    },
    {
      icon: FaceBook,
      title: 'FaceBook',
      link: user?.facebook ?? '',
      label: 'view ↗',
    },
    {
      icon: Email,
      title: 'Email',
      link: `mailto:${user?.email ?? ''}`,
      label: 'view ↗',
    },
    {
      icon: Whatsap,
      title: 'Whatsap',
      link: `https://wa.me/${user?.whatsapp ?? ''}`,
      label: 'view ↗',
    },
    {
      icon: Map,
      title: 'Location',
      link: user?.location ?? '',
      label: 'Remote / Worldwide',
    },
    {
      icon: File,
      title: 'Resume',
      link: user?.resume ?? '',
      label: 'view ↗',
    },
  ];
};

export const WhatIDoContent = [
  {
    icon: Code2,
    title: 'Web Development',
    description:
      'Building fast, responsive, full-stack web applications from planning to deployment.',
  },
  {
    icon: Database,
    title: 'Database Management',
    description:
      'Designing and structuring data efficiently for scalable, real-world applications.',
  },
  {
    icon: ShieldCheck,
    title: 'Authentication & Security',
    description: 'Implementing secure login systems and protecting user data.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description:
      'Improving load speed, code quality, and overall user experience.',
  },
];

export const AdminMenu1 = [
  { name: 'Overview', icon: LayoutDashboard, href: '/admin' },

  {
    name: 'Add case study',
    icon: Plus,
    href: '/admin/add-case',
  },
  {
    name: 'All case studies',
    icon: List,
    href: '/admin/all-case',
  },
  {
    name: 'Add skill',
    icon: Plus,
    href: '/admin/add-skill',
  },

  {
    name: 'All skills',
    icon: List,
    href: '/admin/all-skills',
  },
];
export const AdminMenu2 = [
  {
    name: 'Profile',
    icon: User,
    href: '/admin/profile',
  },
  {
    name: 'Settings',
    icon: Settings,
    href: '/admin/settings',
  },
  { name: 'Back', icon: Undo2, href: '/' },
];

export const Adminskills = [
  {
    icon: Server,
    title: 'Full-Stack & Backend',
    tech: [
      { name: 'Next.js', value: 85 },
      { name: 'Server Actions', value: 80 },
      { name: 'Middleware', value: 75 },
      { name: 'NextAuth', value: 75 },
      { name: 'Node.js', value: 'learning', learning: true },
      { name: 'Express', value: 'learning', learning: true },
    ],
  },
  {
    icon: Monitor,
    title: 'Frontend Development',
    tech: [
      { name: 'JavaScript', value: 90 },
      { name: 'TypeScript', value: 80 },
      { name: 'React', value: 90 },
      { name: 'CSS', value: 85 },
      { name: 'Tailwind CSS', value: 90 },
    ],
  },
  {
    icon: Database,
    title: 'Database & Validation',
    tech: [
      { name: 'MongoDB', value: 80 },
      { name: 'Mongoose', value: 80 },
      { name: 'Prisma', value: 70 },
      { name: 'Firebase', value: 65 },
      { name: 'React Hook Form', value: 85 },
      { name: 'Zod', value: 75 },
    ],
  },
  {
    icon: Cable,
    title: 'Tools & Integrations',
    tech: [
      { name: 'Stripe', value: 75 },
      { name: 'Cloudinary', value: 80 },
      { name: 'Nodemailer', value: 80 },
      { name: 'Redux', value: 80 },
      { name: 'RTK Query', value: 75 },
      { name: 'WordPress', value: 70 },
    ],
  },
];
