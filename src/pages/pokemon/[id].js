import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PokemonDetail(props) {
  const router = useRouter();

  const [data, setData] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    async function getData() {
      if (!router.query.id) return;
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${router.query.id}`
        );
        const result = await response.json();

        setData(result);
      } catch (err) {
        console.log(err);
      }
    }

    async function getTime() {
      try {
        const response = await fetch(
          `https://worldtimeapi.org/api/timezone/Asia/Jakarta`
        );
        const result = await response.json();

        setTime(result);
      } catch (err) {
        console.log(err);
      }
    }

    getData();
    getTime();
  }, [router.query.id]);

  return (
    <div>
      <h1>CSR</h1>
      <h2>{data?.name}</h2>
      <h3>
        <i>{new Date(time?.datetime).toString()}</i>
      </h3>
    </div>
  );
}
