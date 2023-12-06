"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ItemAvaliacao from "@/components/ItemAvaliacao";

export default function Avaliacoes() {
  const params = useParams();
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);

  useEffect(() => {
    async function getAvaliacoes() {
      const response = await fetch("http://localhost:3004/avaliacoes");
      const dados = await response.json();
      setAvaliacoes(dados);
    }
    getAvaliacoes();

    async function getClientes() {
      const response = await fetch("http://localhost:3004/clientes");
      const dados = await response.json();
      setClientes(dados);
    }
    getClientes();

    async function getProfissionais() {
      const response = await fetch("http://localhost:3004/profissionais");
      const dados = await response.json();
      setProfissionais(dados);
    }
    getProfissionais();
  }, []);

  async function excluiAvaliacao(id) {
	await fetch("http://localhost:3004/avaliacoes/" + id, {
		method: "DELETE"
	})
	const novoDados = avaliacoes.filter(avaliacao => avaliacao.id != id)
	setAvaliacoes(novoDados)
}

  const listaAvaliacoes = avaliacoes.map((avaliacao) => (
    <ItemAvaliacao
      key={avaliacao.id}
      avaliacao={avaliacao}
	  exclusao={() => excluiAvaliacao(avaliacao.id)}
      cliente={clientes.find((cliente) => cliente.id === avaliacao.cliente_id)}
      profissional={profissionais.find(
        (profissional) => profissional.id === avaliacao.profissional_id
      )}
    />
  ));

  return (
    <div className="container-fluid">
      <div className="row">{listaAvaliacoes}</div>

      {/* <div className="row">
                <img
                    src={profissional.imagem}
                    className="card-img-top"
                    alt="profissional"
                />
                 <div className="card-body">
                    <h5 className="card-title">{cliente.titulo}</h5>
                    <p className="card-text">{props.profissional.nome}</p>
                    <p className="small">{props.profissional.especialidade}</p>
                </div>
                {clienteId && (
                    <div className="ms-2 mb-2">
                        <Estrelas
                            soma={props.profissional.soma}
                            num={props.profissional.num}
                        />
                        <div className="float-end me-2">
                            <i className="bi bi-chat-dots-fill text-primary me-2" style={{ cursor: 'pointer' }} title="Ver Comentários"></i>
                            <Link href={"/avaliar/" + props.profissional.id}>
                                <i className="bi bi-patch-plus text-danger fs-3 me-2" style={{ cursor: 'pointer' }} title="Adicionar Comentários"></i>
                            </Link>
                        </div>
                    </div>
                )} */}
      {/* </div> */}
    </div>
  );
}
