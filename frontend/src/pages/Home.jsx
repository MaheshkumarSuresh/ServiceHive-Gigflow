import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold mb-4">Hire & Get Hired</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          GigFlow connects clients and freelancers through simple, transparent hiring.
        </p>
      </div>
    </Layout>
  );
}
