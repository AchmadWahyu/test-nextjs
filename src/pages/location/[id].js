export const getStaticProps = async (ctx) => {
  const responseData = await fetch(
    `https://pokeapi.co/api/v2/location/${ctx.params.id}`
  );

  const resultData = await responseData.json();

  const responseTime = await fetch(
    `http://worldtimeapi.org/api/timezone/Asia/Jakarta`
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

    fallback: false,
  };
};

export default function LocationDetail(props) {
  return (
    <div>
      <h1>SSG fallback false</h1>
      <h2>{props?.data?.name}</h2>
      <h3>
        <i>{new Date(props?.time?.datetime).toString()}</i>
      </h3>
    </div>
  );
}
