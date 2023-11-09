import { useRouter } from 'next/router';

export const getStaticProps = async (ctx) => {
  const responseData = await fetch(
    `https://pokeapi.co/api/v2/item/${ctx.params.id}`
  );

  const resultData = await responseData.json();

  const responseTime = await fetch(
    `https://worldtimeapi.org/api/timezone/Asia/Jakarta`
  );
  const resultTime = await responseTime.json();

  return {
    props: {
      data: resultData,
      time: resultTime,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: '1',
        },
      },
      {
        params: {
          id: '2',
        },
      },
    ],

    fallback: true,
  };
};

export default function ItemDetail(props) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <h2>
        Loading... (page is not generated yet, this loading will show until
        getStaticProps() finishes running)
      </h2>
    );
  }

  return (
    <div>
      <h1>SSG fallback true</h1>
      <h2>{props?.data?.name}</h2>
      <h3>
        <i>{new Date(props?.time?.datetime).toString()}</i>
      </h3>
    </div>
  );
}
