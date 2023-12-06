import Link from "next/link"

async function getProfissionais(id) {
  const response = await fetch("http://localhost:3004/profissionais/" + id)
  const dado = await response.json()
  return dado
}

export default async function Consulta({ params }) {

  const profissional = await getProfissionais(params.id)

  return (
    <div className="container">
      <h2 className="mt-2">Consulta de Profissionais</h2>
      <form>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input type="text" className="form-control" id="nome" value={profissional.nome} readOnly />
          </div>
          <div className="col-sm-4">
            <label htmlFor="CPF" className="form-label">CPF</label>
            <input type="text" className="form-control" id="CPF" value={profissional.CPF} readOnly />
          </div>
          <div className="col-sm-2">
            <label htmlFor="contato" className="form-label">Contato</label>
            <input type="text" step="0.10" className="form-control" id="contato" value={profissional.contato} readOnly />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-4">
            <label htmlFor="dataNasc" className="form-label">Data de Nascimento</label>
            <input type="date" className="form-control" id="dataNasc" value={profissional.dataNasc} readOnly />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-6">
            <p className="form-label">Foto de Perfil</p>
            <img src={profissional.imagem} alt={`Foto de Perfil ${profissional.imagem}`} width={150} height={210} className="mx-auto d-block" />
          </div>
        </div>

        <Link className="btn bg-dark mt-2 text-light" href="/listagem">Voltar</Link>

      </form>
    </div>
  )
}