'use client'
import { useEffect, useState } from "react";

export default function Home() {

  const [produtos, setProdutos] = useState<any>([]);
  const [produto, setProduto] = useState<any>({});

  useEffect(() => {
    obterProdutos();
  }, []);

  async function obterProdutos() {
    const response = await fetch("http://localhost:3001/produtos")
    const produtos = await response.json();
    setProdutos(produtos);
  }

  async function criarProduto() {
    await fetch("http://localhost:3001/produtos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(produto)
    });
    setProduto({})
    await obterProdutos();
  }

  async function deletarProduto(id: number) {
    await fetch(`http://localhost:3001/produtos/${id}`, {
      method: "DELETE"
    });
    await obterProdutos();
  }

  function renderizarProdutos() {
    return (
      <div className="flex flex-col gap-2">
        {produtos.map((produto: any) => (
          <div key={produto.id} className="flex items-center gap-10 py-2 px-4 rounded-md bg-zinc-800">
            <div className="flex-1">{produto.nome}</div>
            <div>{produto.descricao}</div>
            <div>Preço: R$ {produto.preco}</div>
            <div>
              <button className="bg-red-500 rounded-md pd-2 px-3 text-white"
                onClick={() => deletarProduto(produto.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  function renderizarFormProduto() {
    return (
      <div className="flex gap-5 items-end">
        <div className="flex flex-col">
          <label htmlFor="nome">Nome do Produto</label>
          <input type="text"
            id="nome"
            value={produto.nome ?? ''}
            onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
            className="bg-zinc-700 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="descricao">Descrição</label>
          <input type="text"
            id="descricao"
            value={produto.descricao ?? ''}
            onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
            className="bg-zinc-700 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="preco">Preço</label>
          <input type="number"
            id="preco"
            value={produto.preco ?? ''}
            onChange={(e) => setProduto({ ...produto, preco: parseFloat(e.target.value) })}
            className="bg-zinc-700 rounded-md p-2"
          />
        </div>
        <div>
          <button
            className=" bg-blue-500 rounded-md py-2 px-4 text-white"
            onClick={criarProduto}
          >
            Criar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      {renderizarFormProduto()}
      {renderizarProdutos()}
    </div>
  );
}
