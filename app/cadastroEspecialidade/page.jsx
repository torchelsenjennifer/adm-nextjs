"use client";
import { get, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function Cadastro() {
  const { register, handleSubmit, reset } = useForm();
  const [especialidades, setEspecialidades] = useState([]);

  async function enviaDados(data) {
    try {
      console.log(data);
      const especialidade = await fetch("http://localhost:3004/especialidade", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });
      if (especialidade.status == 201) {
        toast.success("Ok! Especialidade cadastrada com sucesso");
      } else {
        toast.error("Erro... Nao foi possivel concluir o cadastro");
      }
      reset();
    } catch (error) {
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
      <h2 className="my-3 text-center">Cadastro de Especialidades</h2>

      <form onSubmit={handleSubmit(enviaDados)}>
        <div className="row">
          <div className="col-sm-6 my-2">
            <label for="descricao" className="form-label">
              Descricao
            </label>
            <input
              type="text"
              className="form-control"
              id="descricao"
              {...register("descricao")}
              required
            />
          </div>
        </div>

        <input
          type="submit"
          className="btn bg-dark me-3 mt-2 text-light"
          value="Cadastrar Especialidade"
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
