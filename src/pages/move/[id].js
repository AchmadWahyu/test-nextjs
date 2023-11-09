export const getStaticProps = async (ctx) => {
  const responseData = await fetch(
    `https://pokeapi.co/api/v2/move/${ctx.params.id}`
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
    revalidate: 15
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

    fallback: 'blocking',
  };
};

export default function MoveDetail(props) {
  return (
    <div>
      <h1>ISR (SSG fallback)</h1>
      <h2>{props?.data?.name}</h2>
      <h3>
        <i>{new Date(props?.time?.datetime).toString()}</i>
      </h3>
    </div>
  );
}
