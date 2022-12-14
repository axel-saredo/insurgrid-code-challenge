import Dropdown from '../../components/Dropdown';

export type Carrier = {
  id?: string;
  name: string;
};

export interface ICarriersProps {
  carriers: Carrier[];
}

function Home({ carriers }: ICarriersProps) {
  return (
    <div>
      <Dropdown carriers={carriers} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/carriers`);
  const carriers = await res.json();

  return {
    props: {
      carriers,
    },
  };
}

export default Home;
