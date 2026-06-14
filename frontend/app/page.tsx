'use client'
import { useEffect, useState } from "react";

export default function Home() {

  const [produtos, setProdutos] = useState<any>([]);

  useEffect(() => {
    obterProdutos();
  }, []);

  async function obterProdutos() {
    const response = await fetch("http://localhost:3001/produtos")
    const produtos = await response.json();
    setProdutos(produtos);
  }

  function renderizarProdutos() {
    return (
      <div className="flex flex-col gap-2">
        {produtos.map((produto: any) => (
          <div key={produto.id} className="flex gap-2 p-2 rounded-md bg-zinc-800">
            <h2>{produto.nome}</h2>
            <p>{produto.descricao}</p>
            <p>Preço: R$ {produto.preco}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {renderizarProdutos()}
    </div>
  );
}
