import Head from "next/head";
import Link from "next/link";

export default function Supplier({ supplier }) {
  console.log("supplier 2", supplier);
  if (!supplier)
    return (
      <div>
        <p>Supplier not found</p>
        <Link href="/suppliers">Back</Link>
      </div>
    );

  return (
    <>
      <Head>
        <title>{supplier.name}</title>
      </Head>
      <h1>{supplier.name}</h1>
      <p>{supplier.address}</p>
      <p>{supplier.phone}</p>
      <Link href="/suppliers">Back</Link>
    </>
  );
}

export async function getServerSideProps({ params }) {
  console.debug("params", params);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APIURL}/suppliers/${params.id}`
  );
  const supplier = await res.json();
  console.debug("supplier 1", supplier);
  return { props: { supplier } };
}
