import { elysia } from '../lib/api'

export default async function HomePage() {
  const { data } = await elysia.api.hello.index.get();
  console.log(data);
  return (
    <main>
        <h1>Home</h1>
        <p>{data}</p>
    </main>
  );
}
