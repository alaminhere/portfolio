import Image from 'next/image';
import Link from 'next/link';

import Button from '../ui/button';
import Card from '../ui/card';

const ProjectCard = ({
  item,
}: {
  item: {
    slug: string;
    title: string;
    description: string;
    image: {
      url: string;
      public_id: string;
    };
  };
}) => {
  return (
    <Card className="p-0! overflow-hidden border border-border">
      <Image
        src={item?.image?.url || '/default_banner_.webp'}
        alt="card banner"
        width={500}
        height={200}
        className="object-cover"
      />

      <div className="p-5">
        <h4 className="line-clamp-1">{item?.title}</h4>

        <p className="mt-2 mb-5 line-clamp-2 leading-[1.4em]">
          {item?.description}
        </p>

        <Link href={`/projects/${item?.slug}`}>
          <Button
            variant="secondary"
            size="sm"
            className="bg-surface! border border-primary/20"
          >
            View case study ↗
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ProjectCard;
