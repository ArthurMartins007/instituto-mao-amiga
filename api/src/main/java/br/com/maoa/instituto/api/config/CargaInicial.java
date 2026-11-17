package br.com.maoa.instituto.api.config;

import br.com.maoa.instituto.api.entity.Ponto;
import br.com.maoa.instituto.api.repository.PontoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
public class CargaInicial {
    @Bean
    CommandLineRunner carregarPontos(PontoRepository repository) {
        return args -> {
            // Não duplica os registros de demonstração quando a API reiniciar.
            if (repository.count() > 0) return;
            repository.saveAll(List.of(
                ponto("Ponto Central Mão Amiga", "Praça Cívica, Goiânia - GO", "Setor Central", "Seg a Sex, 8h às 17h", "coleta", -16.68052, -49.25637),
                ponto("Unidade Esperança", "Parque Flamboyant, Goiânia - GO", "Jardim Goiás", "Ter e Qui, 9h às 16h", "distribuição", -16.7029737, -49.2386268),
                ponto("Ponto Solidário Norte", "Passeio das Águas Shopping, Goiânia - GO", "Chácaras Retiro", "Sáb, 8h às 13h", "coleta", -16.62996, -49.2785),
                ponto("Centro Comunitário Sul", "Terminal Isidória, Goiânia - GO", "Setor Pedro Ludovico", "Seg, Qua e Sex, 10h às 18h", "distribuição", -16.71387, -49.25277),
                ponto("Ponto Nova Vida", "Terminal Padre Pelágio, Goiânia - GO", "Capuava", "Seg a Sáb, 8h30 às 15h30", "coleta", -16.65907, -49.32719),
                ponto("Unidade São José", "Goiânia Shopping, Goiânia - GO", "Setor Bueno", "Ter, Qui e Sáb, 9h às 14h", "distribuição", -16.70773, -49.27315),
                ponto("Ponto Acolher", "Parque Vaca Brava, Goiânia - GO", "Setor Bueno", "Qua e Sex, 8h às 17h", "coleta", -16.70955, -49.27099),
                ponto("Centro Solidário Campinas", "Terminal Praça A, Goiânia - GO", "Setor Coimbra", "Seg a Sex, 9h às 16h30", "distribuição", -16.67368, -49.28457),
                ponto("Ponto Jardim América", "Praça C-8, Goiânia - GO", "Jardim América", "Seg a Sex, 8h às 16h", "coleta", null, null),
                ponto("Unidade Leste", "Parque Areião, Goiânia - GO", "Setor Marista", "Seg a Sex, 9h às 17h", "distribuição", null, null),
                ponto("Ponto Oeste", "Bosque dos Buritis, Goiânia - GO", "Setor Oeste", "Ter e Qui, 8h às 15h", "coleta", null, null),
                ponto("Centro Universitário Solidário", "Praça Universitária, Goiânia - GO", "Setor Leste Universitário", "Seg a Sex, 8h às 18h", "coleta", null, null),
                ponto("Ponto Novo Horizonte", "Terminal Novo Mundo, Goiânia - GO", "Novo Mundo", "Seg a Sáb, 8h às 14h", "distribuição", null, null),
                ponto("Unidade Finsocial", "Terminal Finsocial, Goiânia - GO", "Finsocial", "Seg, Qua e Sex, 9h às 16h", "coleta", null, null),
                ponto("Ponto Vera Cruz", "Terminal Vera Cruz, Goiânia - GO", "Vera Cruz", "Ter e Qui, 8h às 16h", "distribuição", null, null),
                ponto("Centro Norte", "Parque Leolídio di Ramos Caiado, Goiânia - GO", "Residencial Goiânia 2", "Seg a Sex, 8h às 17h", "coleta", null, null),
                ponto("Ponto Pedro Ludovico", "Praça do Cruzeiro, Goiânia - GO", "Setor Pedro Ludovico", "Seg a Sex, 9h às 17h", "distribuição", null, null),
                ponto("Unidade Serrinha", "Parque Serrinha, Goiânia - GO", "Serrinha", "Sáb, 8h às 12h", "coleta", null, null),
                ponto("Ponto Universitário", "Hospital das Clínicas UFG, Goiânia - GO", "Setor Universitário", "Seg a Sex, 8h às 16h", "distribuição", null, null),
                ponto("Centro Praça A", "Praça A, Goiânia - GO", "Campinas", "Seg a Sex, 8h às 17h", "coleta", null, null),
                ponto("Ponto Jardim Goiás", "Parque Flamboyant, Goiânia - GO", "Jardim Goiás", "Seg a Sex, 9h às 17h", "distribuição", null, null),
                ponto("Unidade Centro Oeste", "Praça Tamandaré, Goiânia - GO", "Setor Oeste", "Seg a Sex, 8h às 17h", "coleta", null, null),
                ponto("Ponto Bueno", "Praça T-23, Goiânia - GO", "Setor Bueno", "Ter e Qui, 9h às 16h", "distribuição", null, null),
                ponto("Centro Leste", "Praça da Bíblia, Goiânia - GO", "Setor Leste Universitário", "Seg a Sex, 8h às 16h", "coleta", null, null),
                ponto("Unidade Campinas", "Mercado Municipal de Campinas, Goiânia - GO", "Campinas", "Seg a Sáb, 8h às 13h", "distribuição", null, null)
            ));
        };
    }

    // Deixa a carga inicial mais fácil de ler e manter.
    private Ponto ponto(String nome, String endereco, String bairro, String horario,
                        String tipo, Double latitude, Double longitude) {
        return new Ponto(nome, endereco, bairro, horario, tipo, latitude, longitude);
    }
}
