import { useForm } from "react-hook-form"

export default function Pesquisa(props) {

    const { register, handleSubmit, reset } = useForm()

    async function limpa() {
        reset({
            pesq: ""
        })
        await props.mostra()
    }

    return (
        <form className="row row-cols-lg-auto g-3 align-items-center"
            onSubmit={handleSubmit(props.filtra)}
            onReset={limpa}>
            <div className="col-12">
                <input type="text" className="form-control"
                    placeholder="Pesquisa nome ou espec."
                    {...register("pesq")}
                />
            </div>
            <div className="col-12">
                <button className="btn btn-primary" type="submit">Pesquisar</button>
            </div>
            <div className="col-12">
                <button className="btn btn-primary" type="reset">Ver Todos</button>
            </div>
            <div className="col-12">
                <button className="btn btn-warning" type="button" onClick={props.ordenarByEspecialidade}>
                    Ordenar
                </button>
            </div>
        </form>
    )
}