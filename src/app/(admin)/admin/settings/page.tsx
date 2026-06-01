import FormChangePassword from '@/components/admin/Form-ChangePassword';
import SectionBar from '@/components/layout/Section-Bar';
import InputCard from '@/components/ui/input-card';

const settingPage = async () => {
  return (
    <>
      <section className="px-5 pb-4 pt-20 md:pt-4">
        <SectionBar
          title="Settings"
          description="Manage your account and preferences."
        />
        <InputCard
          lable="Change password"
          className="w-full max-w-2xl space-y-4"
        >
          {<FormChangePassword />}
        </InputCard>
      </section>
    </>
  );
};

export default settingPage;
