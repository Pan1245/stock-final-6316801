import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Final Exam</title>
      </Head>
      <h1 className="name-title">Final Exam</h1>
      <p className="items-center">Siwach Toprasert</p>
      <p className="items-center">6316801</p>
      <Link className="supplier-link" href="/suppliers">
        Go to Supplier
      </Link>
    </>
  );
}
