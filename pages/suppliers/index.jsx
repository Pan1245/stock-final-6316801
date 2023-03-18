import Head from "next/head";
import Link from "next/link";
import Script from "next/script";

export default function Home({ suppliers }) {
  function deleteSupplier(id) {
    fetch(`${process.env.NEXT_PUBLIC_APIURL}/suppliers/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => window.location.reload(false));
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>All Suppliers</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossorigin="anonymous"
        ></link>
      </Head>

      <nav
        class="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ backgroundColor: "lightgrey" }}
      >
        <div class="container-fluid">
          <Link class="navbar-brand" href="/suppliers">
            Supplier Management
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link
                class="nav-link active"
                aria-current="page"
                href="/suppliers"
              >
                All Suppliers
              </Link>
              <Link class="nav-link" href="/suppliers/add">
                New Supplier
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div class="container" style={{ marginTop: "50px" }}>
        <div class="container-fluid">
          <h1>
            All Suppliers
            <span class="float-end">
              <button type="button" class="btn btn-primary">
                <Link class="nav-link" href="/suppliers/add">
                  + Add Supplier
                </Link>
              </button>
            </span>
          </h1>
        </div>
        <table class="table table-dark table-striped align-middle">
          <thead>
            <tr>
              <th scope="col">Supplier name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone number</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {suppliers.map((supplier) => {
              return (
                <tr key={supplier._id}>
                  <td>
                    <Link href={`/suppliers/${supplier._id}`}>
                      {supplier.name}
                    </Link>
                  </td>
                  <td>{supplier.address}</td>
                  <td>{supplier.phone}</td>
                  <td>
                    <button type="button" class="btn btn-primary">
                      <Link href={`/suppliers/update/${supplier._id}`}>
                        Update
                      </Link>
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => deleteSupplier(supplier._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
        crossorigin="anonymous"
      ></Script>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/suppliers`);
  const suppliers = await res.json();
  return { props: { suppliers } };
}
