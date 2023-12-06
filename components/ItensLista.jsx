import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import Link from "next/link";

export default function ItensLista(props) {
  function confirmaExclusao(id, nome) {
    Swal.fire({
      title: `Confirma Exclusão do Profissional "${nome}"?`,
      text: "Esta operação não podera ser desfeita",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim. Excluir!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.exclusao(id);
        Swal.fire("Exclusao!", "Profissional Excluido com Sucesso!", "success");
      }
    });
  }
  return (
    <tr>
      <td>
        <img
          src={props.profissional.imagem}
          alt={`Imagem do Profissional ${props.profissional.nome}`}
          width={100}
        />
      </td>
      <td className={props.profissional.destaque ? "fw-bold" : ""}>
        {props.profissional.nome}
      </td>
      <td className={props.profissional.destaque ? "fw-bold" : ""}>
        {props.profissional.CPF}
      </td>
      <td className={props.profissional.destaque ? "fw-bold" : ""}>
        {new Date(props.profissional.dataNasc).toLocaleDateString("en-GB")}
      </td>
      <td className={props.profissional.destaque ? "fw-bold" : ""}>
        {props.profissional.especialidade.descricao}
      </td>
      <td>
        <i
          class="bi bi-x-circle-fill text-danger"
          style={{ fontSize: 36, cursor: "pointer" }}
          onClick={() =>
            confirmaExclusao(props.profissional.id, props.profissional.nome)
          }
          title="Excluir"
        ></i>
        <i
          class="bi bi-pencil text-warning ms-2"
          style={{ fontSize: 36, cursor: "pointer" }}
          onClick={props.altera}
          title="Alterar"
        ></i>
        <i
          class="bi bi-search text-success ms-2"
          style={{ fontSize: 36, cursor: "pointer" }}
          onClick={props.consulta}
          title="Consultar"
        ></i>
        <i
          className="bi bi-house-check text-primary ms-2"
          style={{ fontSize: 36, cursor: "pointer" }}
          onClick={props.destaca}
          title="Destacar"
        ></i>
        <Link href={"/avaliacoes/"}>
          <i
            className="bi bi-chat-dots-fill text-primary me-2 ms-3"
            style={{ fontSize: 36, cursor: "pointer" }}
            title="Ver Comentarios"
          ></i>
        </Link>
      </td>
    </tr>
  );
}
