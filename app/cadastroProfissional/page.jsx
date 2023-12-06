"use client";
import { get, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";

export default function Cadastro() {
  const { register, handleSubmit, reset } = useForm();
  const [especialidades, setEspecialidades] = useState([]);

  async function enviaDados(data) {
    //boa pratica usando try catch
    try {
      const profissional = await fetch("http://localhost:3004/profissionais", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });
      console.log(profissional.status);
      if (profissional.status == 201) {
        toast.success("Ok! Profissional cadastrado com sucesso");
      } else {
        toast.error("Erro... Não foi possível concluir o cadastro");
      }
      reset();
    } catch (error) {
      console.log("erro");
      //alert("Erro!")
    }
  }

  useEffect(() => {
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
  }, []);

  return (
    <div className="container">
      <h2 className="my-3 text-center">Cadastro de Profissionais</h2>

      <form onSubmit={handleSubmit(enviaDados)}>
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
              {...register("dataNasc")}
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
          className="btn bg-dark me-3 mt-2 text-light"
          value="Cadastrar"
        />
        <input
          type="button"
          className="btn bg-dark mt-2 text-light"
          value="Limpar"
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
