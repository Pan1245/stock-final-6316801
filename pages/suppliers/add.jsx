import { useState } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Link from "next/link";

export default function AddSupplierPage() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const saveSupplier = async (data) => {
    const response = await fetch("/api/suppliers", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.error) {
      alert("Error: " + result.error);
    } else {
      alert("Supplier saved");
      window.location.href = "/suppliers";
    }
    console.log(result);
    setData(JSON.stringify(data));
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>New Supplier</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossorigin="anonymous"
        ></link>
      </Head>

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
              <Link class="nav-link" aria-current="page" href="/suppliers">
                All Suppliers
              </Link>
              <Link class="nav-link active" href="/suppliers/add">
                New Supplier
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div class="container" style={{ marginTop: "50px" }}>
        <form onSubmit={handleSubmit(saveSupplier)}>
          <h1>New Supplier</h1>
          <div class="mb-3">
            <label for="name" class="form-label">
              Supplier name
            </label>
            <input
              type="text"
              class="form-control"
              id="name"
              {...register("name", { required: true })}
              placeholder="Name"
            />
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">
              Supplier Address
            </label>
            <textarea
              type="text"
              class="form-control"
              id="text"
              {...register("address")}
              placeholder="Address"
              rows="3"
            />
          </div>

          <div class="mb-3">
            <label for="phone" class="form-label">
              Supplier phone number
            </label>
            <input
              type="text"
              class="form-control"
              id="phone"
              {...register("phone")}
              placeholder="Phone number"
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
