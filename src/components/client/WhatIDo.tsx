import { WhatIDoContent } from '@/libs/content';

import Card from '../ui/card';
import Lable from '../ui/lable';

const WhatIDo = () => {
  const iconStyles = [
    'bg-info-bg text-info',
    'bg-success-bg text-success',
    'bg-warning-bg text-warning',
    'bg-accent-bg text-accent',
  ];

  return (
    <section>
      <div className="app-container">
        <div className="stagger">
          <Lable>-- What I Do</Lable>

          <h2>What I Bring to the Table</h2>

          <p className="mt-2 lg:w-[60%]">
            I build full-stack web applications from scratch — from planning the
            structure to writing the frontend, backend, and connecting
            everything to a database.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
          {WhatIDoContent.map((item, index) => {
            const Icon = item.icon;
            const iconStyle = iconStyles[index % iconStyles.length];

            return (
              <Card
                key={index}
                className="backdrop-blur-md!"
              >
                <div
                  className={`w-12 h-12 flex justify-center items-center   rounded-xl ${iconStyle}`}
                >
                  <Icon size={24} />
                </div>

                <h4 className="mt-4 mb-2">{item.title}</h4>

                <p className="text-[15px]">{item.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
