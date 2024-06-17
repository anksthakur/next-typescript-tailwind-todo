import Navbar from "@/components/Navbar";
import TodoAdd from "@/components/TodoAdd";
import Todos from "@/components/Todos";

export default function Home() {
  return (
    <main className="dark:bg-slate-200 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8">TODO + TypeScript + TailwindCSS</h1>
      <Navbar />
      <TodoAdd />
      <Todos />
    </main>
  );
}
