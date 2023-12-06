"use client";
import React from "react";
import Swal from "sweetalert2";

const ItemAvaliacao = ({ avaliacao, cliente, profissional, exclusao }, props) => {
  cliente = cliente || {};
  profissional = profissional || {};

	function confirmaExclusao(id, comentario) {
	  Swal.fire({
		title: `Confirma Exclusão do Profissional "${comentario}"?`,
		text: "Esta operação não podera ser desfeita",
		icon: "question",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Sim. Excluir!",
	  }).then((result) => {
		if (result.isConfirmed) {
		  exclusao();
		  Swal.fire("Exclusao!", "Avaliacao Excluida com Sucesso!", "success");
		}
	  });
	}

  return (
    <div className="item-avaliacao">
      <h2>Avaliação ID: {avaliacao.id}</h2>
      <p>Cliente: {cliente.nome}</p>
      <p>Profissional: {profissional.nome}</p>
      <p>Comentario: {avaliacao.comentario}</p>
      {/* Outras informações da avaliação */}
      <i
        class="bi bi-x-circle-fill text-danger"
        style={{ fontSize: 36, cursor: "pointer" }}
        onClick={() =>
          confirmaExclusao(avaliacao.id, avaliacao.comentario)
        }
        title="Excluir"
      ></i>
    </div>
  );
};

export default ItemAvaliacao;
