export const getServerSideProps = async (ctx) => {
  const responseData = await fetch(
    `https://pokeapi.co/api/v2/berry/${ctx.query.id}`
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

export default function BerryDetail(props) {
  return (
    <div>
      <h1>SSR</h1>
      <h2>{props?.data?.name}</h2>
      <h3>
        <i>{new Date(props?.time?.datetime).toString()}</i>
      </h3>
    </div>
  );
}
