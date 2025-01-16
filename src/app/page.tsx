import Image from 'next/image';

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-grow flex-col items-center justify-center gap-8">
        <h1 className="text-6xl">Btown</h1>
        <Image src="/btownkids.svg" alt="btownkids logo" width={250} height={300} priority />
        <h1 className="text-6xl">Kids</h1>
      </main>
      <footer className="flex flex-wrap items-center justify-center gap-6 bg-gray-800 p-4"></footer>
    </div>
  );
};

export default Home;
