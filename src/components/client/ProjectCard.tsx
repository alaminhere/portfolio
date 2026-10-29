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
    links: {
      liveDemo: string;
      github: string;
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

      <div className="p-3 md:p-4">
        <h4 className="line-clamp-1">{item?.title}</h4>

        <p className="mt-1 mb-6 line-clamp-2 leading-[1.4em]">
          {item?.description}
        </p>
        <div className="flex justify-start gap-2">
          <Link
            href={item?.links.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              className="bg-primary/20! text-white border border-primary/20 hover:border-border-hover"
            >
              Live Demo ↗
            </Button>
          </Link>

          <Link href={`/projects/${item?.slug}`}>
            <Button
              variant="secondary"
              size="sm"
              className="bg-primary/5! border border-primary/20"
            >
              Case Study & Code ↗
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
