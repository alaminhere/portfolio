interface Props {
  index: string;
  title: string;
}

const ListLable = ({ index, title }: Props) => {
  return (
    <h3>
      <span className={`text-text text-sm mr-2 inline-block align-middle`}>
        {index}
      </span>
      <span className={`align-middle`}> {title}</span>
    </h3>
  );
};

export default ListLable;
