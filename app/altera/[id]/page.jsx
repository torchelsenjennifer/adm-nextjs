"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Alteracao() {
  const params = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    async function getProfissionais() {
      const response = await fetch(
        "http://localhost:3004/profissionais/" + params.id
      );
      const dado = await response.json();
      const aniver = new Date(dado.dataNasc);
      reset({
        nome: dado.nome,
        CPF: dado.CPF,
        contato: dado.contato,
        dataNasc: `${aniver.getFullYear()}-${aniver.getMonth() + 1}-${aniver.getDate()}`,
        especialidade: dado.especialidade,
        imagem: dado.imagem,
      });
    }
    getProfissionais();
  }, []);

  async function getEspecialidades() {
	try {
	  const response = await fetch("http://localhost:3004/especialidade");
	  const dados = await response.json();
	  setEspecialidades(dados);
	} catch (error) {
	  console.log(
		"erroerroerroerroerroerroerroerroerroerroerroerroerroerroerro"
	  );
	}
  }
  getEspecialidades();

  async function alteraDados(data) {
    const profissional = await fetch(
      "http://localhost:3004/profissionais/" + params.id,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...data }),
      }
    );
    if (profissional.status == 200) {
      toast.success("Ok! Profissional alterado com sucesso");
    } else {
      toast.error("Erro... Não foi possível concluir a alteração");
    }
  }

  return (
    <div className="container">
      <h2 className="mt-2">Alteracao de Profissional</h2>
      <form onSubmit={handleSubmit(alteraDados)}>
        <div className="row">
          <div className="col-sm-6 my-2">
            <label for="nome" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="nome"
              {...register("nome")}
              required
            />
          </div>
          <div className="col-sm-6 my-2">
            <label for="CPF" className="form-label">
              CPF
            </label>
            <input
              type="text"
              className="form-control"
              id="CPF"
              {...register("CPF")}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4 my-2">
            <label for="contato" className="form-label">
              Contato
            </label>
            <input
              type="text"
              className="form-control"
              id="contato"
              {...register("contato")}
              required
            />
          </div>
          <div className="col-sm-4 my-2">
            <label for="dataNasc" className="form-label">
              Data de Nascimento
            </label>
            <input
              type="date"
              className="form-control"
              id="dataNasc"
              {...register("dataNasc", { valueAsDate: true })}
              required
            />
          </div>
          <div className="col-sm-4 my-2">
            <label for="especialidade" className="form-label">
              Especialidade
            </label>
            <select
              className="form-select"
              id="especialidade"
              {...register("especialidade_id")}
              required
            >
              {especialidades.map((especialidade) => (
                                <option key={especialidade.id} value={especialidade.id}>
                                    {especialidade.descricao}
                                </option>
                            ))}
            </select>
          </div>

          <div className="col-sm-2">
            <p>Status do Profissional:</p>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="destaque"
                {...register("destaque")}
              />
              <label className="form-check-label" htmlFor="destaque">
                Destaque
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 my-2">
            <label for="imagem" className="form-label">
              Foto de Perfil
            </label>
            <input
              type="url"
              className="form-control"
              id="imagem"
              {...register("imagem")}
              required
            />
          </div>
        </div>

        <input
          type="submit"
          value="Alterar"
          className="btn bg-dark me-3 mt-2 text-light"
        />
        <input
          type="button"
          value="Limpar"
          className="btn bg-dark mt-2 text-light"
          onClick={() => reset()}
        />
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
