'use client'
import ItensLista from "@/components/ItensLista"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Pesquisa from "@/components/Pesquisa"
import Swal from 'sweetalert2'

export default function Listagem() {
	const [profissionais, setProfissionais] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [especialidades, setEspecialidades] = useState([])

	const router = useRouter()

	useEffect(() => {
		async function getProfissionais() {
			const response = await fetch("http://localhost:3004/profissionais")
			const dados = await response.json()
			setProfissionais(dados)
			setIsLoading(false)
		}
		getProfissionais()
	}, [])

	useEffect(() => {
		async function getEspecialidades() {
			const response = await fetch("http://localhost:3004/especialidades")
			const dados = await response.json()
			setEspecialidades(dados)
			setIsLoading(false)
		}
		getEspecialidades()
	}, [])

	async function excluiProfissional(id) {
		await fetch("http://localhost:3004/profissionais/" + id, {
			method: "DELETE"
		})
		const novoDados = profissionais.filter(profissional => profissional.id != id)
		setProfissionais(novoDados)
	}

	async function destacaProfissional(id, status_atual) {
		await fetch("http://localhost:3004/profissionais/" + id,
			{
				method: "PATCH",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ destaque: !status_atual })
			})
		const indiceAlterado = profissionais.findIndex(profissional => profissional.id == id)
		const novosDados = [...profissionais]
		novosDados[indiceAlterado].destaque = !status_atual
		setProfissionais(novosDados)
	}

	const listaProfissionais = profissionais.map(profissional => (
		<ItensLista
			key={profissional.id}
			profissional={profissional}
			exclusao={() => excluiProfissional(profissional.id)}
			altera={() => router.push('altera/' + profissional.id)}
			consulta={() => router.push('consulta/' + profissional.id)}
			destaca={() => destacaProfissional(profissional.id, profissional.destaque)}
		/>
	))

	async function filtraDados(data) {
		if (data.pesq.length < 2) {
			Swal.fire("Digite, no mínimo, 2 caracteres")
			return
		}

		const pesquisa = data.pesq.toUpperCase()

		const response = await fetch("http://localhost:3004/profissionais")
		const dados = await response.json()

		const novosDados = dados.filter(profissional =>
			profissional.nome.toUpperCase().includes(pesquisa) || profissional.especialidade_id.toUpperCase().includes(pesquisa)
		)

		if (novosDados.length == 0) {
			Swal.fire("Nao ha profissional com a palavra chave informada...")
			return
		}

		setProfissionais(novosDados)

	}

	async function mostraTodos() {
		const response = await fetch("http://localhost:3004/profissionais")
		const dados = await response.json()
		setProfissionais(dados)
	}

	function ordenarEspecialidade() {
		async function getEspecialidade() {
			const response = await fetch("http://localhost:3004/profissionais?_sort=nome&_order=asc")
			const dados = await response.json()
			setProfissionais(dados)
		}
		getEspecialidade()
	}

	if (isLoading) {
		return (
			<div className="container">
				<h2 className="mt-3">Listagem de Profissionais</h2>
				<h4>Aguarde... Carregando do Profissionais</h4>
			</div>
		)
	}

	return (
		<div className="container">
			<div className="row mt-2">
				<div className="col-sm-7">
					<h2 className="mt-2">Listagem de Profissionais</h2>
				</div>
				<div className="col-sm-5">
					<Pesquisa filtra={filtraDados} mostra={mostraTodos} ordenarByEspecialidade={ordenarEspecialidade} />
				</div>
			</div>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Profissional</th>
						<th>Nome</th>
						<th>CPF</th>
						<th>Nascimento</th>
						<th>Especialidade</th>
						<th>Modificacoes</th>
					</tr>
				</thead>
				<tbody>
					{listaProfissionais}
				</tbody>
			</table>
		</div>
	)
}