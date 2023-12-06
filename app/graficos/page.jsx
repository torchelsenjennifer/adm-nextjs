"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function Grafico() {
    const [profissionaisPorEspecialidade, setProfissionaisPorEspecialidade] = useState({})

    useEffect(() => {
        // Função para buscar os dados e atualizar o estado
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3004/profissionais");
                if (!response.ok) {
                    throw new Error("Erro na solicitação à API");
                }
                const data = await response.json();

                const profissionaisPorEspecialidade = {};

                data.forEach((profissional) => {
                    const especialidade = profissional.especialidade.descricao;
                    if (especialidade in profissionaisPorEspecialidade) {
                        profissionaisPorEspecialidade[especialidade]++;
                    } else {
                        profissionaisPorEspecialidade[especialidade] = 1;
                    }
                });

                setProfissionaisPorEspecialidade(profissionaisPorEspecialidade);
            } catch (error) {
                console.error("Erro ao buscar dados da API:", error);
            }
        }

        fetchData(); // Chama a função para buscar os dados quando o componente é montado
    }, []);

    return (
        <div className="">
            <Chart
                chartType="ColumnChart"
                width="100%"
                height="400px"
                data={[
                    ["profissional", "especialidade", { role: "style" }],
                    ...Object.entries(profissionaisPorEspecialidade).map(([profissional, especialidade]) => [
                        profissional,
                        especialidade,
                        "#A9001E", // Cor das barras (pode ser alterada)
                    ]),
                ]}
                options={{
                    title: "Quantidade Profissionais Por Especialidade",
                    hAxis: { title: "Especialidades" },
                    vAxis: { title: "Quantidade" },
                }}
            />
        </div>
    );
}