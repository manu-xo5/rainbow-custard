type Props = {
  left: React.ReactElement | string;
  title: React.ReactElement | string;
  right: React.ReactElement | string;
};

export const Navbar: React.FC<Props> = ({ left, right, title }) => {
  return (
    <div className="bg-primary text-primary-foreground h-app-bar px-5 grid grid-cols-4 gap-5 items-center justify-between border-b [&>:nth-child(1)]:self-stretch [&>:nth-child(1)]:grid [&>:nth-child(1)]:items-center [&>:nth-child(1)]:mr-auto [&>:nth-child(3)]:self-stretch [&>:nth-child(3)]:grid [&>:nth-child(3)]:items-center [&>:nth-child(3)]:ml-auto shadow-md shadow-black/40">
      {left}

      <span className="text-title col-start-2 col-end-4 w-full text-center font-bold">
        {title}
      </span>

      {right}
    </div>
  );
};
