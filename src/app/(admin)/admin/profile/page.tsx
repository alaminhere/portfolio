import { prisma } from '@/libs/prisma';

import Abatar from '@/components/admin/Abatar';
import FormUpdateProfile from '@/components/admin/Form-UpdateProfile';
import SectionBar from '@/components/layout/Section-Bar';
import InputCard from '@/components/ui/input-card';

const ProfilePage = async () => {
  const user = await prisma.user.findMany();

  return (
    <>
      <section className="px-5 pb-4 pt-20 md:pt-4">
        <SectionBar
          title="Profile"
          description="Update your account details."
        />

        <InputCard
          lable="Update Profile"
          className="w-full max-w-3xl space-y-4"
        >
          <Abatar className="pb-3 border-b border-border" />
          <FormUpdateProfile userData={user} />
        </InputCard>
      </section>
    </>
  );
};

export default ProfilePage;
